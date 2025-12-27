# Kế hoạch cập nhật cấu trúc Address mới

## Tổng quan thay đổi

### Cấu trúc mới
- **AddressLine** (required, không nullable)
- **Subdivision** (required, không nullable) - Thay thế Ward/District - Ward/County
- **City** (required, không nullable)
- **StateOrProvince** (required, không nullable) - Thay thế State - State/Province
- **Country** (required, không nullable)
- **PostalCode** (required, không nullable) - Thay thế ZipCode

**Lưu ý**: Tất cả các trường đều required và không nullable

### Cấu trúc cũ (cần thay thế)
- ❌ Ward
- ❌ District
- ❌ State
- ❌ ZipCode

---

## Backend - Order Service

### 1. Domain Layer
**File**: `src/Services/Order/Core/Order.Domain/ValueObjects/Address.cs`
- ✅ Properties đã được cập nhật (nhưng PostalCode thiếu `= default!`)
- ⚠️ Cần cập nhật: 
  - Thêm `= default!` cho PostalCode (đảm bảo không nullable)
  - Constructor private: `ward, district, state, zipCode` → `subdivision, stateOrProvince, postalCode`
  - Factory method `Of()`: Cập nhật tham số và validation (tất cả đều required)

### 2. Application Layer - DTOs
**File**: `src/Services/Order/Core/Order.Application/Dtos/ValueObjects/AddressDto.cs`
- Cập nhật properties: Ward, District, State, ZipCode → Subdivision, StateOrProvince, PostalCode
- Tất cả properties đều phải có `= default!` (required, không nullable)

### 3. Application Layer - Commands
**Files**:
- `src/Services/Order/Core/Order.Application/CQRS/Order/Commands/CreateOrderCommand.cs`
- `src/Services/Order/Core/Order.Application/CQRS/Order/Commands/UpdateOrderCommand.cs`

**Cần cập nhật**:
- Validators: Thay đổi validation rules từ Ward/District/ZipCode → Subdivision/PostalCode
  - Tất cả fields đều phải có `.required()` validation
  - Subdivision, City, StateOrProvince, Country, PostalCode đều required
- Handlers: Sửa `Address.Of()` calls với tham số mới (tất cả đều required)

### 4. Infrastructure Layer
**File**: `src/Services/Order/Core/Order.Infrastructure/Data/Configurations/OrderEntityConfiguration.cs`
- Cập nhật EF Core column mappings:
  - `shipping_ward` → `shipping_subdivision` (required, không nullable)
  - `shipping_district` → (xóa, vì Subdivision thay thế cả Ward và District)
  - `shipping_city` → (giữ nguyên, required)
  - `shipping_state` → `shipping_state_or_province` (required, không nullable)
  - `shipping_zip_code` → `shipping_postal_code` (required, không nullable)
- Tất cả columns đều phải có `.IsRequired()`

### 5. Worker/Consumer
**File**: `src/Services/Order/Worker/Order.Worker.Consumer/EventHandlers/Integrations/BasketCheckoutIntegrationEventHandler.cs`
- Cập nhật mapping từ `AddressIntegrationEvent` sang `AddressDto`

---

## Backend - Shared EventSourcing

### 6. Integration Events
**File**: `src/Shared/EventSourcing/Events/Baskets/BasketCheckoutIntegrationEvent.cs`
- Cập nhật `AddressIntegrationEvent` record:
  - Ward, District → Subdivision (required, không nullable)
  - State → StateOrProvince (required, không nullable)
  - ZipCode → PostalCode (required, không nullable)
- Tất cả properties đều phải có `= default!` hoặc không nullable

---

## Backend - Basket Service

### 7. Domain Events
**File**: `src/Services/Basket/Core/Basket.Domain/Events/BasketCheckoutDomainEvent.cs`
- Cập nhật `AddressDomainEvent` record với cấu trúc mới:
  - Ward, District → Subdivision (required)
  - State → StateOrProvince (required)
  - ZipCode → PostalCode (required)
- Tất cả parameters đều required (không nullable)

### 8. Application DTOs
**File**: `src/Services/Basket/Core/Basket.Application/Dtos/Baskets/BasketCheckoutAddressDto.cs`
- Cập nhật properties: Ward, District, State, ZipCode → Subdivision, StateOrProvince, PostalCode
- Tất cả properties đều required (không nullable)

### 9. Application Commands
**File**: `src/Services/Basket/Core/Basket.Application/CQRS/Basket/Commands/BasketCheckoutCommand.cs`
- Cập nhật validator: Tất cả fields đều required (Subdivision, City, StateOrProvince, Country, PostalCode)
- Cập nhật handler: Sửa AddressDomainEvent constructor với tham số mới (tất cả required)

### 10. Event Handlers
**File**: `src/Services/Basket/Core/Basket.Application/CQRS/Basket/EventHandlers/Domain/BasketCheckoutDomainEventHandler.cs`
- Cập nhật mapping từ `AddressDomainEvent` sang `AddressIntegrationEvent`

