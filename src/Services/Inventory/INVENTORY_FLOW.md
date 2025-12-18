# Inventory Service - Flow Documentation

## Overview
Inventory Service quản lý inventory items, reservations (đặt trước hàng), và history tracking. Service tương tác với các service khác thông qua Integration Events.

---

## Core Entities

### 1. **InventoryItemEntity**
- Quản lý số lượng hàng tồn kho tại từng location
- Properties:
  - `Product` (Value Object): ProductId, ProductName
  - `Quantity`: Tổng số lượng có sẵn
  - `Reserved`: Số lượng đã được reserve
  - `Available`: Số lượng có thể reserve = Quantity - Reserved
  - `LocationId`: Vị trí lưu trữ

### 2. **InventoryReservationEntity**
- Quản lý các reservation (đơn đặt hàng tạm thời)
- Properties:
  - `Product`: ProductId, ProductName
  - `ReferenceId`: OrderId (reference đến Order)
  - `LocationId`: Location của inventory item được reserve
  - `Quantity`: Số lượng reserve
  - `Status`: Pending/Committed/Released/Expired
  - `ExpiresAt`: Thời gian hết hạn reservation

### 3. **InventoryHistoryEntity**
- Lưu lịch sử thay đổi inventory
- Properties:
  - `Message`: Mô tả hành động
  - `CreatedBy`: Actor thực hiện

### 4. **LocationEntity**
- Quản lý các location (kho, chi nhánh)
- Properties:
  - `Location`: Tên location
  - `Address`: Địa chỉ

---

## Integration Events Flow

### 1. **BasketCheckoutIntegrationEvent** (Basket Service → Inventory Service)
**Trigger**: User checkout giỏ hàng

**Flow**:
```
1. Receive BasketCheckoutIntegrationEvent
   - BasketId
   - CustomerId
   - Items[] { ProductId, ProductName, Quantity }

2. Validate products từ Catalog Service (gRPC)
   - Kiểm tra sản phẩm có tồn tại không

3. Reserve inventory cho từng item:
   - Gọi ReserveInventoryCommand
   - Command tự động tìm inventory item có Available cao nhất
   - Reserve quantity và tạo InventoryReservationEntity
   - Status = Pending
   - ExpiresAt = Now + 30 minutes
   - Raise ReservedDomainEvent → Log history

4. Nếu thất bại:
   - Log error
   - Throw exception (Basket Service sẽ handle)
```

**Handler**: `BasketCheckoutIntegrationEventHandler`

---

### 2. **OrderCancelledIntegrationEvent** (Order Service → Inventory Service)
**Trigger**: User hủy đơn hàng

**Flow**:
```
1. Receive OrderCancelledIntegrationEvent
   - OrderId
   - OrderNo
   - CustomerId
   - Reason

2. Release reservations:
   - Gọi ReleaseReservationCommand với ReferenceId = OrderId
   - Tìm tất cả reservations có Status = Pending
   - Với mỗi reservation:
     * Unreserve inventory (giảm Reserved, tăng Available)
     * Đổi reservation Status = Released
     * Raise UnreservedDomainEvent → Log history

3. Log thành công/thất bại
```

**Handler**: `OrderCancelledIntegrationEventHandler`

---

### 3. **OrderDeliveredIntegrationEvent** (Order Service → Inventory Service)
**Trigger**: Order được giao thành công

**Flow**:
```
1. Receive OrderDeliveredIntegrationEvent
   - OrderId
   - OrderNo
   - CustomerId
   - OrderItems[] { ProductId, ProductName, Quantity }

2. Commit reservations:
   - Gọi CommitReservationCommand với ReferenceId = OrderId
   - Tìm tất cả reservations có Status = Pending
   - Với mỗi reservation:
     * Commit inventory (giảm Reserved VÀ giảm Quantity)
     * Đổi reservation Status = Committed
     * Raise StockChangedDomainEvent → Log history
     * Publish StockChangedIntegrationEvent (Outbox pattern)

3. Log chi tiết committed items
4. Throw exception nếu không tìm thấy reservation
```

