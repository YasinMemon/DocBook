# Sign In Page - Visual & Component Reference

## 🎨 Page Layout Diagram

### Desktop View (≥768px)

```
┌─────────────────────────────────────────────────────────────────┐
│                       Sign In Page (Full)                        │
│ ┌───────────────────────┬──────────────────────────────────────┐ │
│ │                       │                                        │ │
│ │  Left Column          │      Right Column                     │ │
│ │  (Hidden on Mobile)   │                                       │ │
│ │                       │   ┌──────────────────────────────┐   │ │
│ │  DocBook              │   │  Welcome Back                │   │ │
│ │  (Logo)               │   │  Sign in to your account...  │   │ │
│ │                       │   │                              │   │ │
│ │  ✓ Verified Doctors   │   │  Email Input                 │   │ │
│ │  ✓ Secure & Private   │   │  [email@example.com      ]   │   │ │
│ │  ✓ 24/7 Support       │   │                              │   │ │
│ │                       │   │  Password Input              │   │ │
│ │                       │   │  [••••••••••••        👁️]   │   │ │
│ │                       │   │                              │   │ │
│ │                       │   │ ☑️ Remember me  Forgot pwd? │   │ │
│ │                       │   │                              │   │ │
│ │                       │   │  [Sign In Button]            │   │ │
│ │                       │   │                              │   │ │
│ │                       │   │         or                   │   │ │
│ │                       │   │                              │   │ │
│ │                       │   │  [Google Sign In]            │   │ │
│ │                       │   │  [Apple Sign In]             │   │ │
│ │                       │   │                              │   │ │
│ │                       │   │  Don't have account? Sign Up │   │ │
│ │                       │   └──────────────────────────────┘   │ │
│ │                       │                                       │ │
│ └───────────────────────┴──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile View (<768px)

```
┌──────────────────────────┐
│   Sign In Page (Mobile)   │
├──────────────────────────┤
│                          │
│  Welcome Back            │
│  Sign in to your account │
│                          │
│  Email Input             │
│  [email@example.com  ]   │
│                          │
│  Password Input          │
│  [••••••••          👁️]  │
│                          │
│ ☑️ Remember me Forgot pwd?
│                          │
│  [Sign In Button]        │
│                          │
│         or               │
│  [Google Sign In]        │
│  [Apple Sign In]         │
│                          │
│ Don't have account?      │
│ Sign Up                  │
│                          │
└──────────────────────────┘
```

---

## 📦 Component Hierarchy

```
App.jsx
├── Navbar.jsx
└── Routes
    ├── HomePage
    ├── DoctorsPage
    ├── ... other pages
    └── SignInPage.jsx ✨ NEW
        └── SignInForm.jsx ✨ NEW
            └── SocialAuthButtons.jsx ✨ NEW
```

---

## 🎯 Component Breakdown

### 1. SignInPage.jsx

**Purpose**: Layout container with two-column design

**Key Elements**:

- Gradient background: `from-blue-50 to-indigo-100`
- Left column: Branding + trust indicators (desktop only)
- Right column: SignInForm component

**Props**: None (self-contained)

**State**: None (managed by child component)

**Render**:

```
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="grid grid-cols-1 md:grid-cols-2">
    {/* Left: Branding */}
    {/* Right: SignInForm */}
  </div>
</div>
```

---

### 2. SignInForm.jsx

**Purpose**: Form logic, validation, and submission

**Key Elements**:

- Email input
- Password input with toggle
- Remember me checkbox
- Forgot password link
- Sign in button
- Divider
- SocialAuthButtons component
- Sign up link

**State**:

```javascript
{
  formData: {
    email: string,
    password: string,
    rememberMe: boolean
  },
  errors: { email?: string, password?: string },
  showPassword: boolean,
  isSubmitting: boolean
}
```

**Props**: None (self-contained)

**Key Functions**:

- `validateForm()`: Checks email & password
- `handleChange()`: Updates form state
- `handleSubmit()`: Form submission logic

**Validation Rules**:

```
Email:
- Required
- Must be valid format (regex)