---

## Backend - Shared Constants

### 11. MessageCode
**File**: `src/Shared/Common/Constants/MessageCode.cs`
- Thay đổi:
  - `WardIsRequired` → `SubdivisionIsRequired`
  - `DistrictIsRequired` → (xóa, vì Subdivision thay thế)
  - `ZipCodeIsRequired` → `PostalCodeIsRequired`
  - `StateIsRequired` → `StateOrProvinceIsRequired`
- **Lưu ý**: Tất cả MessageCode cho Address fields đều phải có validation required

---

## Frontend - App.Admin

### 12. Translation Files
**Files**:
- `src/Apps/App.Admin/src/i18n/locales/en.json`
- `src/Apps/App.Admin/src/i18n/locales/vi.json`

**Cần cập nhật**:
- Loại bỏ: `ward`, `wardPlaceholder`, `district`, `districtPlaceholder`
- Thêm mới: `subdivision`, `subdivisionPlaceholder`
- Thay đổi: `state` → `stateOrProvince`, `zipCode` → `postalCode`

### 13. Create Order Page
**File**: `src/Apps/App.Admin/src/pages/orders/create.jsx`
- Cập nhật validation schema: Tất cả fields đều required (Subdivision, City, StateOrProvince, Country, PostalCode)
- Cập nhật form initial values
- Cập nhật UI: Thay 2 fields (Ward, District) → 1 field (Subdivision) - required
- Cập nhật form submission data structure: Tất cả fields đều phải có giá trị

### 14. Edit Order Page
**File**: `src/Apps/App.Admin/src/pages/orders/edit.jsx`
- Tương tự như create page
- Cập nhật form initialization khi load order data

### 15. Order Details Page
**File**: `src/Apps/App.Admin/src/pages/orders/details.jsx`
- Cập nhật hiển thị: Ward, District → Subdivision
- Cập nhật: State → StateOrProvince, ZipCode → PostalCode

---

## Frontend - App.Store

### 16. Translation Files
**Files**:
- `src/Apps/App.Store/src/i18n/locales/en.json`
- `src/Apps/App.Store/src/i18n/locales/vi.json`

**Cần cập nhật**: Tương tự App.Admin

### 17. Checkout Section
**File**: `src/Apps/App.Store/src/components/checkout/CheckoutSection.jsx`
- Cập nhật validation schema: Tất cả fields đều required (Subdivision, City, StateOrProvince, Country, PostalCode)
- Cập nhật initial values
- Cập nhật UI: Thay 2 fields (Ward, District) → 1 field (Subdivision) - required
- Cập nhật form submission data structure: Tất cả fields đều phải có giá trị

---

## Thứ tự thực hiện

### Phase 1: Backend Domain & Shared
1. ✅ Cập nhật Address value object (constructor, factory method)
2. ✅ Cập nhật MessageCode constants
3. ✅ Cập nhật AddressIntegrationEvent
4. ✅ Cập nhật AddressDomainEvent

### Phase 2: Backend Application
5. ✅ Cập nhật AddressDto
6. ✅ Cập nhật BasketCheckoutAddressDto
7. ✅ Cập nhật Order Command validators và handlers
8. ✅ Cập nhật Basket Command validator và handler
9. ✅ Cập nhật Event handlers

### Phase 3: Backend Infrastructure
10. ✅ Cập nhật OrderEntityConfiguration (EF Core)
11. ⚠️ Tạo database migration mới

### Phase 4: Frontend Translations
12. ✅ Cập nhật App.Admin translations
13. ✅ Cập nhật App.Store translations

### Phase 5: Frontend UI
14. ✅ Cập nhật App.Admin create page
15. ✅ Cập nhật App.Admin edit page
16. ✅ Cập nhật App.Admin details page
17. ✅ Cập nhật App.Store checkout section

---

## Lưu ý quan trọng

1. **Database Migration**: Sau khi cập nhật EF Core configuration, cần tạo migration mới để:
   - Đổi tên columns: `shipping_ward` → `shipping_subdivision`
   - Xóa column: `shipping_district`
   - Đổi tên: `shipping_state` → `shipping_state_or_province`
   - Đổi tên: `shipping_zip_code` → `shipping_postal_code`

2. **Backward Compatibility**: Đây là breaking change - cần đảm bảo:
   - Tất cả services được deploy đồng bộ
   - Database migration được chạy trước khi deploy code mới
   - Có thể cần data migration script để chuyển đổi dữ liệu cũ

3. **Subdivision Logic**: Subdivision thay thế cả Ward và District, nên cần:
   - Trong UI: Cho phép nhập Ward/County trong 1 field
   - Trong validation: Chỉ validate Subdivision (không còn Ward và District riêng)

4. **Tất cả fields đều required**: AddressLine, Subdivision, City, StateOrProvince, Country, PostalCode đều phải có validation required và không được null