**Handler**: `OrderDeliveredIntegrationEventHandler`

---

## Commands

### 1. **ReserveInventoryCommand**
- Input: `CreateReservationDto` { ProductId, ProductName, ReferenceId, Quantity, ExpiresAt }
- Logic:
  1. Tìm inventory item có `Available` cao nhất cho ProductId
  2. Validate đủ stock: `HasAvailable(quantity)`
  3. Tạo `InventoryReservationEntity` (Status = Pending)
  4. Gọi `inventoryItem.Reserve()`:
     - Tăng `Reserved`
     - Raise `ReservedDomainEvent`
  5. Save changes

### 2. **CommitReservationCommand**
- Input: `ReferenceId` (OrderId)
- Logic:
  1. Tìm tất cả reservations: `ReferenceId = orderId AND Status = Pending`
  2. Với mỗi reservation:
     - Tìm inventory item tương ứng
     - Gọi `inventoryItem.CommitReservation()`:
       * Giảm `Reserved`
       * Giảm `Quantity`
       * Raise `StockChangedDomainEvent`
     - Gọi `reservation.MarkCommitted()`:
       * Đổi Status = Committed
       * Raise `ReservationCommittedDomainEvent`
  3. Save changes

### 3. **ReleaseReservationCommand**
- Input: `ReferenceId` (OrderId), `Reason`
- Logic:
  1. Tìm tất cả reservations: `ReferenceId = orderId AND Status = Pending`
  2. Với mỗi reservation:
     - Tìm inventory item tương ứng
     - Gọi `inventoryItem.Unreserve()`:
       * Giảm `Reserved`
       * Raise `UnreservedDomainEvent`
     - Gọi `reservation.Release()`:
       * Đổi Status = Released
       * Raise `ReservationReleasedDomainEvent`
  3. Save changes

### 4. **ExpireReservationCommand**
- Input: `ReservationId`
- Logic:
  1. Tìm reservation theo Id
  2. Validate Status = Pending
  3. Tìm inventory item
  4. Gọi `inventoryItem.Unreserve()` (giảm Reserved)
  5. Gọi `reservation.Expire()` (Status = Expired)
  6. Raise `ReservationExpiredDomainEvent`
  7. Publish `ReservationExpiredIntegrationEvent` (Outbox)

### 5. **UpdateStockCommand** (Increase/Decrease)
- Input: `InventoryItemId`, `Amount`, `Source`, `ChangeType`
- Logic:
  - Tìm inventory item
  - Gọi `IncreaseStock()` hoặc `DecreaseStock()`
  - Raise `StockChangedDomainEvent`
  - Publish `StockChangedIntegrationEvent` (Outbox)

---

## Queries

### 1. **GetReservationsByReferenceQuery**
- Input: `ReferenceId` (OrderId)
- Output: `GetReservationsByReferenceResult` { Items: List<ReservationDto> }
- Sử dụng: Lấy tất cả reservations cho một Order

### 2. **GetInventoryItemsQuery**
- Input: `ProductFilter`, `PaginationRequest`
- Output: `GetInventoryItemsResult` với pagination
- Sử dụng: Tìm kiếm inventory items

### 3. **GetAllInventoryItemQuery**
- Input: None
- Output: `GetAllInventoryItemResult` { Items: List<InventoryItemDto> }
- Sử dụng: Lấy tất cả inventory items (không phân trang)

### 4. **GetAllHistoriesQuery**
- Input: None
- Output: `GetAllHistoriesResult` { Items: List<InventoryHistoryDto> }
- Sử dụng: Xem lịch sử thay đổi inventory

---

## Domain Events & Handlers

### 1. **ReservedDomainEvent**
- Handler: `ReservedDomainEventHandler`
- Action:
  - Log history: "Reserved -X units of product 'Y' at location 'Z' for reservation {Id}. Available: A, Reserved: R"

### 2. **UnreservedDomainEvent**
- Handler: `UnreservedDomainEventHandler`
- Action:
  - Log history: "Released X units of product 'Y' at location 'Z' from reservation {Id}. Available: A, Reserved: R"