Password:
- Required
- Minimum 6 characters
```

---

### 3. SocialAuthButtons.jsx

**Purpose**: Google & Apple OAuth buttons

**Key Elements**:

- Google sign in button
- Apple sign in button
- With official logos

**Props**: None

**Functions**:

- `handleGoogleSignIn()`: Placeholder for Google OAuth
- `handleAppleSignIn()`: Placeholder for Apple OAuth

**Status**: UI-only, ready for OAuth integration

---

## 🎨 Color & Styling Guide

### Color Palette

```
Primary Blue:      #2563eb (blue-600)
Primary Indigo:    #4f46e5 (indigo-600)
Light Blue BG:     #eff6ff (blue-50)
Light Indigo BG:   #e0e7ff (indigo-100)

Text - Dark:       #111827 (gray-900)
Text - Light:      #4b5563 (gray-600)
Border:            #d1d5db (gray-300)

Error:             #dc2626 (red-600)
Error BG:          #fef2f2 (red-50)

Success:           #16a34a (green-600)
```

### Tailwind Classes Used

```
Spacing:
- px-4, px-8: Padding horizontal
- py-2.5, py-12: Padding vertical
- gap-2, gap-3: Gaps between items
- space-y-5: Vertical spacing

Layout:
- flex, grid: Layouts
- grid-cols-1, md:grid-cols-2: Responsive grid
- max-w-*, w-full: Width constraints

Typography:
- text-sm, text-xl, text-3xl: Font sizes
- font-medium, font-bold: Font weights
- text-gray-700, text-blue-600: Colors

Effects:
- rounded-lg, rounded-2xl: Border radius
- shadow-md, shadow-xl: Shadows
- transition-colors, transition-all: Animations
- hover:*, focus:*: Interactive states
- disabled:opacity-50: Disabled states
```

---

## 🔄 Form Flow Diagram

```
START
  ↓
User enters email & password
  ↓
User clicks "Sign In" button
  ↓
handleSubmit() called
  ↓
validateForm() checks:
  ├─ Email required? ✓
  ├─ Email format? ✓
  ├─ Password required? ✓
  └─ Password length? ✓
  ↓
Has errors?
  ├─ YES → Display errors, STOP
  └─ NO → Continue
  ↓
setIsSubmitting(true) [show loading]
  ↓
Simulate API call (setTimeout 1000ms)
  ↓
On success:
  ├─ Store token (localStorage)
  └─ navigate("/") [redirect home]
  ↓
setIsSubmitting(false) [hide loading]
  ↓
END
```

---

## ✅ Validation Flow

### Email Validation

```
Input Changes
  ↓
Clear any existing email error
  ↓
User submits form
  ↓
Check if email empty?
  ├─ YES → Set error: "Email is required"
  └─ NO → Check format
  ↓
Check email format with regex:
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  ├─ INVALID → Set error: "Please enter a valid email"
  └─ VALID → No error
  ↓
Return errors object
```

### Password Validation

```
Input Changes
  ↓
Clear any existing password error
  ↓
User submits form
  ↓
Check if password empty?
  ├─ YES → Set error: "Password is required"
  └─ NO → Check length
  ↓
Check password length >= 6?
  ├─ NO → Set error: "Password must be at least 6 characters"
  └─ YES → No error
  ↓
Return errors object
```

---

## 🔐 Password Toggle Implementation

```
State: showPassword = false (hidden by default)

Click eye button:
  ↓
Toggle showPassword state
  ↓
showPassword === true?
  ├─ YES → type="text" [show password]
  └─ NO → type="password" [hide password]
  ↓
Switch eye icon:
  ├─ Visible eye → Hidden by default
  └─ Hidden eye → Shown when hidden
```

---

## 📱 Responsive Breakpoints

```
Mobile: 0px - 767px
├─ Single column layout
├─ Left branding hidden
├─ Full-width form
└─ Stack all elements vertically

Tablet: 768px - 1023px
├─ Two columns
├─ Show left branding
├─ Adjusted padding
└─ Increased spacing

Desktop: 1024px+
├─ Two columns
├─ Show left branding
├─ Full spacing & layout
└─ Enhanced visuals
```

**Key Responsive Classes**:

- `hidden md:flex` → Hide on mobile, show on tablet+
- `grid-cols-1 md:grid-cols-2` → 1 col on mobile, 2 on tablet+
- `w-full max-w-md` → Full width limited to max-width
- `px-4 lg:px-8` → Different padding by screen size

---

## 🎯 User Interactions Map

```
Email Input:
  ├─ Type → Clear error message
  ├─ Submit empty → Show error
  ├─ Invalid format → Show error
  └─ Valid → No error

Password Input:
  ├─ Type → Clear error message
  ├─ Submit empty → Show error
  ├─ Too short → Show error
  └─ Valid → No error

