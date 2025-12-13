## 🎯 Type of Change (select one)

- [ ] **Backend Service** (.NET - Catalog, Basket, Order, Discount, Inventory, Notification, Search, Report)
- [ ] **React UI** (App.Store or App.Admin) - ⚠️ **SCREENSHOTS REQUIRED**
- [ ] **API Gateway / Job Orchestrator**
- [ ] **Shared Libraries** (BuildingBlocks, Common, Contracts, EventSourcing)
- [ ] **CI/CD / Docker / Infrastructure**
- [ ] **Documentation**

---

## 📝 Description

### What does this PR do?


### Why is this change needed?


### How to test?


---

## ✅ Checklist (uncomment relevant section)

### 🔹 Backend Service
<!-- Uncomment if Backend PR
- [ ] Uses `MessageCode` constants (NO hardcoded strings)
- [ ] Follows CQRS pattern (Command/Query)
- [ ] Has FluentValidation validators
- [ ] Correct naming conventions (XxxCommand, XxxQuery, XxxEntity)
- [ ] Code organized with regions (Ctors, Implementations, Methods)
- [ ] Domain events (if applicable)
- [ ] Repository pattern
-->

### 🔹 React UI (App.Store / App.Admin)
<!-- Uncomment if UI PR
- [ ] **ALL text uses i18n** `t("key")` - NO hardcoded text
- [ ] Added translations to `/i18n/locales/[language].json`
- [ ] API calls in `/services` (not direct calls)
- [ ] Endpoints from `/api/endpoints`
- [ ] Constants in `/constant` directory
- [ ] Utility functions in `/utils`
- [ ] Forms use Formik + Yup validation
- [ ] Catch blocks use `console.error()` ONLY - NO toast
- [ ] Reusable components, follows hooks best practices
-->

### 🔹 Infrastructure / CI/CD
<!-- Uncomment if Infrastructure PR
- [ ] Tested in dev environment
- [ ] No secrets committed
- [ ] Rollback plan documented
- [ ] Environment variables documented
-->

---

## 📸 Screenshots / Videos

<!-- 
⚠️ REQUIRED for UI changes!

Minimum required:
1. Desktop view (1920x1080)
2. Mobile view (375x667)
3. Before/After (if modifying existing UI)

Recommended:
- Different states (Loading, Error, Empty, Success)
- Video/GIF showing user interaction
-->


### Before/After (if applicable)
<!-- Add comparison screenshots here -->


---

## 🔍 Technical Details (optional)

### Components/Services affected

### API Changes (if any)
```json
// Request example

```

```json
// Response example

```

### Database Changes (if any)
- [ ] No changes
- [ ] Schema changes
- [ ] New entities
- [ ] Migration required

---

## 🧪 Testing

### Tested
- [ ] Manual testing
- [ ] Different scenarios (success, error, edge cases)
- [ ] Responsive design (if UI)
- [ ] Multiple browsers (if UI)

### Test scenarios
1. 
2. 
3. 

---

## 🔗 Related Issues

Closes #
Related to #

---

## ⚠️ Breaking Changes

- [ ] This PR contains breaking changes

<!-- If yes, describe in detail -->

---

## 📋 Notes

<!-- Additional info, deployment notes, etc. -->

---

<details>
<summary>📖 <b>Coding Standards Quick Reference</b> (click to expand)</summary>

### Backend (.NET)
- **MessageCode**: All messages use constants from `MessageCode` class
- **CQRS**: Commands (write), Queries (read) separated
- **Validators**: Every Command/Query has FluentValidation validator
- **Naming**: `XxxCommand`, `XxxQuery`, `XxxEntity`, `XxxDto`, `XxxRepository`, `XxxService`
- **Architecture**: Domain → Application → Infrastructure → API (Clean Architecture)
- **Constructors**: Use primary constructor pattern for handlers
- **Regions**: `#region Ctors`, `#region Implementations`, `#region Methods`

### Frontend (React)
- **i18n**: `t("translation.key")` for ALL text - NO hardcoded strings
- **API**: Endpoints from `/api/endpoints`, services in `/services`
- **Forms**: Formik + Yup for validation
- **Constants**: Magic values in `/constant`
- **Utils**: Reusable functions in `/utils`
- **Error Handling**: `console.error()` in catch - NO toast notifications
- **Components**: Functional components with hooks
- **Translation**: Add keys to `/i18n/locales/en.json` and `vi.json`

</details>