### 3. **StockChangedDomainEvent**
- Handler: `StockChangedDomainEventHandler`
- Action:
  - Log history: "Product 'X' stock changed from Y to Z. Available: A"
  - Publish `StockChangedIntegrationEvent` (Outbox)

### 4. **ReservationCreatedDomainEvent**
- Handler: `ReservationCreatedDomainEventHandler`
- Action:
  - Publish `InventoryReservedIntegrationEvent` (Outbox) → Order Service

### 5. **ReservationCommittedDomainEvent**
- Handler: `ReservationCommittedDomainEventHandler`
- Action: (Có thể publish event nếu cần)

### 6. **ReservationReleasedDomainEvent**
- Handler: `ReservationReleasedDomainEventHandler`
- Action: (Có thể publish event nếu cần)

### 7. **ReservationExpiredDomainEvent**
- Handler: `ReservationExpiredDomainEventHandler`
- Action:
  - Publish `ReservationExpiredIntegrationEvent` (Outbox) → Order Service

---

## Background Services

### **ExpireReservationsBackgroundService**
- Chạy mỗi 5 phút
- Logic:
  1. Query tất cả reservations: `Status = Pending AND ExpiresAt < Now`
  2. Với mỗi expired reservation:
     - Gọi `ExpireReservationCommand`
  3. Log số lượng reservations đã expire

---

## API Endpoints

### Inventory Items
- `GET /inventory-items` - Tìm kiếm với filter & pagination
- `GET /inventory-items/all` - Lấy tất cả
- `POST /inventory-items` - Tạo mới
- `PUT /inventory-items/{id}` - Cập nhật
- `DELETE /inventory-items/{id}` - Xóa
- `PUT /inventory-items/{id}/stock/increase` - Tăng stock
- `PUT /inventory-items/{id}/stock/decrease` - Giảm stock

### Locations
- `GET /locations` - Lấy tất cả locations
- `GET /locations/{id}` - Lấy theo ID
- `POST /locations` - Tạo mới
- `PUT /locations/{id}` - Cập nhật
- `DELETE /locations/{id}` - Xóa

### Reservations
- `GET /reservations/by-reference?referenceId={orderId}` - Lấy reservations theo OrderId

### History
- `GET /histories` - Xem lịch sử

---

## Key Business Rules

1. **Reserve Logic**:
   - Tự động chọn inventory item có `Available` cao nhất
   - Validate đủ stock trước khi reserve
   - Reservation tự động expire sau 30 phút

2. **Commit Logic**:
   - Chỉ commit reservations có Status = Pending
   - Giảm cả Reserved VÀ Quantity
   - Raise StockChangedEvent để notify các service khác

3. **Release Logic**:
   - Trả lại Available (giảm Reserved)
   - Đổi Status = Released
   - Không làm thay đổi Quantity

4. **Expire Logic**:
   - Background job tự động expire reservations hết hạn
   - Giống Release nhưng Status = Expired
   - Publish event để notify Order Service

---

## Integration với Services khác

### **Catalog Service** (gRPC)
- Inventory → Catalog: Validate products khi reserve
- Catalog → Inventory: (Có thể publish ProductUpdatedEvent)

### **Order Service** (MassTransit)
- Order → Inventory: OrderCancelled, OrderDelivered
- Inventory → Order: InventoryReserved, ReservationFailed, ReservationExpired

### **Basket Service** (MassTransit)
- Basket → Inventory: BasketCheckout

---

## Error Handling

1. **ClientValidationException**:
   - Insufficient stock
   - Product not found
   - Invalid reservation

2. **NotFoundException**:
   - Inventory item not found
   - Reservation not found

3. **DomainException**:
   - Business rule violations (từ Entity methods)

---

## Notes

- Tất cả Integration Events được publish qua **Outbox Pattern** để đảm bảo consistency
- Domain Events được raise từ Entity methods và handle bởi Domain Event Handlers
- Reservation có timeout 30 phút để tránh lock inventory quá lâu
- Background service đảm bảo cleanup expired reservations

