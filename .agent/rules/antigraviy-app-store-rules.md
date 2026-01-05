---
trigger: glob
globs: src/Apps/App.Store/**/*
---

# App Store Rules - React/Next.js Project
# Only apply these rules for `src/Apps/App.Store/**/*`

## Project Architecture

### React/Next.js Standards
- Use functional components with hooks
- Implement code splitting and lazy loading
- Follow Next.js App Router/Pages Router conventions
- Use proper TypeScript types (avoid `any`)
- Implement error boundaries
- Use React performance optimizations (`useMemo`, `useCallback` when needed)

---

## API & Data Fetching

### Axios & API Endpoints
**🚨 CRITICAL: ALWAYS check `/api/endpoints` for existing endpoints before creating new API calls**

```javascript
// Use existing endpoint definitions from /api/endpoints.js
import { endpoints } from '@/api/endpoints';

try {
  const response = await apiService.getData();
} catch (error) {
  // ✅ CORRECT - Use console only
  console.error('Error fetching data:', error);
  
  // ❌ WRONG - NO toast notifications in catch blocks
  // toast.error('Error');
}
```

### API Services
**🚨 ALL API calls MUST be created as services in `/services`**

```javascript
// /services/userService.js
export const userService = {
  getUsers: () => axios.get(endpoints.users.list),
  createUser: (data) => axios.post(endpoints.users.create, data),
  updateUser: (id, data) => axios.put(endpoints.users.update(id), data),
};
```

**Rules:**
- Create reusable service functions
- Organize by feature/domain
- Never make direct axios calls in components

---

## Internationalization (i18n)

### i18n Usage Rules
**🚨 CRITICAL:**
- **ALL labels, text, messages MUST use i18n**
- **NO hardcoded text in UI**
- **NEVER use fallback patterns**

```javascript
// ❌ WRONG
<button>Submit</button>
const message = "Success";
const error = t("validation.required") || "Required field";

// ✅ CORRECT
<button>{t("common.submit")}</button>
const message = t("messages.success");
const error = t("validation.required");
```

### API Response Handling with `display*` Properties
When API returns properties like `displayName`, `displayStatus`:
- If already translated by backend → use directly
- If it's a translation key → pass through `t()`

```javascript
// If displayStatus is a translation key
const status = t(response.displayStatus);

// If displayStatus is already translated
const status = response.displayStatus;
```

### Translation File Management
- Add missing translations to `/i18n/locales/[language].json`
- Keep keys organized and hierarchical
- Use meaningful, descriptive keys

```json
// /i18n/locales/en.json
{
  "common": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "validation": {
    "required": "This field is required",
    "invalidEmail": "Invalid email format"
  }
}
```

---

## Code Organization

### Utility Functions
**🚨 Check `/utils` for existing utilities before creating new ones**

```javascript
// /utils/dateUtils.js
export const formatDate = (date) => {
  // formatting logic
};

// /utils/formatUtils.js
export const formatCurrency = (amount) => {
  // formatting logic
};
```

**Rules:**
- Extract reused logic to utilities
- Keep utilities pure and well-tested
- Organize by functionality

### Constants
**🚨 NO hardcoded values in components**

```javascript
// /constant/status.js
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};

// /constant/routes.js
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
};
```

**Rules:**
- Create all constants in `/constant` directory
- Use UPPER_SNAKE_CASE naming
- Organize by domain/feature

---

## Forms

### Form Management
**🚨 ALWAYS use Formik + Yup for ALL forms**

```javascript
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const MyForm = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.invalidEmail'))
      .required(t('validation.required')),
    age: Yup.number()
      .positive(t('validation.mustBePositive'))
      .required(t('validation.required'))
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          {/* form fields */}
        </Form>
      )}
    </Formik>
  );
};
```

**Rules:**
- Use Formik for form state management
- Use Yup for validation schemas
- All validation messages use i18n
- Use Formik's built-in error handling

---

## File Structure

```
/api
  /endpoints.js    # API endpoint definitions
/constant          # Constants and configuration
/services          # API service functions
/utils             # Utility functions
/i18n              # Translation files
  /locales
    /en.json
    /vi.json
/components        # React components
/pages or /app     # Next.js pages
```

---

## Best Practices

1. **Check Existing Code**: Always check `/api/endpoints`, `/utils`, `/services` before creating new code
2. **API Services**: All API calls must be in `/services`, never inline
3. **No Toast in Catch**: Use `console.error()` or `console.log()` only
4. **i18n Everything**: No hardcoded text, use `t()` without fallbacks
5. **Formik + Yup**: All forms use Formik and Yup validation
6. **Constants**: All magic values in `/constant` directory
7. **Utilities**: Extract repeated logic to `/utils`
8. **TypeScript**: Avoid `any`, use proper types
9. **Performance**: Use `useMemo`, `useCallback` when needed
10. **Error Boundaries**: Implement proper error handling

---

## Checklist

Before completing any task, verify:
- [ ] Checked `/api/endpoints` for existing endpoints
- [ ] Created service in `/services` for API calls
- [ ] Used `console` only in catch blocks (no toast)
- [ ] All text uses `t()` without fallback patterns
- [ ] Added missing translations to `/i18n/locales`
- [ ] API responses with `display*` handled appropriately
- [ ] Reused or created utilities in `/utils` for repeated logic
- [ ] All magic values moved to `/constant`
- [ ] Forms use Formik + Yup
- [ ] No hardcoded strings, numbers, or configurations