Password Toggle Button:
  ├─ Click → Show password
  ├─ Click again → Hide password
  └─ Keyboard: Tab to focus, Space/Enter to toggle

Remember Me Checkbox:
  ├─ Check → Save state
  ├─ Uncheck → Clear state
  └─ Keyboard: Tab to focus, Space to toggle

Forgot Password Link:
  ├─ Click → Navigate to /forgot-password
  └─ Keyboard: Tab + Enter

Sign In Button:
  ├─ Click (valid form) → Show loading, submit
  ├─ Click (invalid form) → Show errors
  ├─ On loading → Button disabled, spinner shown
  └─ Keyboard: Tab + Enter to submit

Sign Up Link:
  ├─ Click → Navigate to /sign-up
  └─ Keyboard: Tab + Enter

Google Button:
  └─ Click → Trigger Google OAuth

Apple Button:
  └─ Click → Trigger Apple OAuth
```

---

## 🧩 Component Props & State Summary

### SignInPage

| Prop   | Type | Required | Default |
| ------ | ---- | -------- | ------- |
| _None_ | -    | -        | -       |

| State | Type |
| ----- | ---- |
| None  | -    |

---

### SignInForm

| Prop   | Type | Required | Default |
| ------ | ---- | -------- | ------- |
| _None_ | -    | -        | -       |

| State          | Type    | Initial                                          |
| -------------- | ------- | ------------------------------------------------ |
| `formData`     | Object  | `{ email: "", password: "", rememberMe: false }` |
| `errors`       | Object  | `{}`                                             |
| `showPassword` | Boolean | `false`                                          |
| `isSubmitting` | Boolean | `false`                                          |

---

### SocialAuthButtons

| Prop   | Type | Required | Default |
| ------ | ---- | -------- | ------- |
| _None_ | -    | -        | -       |

| State | Type |
| ----- | ---- |
| None  | -    |

---

## 🔗 Link Navigation Map

```
Current Page: /sign-in

From SignInForm:
├─ Forgot Password Link
│  └─ href: "#forgot-password"
│     (Ready to change to: /forgot-password)
│
├─ Sign Up Link
│  └─ href: "/sign-up"
│
└─ After successful sign-in
   └─ navigate("/") → Home page
```

---

## ⌨️ Keyboard Navigation Order

```
1. Email input
2. Password input
3. Show/hide password button
4. Remember me checkbox
5. Forgot password link
6. Sign In button
7. Google button
8. Apple button
9. Sign Up link
```

---

## 🧪 Testing Points Map

```
Form Validation
├─ Email
│  ├─ Empty → Error
│  ├─ Invalid → Error
│  └─ Valid → No error
└─ Password
   ├─ Empty → Error
   ├─ Short → Error
   └─ Valid → No error

User Interactions
├─ Password toggle works
├─ Remember me toggles
├─ Error clears on input
├─ Loading state shows
└─ Form submits with valid data

Responsive
├─ Desktop: 2 columns
├─ Tablet: Adjusts spacing
└─ Mobile: 1 column, hidden branding

Accessibility
├─ Tab order correct
├─ Labels associated
├─ Focus states visible
├─ Error messages linked
└─ Color contrast OK
```

---

## 🎯 CSS Classes Reference

### Input Styling

```css
/* Base state */
border-gray-300 bg-white hover:border-gray-400

/* Focus state */
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent

/* Error state */
border-red-500 bg-red-50
```

### Button Styling

```css
/* Primary button */
bg-gradient-to-r from-blue-600 to-indigo-600
hover:from-blue-700 hover:to-indigo-700
focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
disabled:opacity-50 disabled:cursor-not-allowed

/* Secondary buttons (Google/Apple) */
border border-gray-300
hover:bg-gray-50
focus:ring-2 focus:ring-blue-500
```

---

## 📊 State Management Flow

```
Component Mount
  ↓
Initialize state:
  ├─ formData = { email: "", password: "", rememberMe: false }
  ├─ errors = {}
  ├─ showPassword = false
  └─ isSubmitting = false
  ↓
User Interaction
  ↓
Update State
  ├─ formData changes
  ├─ errors clear
  ├─ showPassword toggles
  └─ isSubmitting changes
  ↓
Re-render with new state
  ↓
Display updated UI
```

---

_This is a complete reference guide for the Sign In page implementation._  
_Use this for understanding architecture, debugging, or extending functionality._
