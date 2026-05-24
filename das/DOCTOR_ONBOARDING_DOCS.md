# Doctor Onboarding Flow - Complete Documentation

## 📋 Overview

A comprehensive 6-step multi-step form for doctor registration with validation, state management, and professional UX.

## 🎯 Architecture

### Components Structure

```
DoctorOnboardingPage.jsx (Parent/Controller)
├── StepIndicator.jsx (Progress visualization)
├── BasicInfoStep.jsx (Step 1)
├── ProfessionalDetailsStep.jsx (Step 2)
├── ClinicDetailsStep.jsx (Step 3)
├── AvailabilityStep.jsx (Step 4)
├── DocumentsStep.jsx (Step 5)
└── SuccessStep.jsx (Step 6)
```

## 📝 Step-by-Step Breakdown

### Step 1: Basic Information

**Fields:**

- Full Name (text, min 2 chars)
- Email (validated format)
- Phone Number (min 10 chars)
- Password (min 8 chars, uppercase, lowercase, number required)
- Confirm Password (must match)

**Validation:**

- All fields required
- Email format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password strength: `(?=.*[a-z])(?=.*[A-Z])(?=.*\d)`
- Password match validation

---

### Step 2: Professional Details

**Fields:**

- Specialization (dropdown: 12 options including Cardiologist, Dermatologist, etc.)
- Years of Experience (number, 0-60 range)
- Qualification (dropdown: MBBS, MD, MS, DNB, etc.)
- Medical Registration Number (text, min 5 chars)

**Validation:**

- All fields required
- Experience within valid range
- Registration number minimum length

---

### Step 3: Clinic/Consultation Details

**Fields:**

- Clinic/Hospital Name (text)
- City (text)
- Consultation Type (radio: In-clinic, Online, Both)
- Consultation Fee (number with $ prefix, positive only)

**Validation:**

- All fields required
- Fee must be positive number

---

### Step 4: Availability

**Fields:**

- Available Days (checkboxes: Monday-Sunday)
- Time Slots (checkboxes: Morning 9-12, Afternoon 12-5, Evening 5-9)
- Consultation Duration (radio: 15 or 30 minutes)

**Validation:**

- At least one day selected
- At least one time slot selected
- Duration selection required

---

### Step 5: Documents Upload

**Fields:**

- Medical License Certificate (file: PDF, JPG, PNG up to 10MB)
- Government ID Proof (file: PDF, JPG, PNG up to 10MB)

**Validation:**

- Both documents required
- UI-only file selection (no actual upload logic)

**Features:**

- Drag-and-drop UI styling
- File name display after selection
- Upload icon with instructions
- Document guidelines info box

---

### Step 6: Success/Verification Pending

**Display:**

- ✅ Success icon and message
- 🟡 "Pending Verification" status badge
- Information box: What happens next (3 steps)
- Timeline: 24-48 hours review time
- Support email: support@docbook.com
- Action buttons: "Go to Dashboard" (placeholder), "Back to Home"

---

## 🔧 State Management

### Form Data State

```javascript
{
  // Step 1
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",

  // Step 2
  specialization: "",
  experience: "",
  qualification: "",
  registrationNumber: "",

  // Step 3
  clinicName: "",
  city: "",
  consultationType: "",
  consultationFee: "",

  // Step 4
  availableDays: [],
  timeSlots: [],
  consultationDuration: "",

  // Step 5
  medicalLicense: null,
  idProof: null,
}
```

### Error State

```javascript
errors: {
  [fieldName]: "Error message"
}
```

## 🎨 UX Features

### Navigation

- **Next Button**: Blue gradient, validates current step before proceeding
- **Back Button**: Gray bordered, clears errors when going back
- **Submit Button**: Green gradient on final step

### Progress Indicator

- 6 circles with step numbers
- Completed steps: Green with checkmark
- Current step: Blue with ring animation
- Upcoming steps: Gray
- Connecting lines show progress

### Error Handling

- Real-time error clearing on input change
- Red border + red background on error fields
- Error messages below fields
- Validation blocks navigation until resolved

### Responsive Design

- Mobile-first approach
- Single column on mobile
- Grid layouts on desktop
- Touch-friendly targets
- Readable step labels hidden on mobile

## 🔌 Integration Points

### Form Submission (Currently Mock)

```javascript
// In handleSubmit()
console.log("Form submitted:", formData);
setCurrentStep(6); // Move to success page
```

### Backend Integration Example

```javascript
const handleSubmit = async () => {
  const stepErrors = validateStep5();
  if (Object.keys(stepErrors).length > 0) {
    setErrors(stepErrors);
    return;
  }

  try {
    const response = await fetch("/api/doctor/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setCurrentStep(6);
    } else {
      // Handle error
    }
  } catch (error) {
    console.error("Submission failed:", error);
  }
};
```

## 📱 Routes

- **Entry Point**: `/doctor/onboarding`
- **Configured in**: `App.jsx`
- **Navigation from**:
  - Homepage DoctorCTASection
  - Sign-in page compact CTA
  - Footer "For Doctors" section

## ✨ Key Features

### 1. Persistent State

- Form data persists across steps
- Can navigate back without losing data
- Errors cleared only when revisiting steps

### 2. Validation Strategy

- Per-step validation functions
- Validation runs only on "Next" or "Submit"
- Individual field error clearing on change
- No form submission until all steps valid

### 3. Professional Styling

- Gradient backgrounds
- Shadow elevation
- Smooth transitions
- Focus states for accessibility
- Color-coded status indicators

### 4. Accessibility

- Semantic HTML
- ARIA labels on inputs
- Focus management
- Keyboard navigation support
- Required field indicators

## 🚀 Usage

### Starting the Flow

Navigate to `/doctor/onboarding` or click any "Register as Doctor" CTA

### Completing Registration

1. Fill Step 1 fields → Click "Next"
2. Fill Step 2 fields → Click "Next"
3. Fill Step 3 fields → Click "Next"
4. Select Step 4 options → Click "Next"
5. Upload Step 5 documents → Click "Submit for Verification"
6. View success message → "Go to Dashboard" or "Back to Home"

## 🔐 Security Notes

- Passwords shown with bullet points (type="password")
- No actual file upload (frontend only)
- Form data logged to console (remove in production)
- No authentication/session management

## 🎯 Production Checklist

- [ ] Connect to backend API
- [ ] Implement actual file upload
- [ ] Add loading states during submission
- [ ] Add error handling for API failures
- [ ] Remove console.log statements
- [ ] Add analytics tracking
- [ ] Implement "Go to Dashboard" navigation
- [ ] Add email verification step
- [ ] Store form progress in localStorage (optional)
- [ ] Add CAPTCHA for bot protection

## 📊 State Flow Diagram

```
Step 1 (Basic Info)
    ↓ Validate → Next
Step 2 (Professional)
    ↓ Validate → Next
Step 3 (Clinic)
    ↓ Validate → Next
Step 4 (Availability)
    ↓ Validate → Next
Step 5 (Documents)
    ↓ Validate → Submit
Step 6 (Success) → Dashboard/Home
```

## 🎨 Design Tokens

- **Primary**: Blue 600 → Indigo 600 gradient
- **Success**: Green 600 → Emerald 600 gradient
- **Background**: Blue 50 → Indigo 100 gradient
- **Error**: Red 500/600
- **Border**: Gray 300
- **Text**: Gray 700/900

## 📞 Support

Contact: support@docbook.com
Verification Time: 24-48 hours
