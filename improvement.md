# Signup Screen Update - React Native

## ✅ What’s Implemented

### 1. Reusable `CustomSelector` for Gender
- A reusable dropdown selector component has been implemented for selecting **Gender**.
- It is modular and can be reused for other dropdowns in the future.

### 2. New Fields Added (Based on Figma)
The following fields were added to the signup screen as per the provided Figma design:
- `Country`
- `City`
- `Date of Birth (DOB)`

These fields are now included in the **API payload** during the signup request.

### 3. Placeholder Issue in Dark Theme
- Fixed an issue where placeholder text would vanish in **dark mode**.
- Now all placeholders remain visible and accessible regardless of theme.

## ⚙️ Performance Consideration

- For better performance and data management, it is recommended to use **RTK Query**.
- RTK Query provides **automatic caching**, **request deduplication**, and **fine-grained server control** — making the app more efficient and scalable.

## 🐛 Note on Reported Delay
- A potential delay when clicking the `First Name` input was reported.
- After multiple tests, **no noticeable delay or issue could be reproduced**.
- Will continue monitoring in case the issue resurfaces.

---

## 📌 Recommendations for Future Improvement

- Use **Formik** or **React Hook Form** for better form state management.
- Apply **Yup validation schema** for cleaner validation logic.
- Consider integrating **RTK Query** throughout the app for a consistent data layer.

