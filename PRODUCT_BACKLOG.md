# PRODUCT BACKLOG - Doctor Appointment System (DAS)

## Overview
This document contains the prioritized list of features, enhancements, and technical tasks for the Doctor Appointment System. Items are ranked by value and dependencies.

**Last Updated:** April 2026  
**Total Items:** 45  
**Prioritization Method:** MoSCoW (Must, Should, Could, Won't)

---

## Legend

| Priority | Label | Meaning |
|----------|-------|---------|
| 🔴 Critical | Must Have | Essential for MVP/deadline |
| 🟠 High | Should Have | Important for value, 2-3 sprints |
| 🟡 Medium | Could Have | Nice to have, flexible timeline |
| 🟢 Low | Won't Have | Future consideration |

| Status | Meaning |
|--------|---------|
| 📋 Backlog | Not started |
| 📌 Ready | Ready for sprint |
| ▶️ In Progress | Currently being worked on |
| ✅ Done | Completed and deployed |

---

## PHASE 1: MVP (Current - Must Have) 🔴

### Epic 1: User Authentication & Onboarding

#### 1. User Registration (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Patients can create accounts with email/password
- **AC:** 
  - Form validation working
  - Password requirements enforced (min 8 chars, uppercase, number)
  - Email verification sent
  - User data saved to MongoDB
- **Dependencies:** None
- **Assigned to:** [Team Member]

#### 2. Patient Login (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Patients can sign in with credentials or Google OAuth
- **AC:**
  - Email/password login functional
  - Google OAuth integration working
  - JWT token generation
  - Session persistence
- **Dependencies:** User Registration
- **Assigned to:** [Team Member]

#### 3. Doctor Registration/Onboarding (Story Points: 8)
- **Priority:** 🔴 Critical
- **Status:** 📌 Ready
- **Description:** Doctors complete multi-step onboarding with verification
- **AC:**
  - Multi-step form (personal, education, specialization)
  - Document uploads (license, certificates)
  - Email verification
  - Admin approval workflow
  - Doctor profile complete
- **Dependencies:** User Registration
- **Assigned to:** [Team Member]

#### 4. Admin Authentication (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Admin login with special credentials
- **AC:**
  - Admin login page
  - Admin-only access control
  - JWT with admin role
  - Admin routes protected
- **Dependencies:** User Registration
- **Assigned to:** [Team Member]

---

### Epic 2: Doctor Discovery & Browsing

#### 5. Doctor Directory (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Patients can browse list of verified doctors
- **AC:**
  - Doctor list page displays all doctors
  - Doctor cards show name, specialization, photo, rating
  - Pagination working (10 per page)
  - Load time < 2 seconds
- **Dependencies:** Doctor Registration
- **Assigned to:** [Team Member]

#### 6. Doctor Search (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** 📌 Ready
- **Description:** Search doctors by name, specialization, location
- **AC:**
  - Search input functional
  - Results update in real-time
  - Filters by specialization
  - Results sorted by rating
- **Dependencies:** Doctor Directory
- **Assigned to:** [Team Member]

#### 7. Doctor Detail Page (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** View complete doctor profile and availability
- **AC:**
  - Display all doctor information
  - Show experience, qualifications
  - Display reviews/ratings
  - Show available time slots
  - Patient can book appointment from here
- **Dependencies:** Doctor Directory
- **Assigned to:** [Team Member]

#### 8. Specialization Filters (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Filter doctors by medical specialization
- **AC:**
  - Specialization list displays
  - Filter updates doctor list
  - Multiple selections allowed
  - Counters show results per specialization
- **Dependencies:** Doctor Directory
- **Assigned to:** [Team Member]

---

### Epic 3: Appointment Booking & Management

#### 9. Appointment Booking Flow (Story Points: 8)
- **Priority:** 🔴 Critical
- **Status:** ▶️ In Progress
- **Description:** Patients can book appointments with available doctors
- **AC:**
  - Display available time slots
  - Slot selection UI functional
  - Appointment confirmation
  - Booking saved to database
  - Confirmation email sent
  - Appointment ID generated
- **Dependencies:** Doctor Detail Page
- **Assigned to:** [Team Member]

#### 10. Doctor Schedule Management (Story Points: 8)
- **Priority:** 🔴 Critical
- **Status:** 📌 Ready
- **Description:** Doctors can set and manage availability
- **AC:**
  - Doctor dashboard has schedule section
  - Add/edit availability by date/time
  - Block unavailable slots
  - View booked appointments
  - Recurring slots support
- **Dependencies:** Doctor Registration
- **Assigned to:** [Team Member]

#### 11. Appointment Rescheduling (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Patients/doctors can reschedule existing appointments
- **AC:**
  - Reschedule button in appointment details
  - Select new available slot
  - Confirmation email sent
  - Old slot freed up
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** TBD

#### 12. Appointment Cancellation (Story Points: 3)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Cancel appointments with notification
- **AC:**
  - Cancel button in appointment details
  - Confirmation dialog
  - Cancellation email to both parties
  - Slot freed up automatically
  - Cancellation recorded
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** TBD

---

### Epic 4: Notifications & Communication

#### 13. Email Notifications - Appointment Confirmation (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Send confirmation email when appointment booked
- **AC:**
  - Email sent to patient after booking
  - Email sent to doctor
  - Includes appointment details
  - Uses professional template
  - Sent within 30 seconds
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** [Team Member]

#### 14. Email Notifications - Reminders (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Send appointment reminders 24 hours before
- **AC:**
  - Job scheduler configured
  - Reminder email sent 24h before
  - Includes appointment link
  - Template with doctor/patient info
  - Unsubscribe option
- **Dependencies:** Email Notifications - Confirmation
- **Assigned to:** TBD

---

### Epic 5: Admin Dashboard

#### 15. Admin Dashboard - Overview (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** 📌 Ready
- **Description:** Admin can view system statistics and metrics
- **AC:**
  - Dashboard page accessible to admins
  - Display total users, doctors, appointments
  - Show recent activity
  - Display system status
  - Performance metrics visible
- **Dependencies:** Admin Authentication
- **Assigned to:** [Team Member]

#### 16. Admin - Doctor Approval Management (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** 📌 Ready
- **Description:** Admin reviews and approves doctor registrations
- **AC:**
  - Pending doctors list displayed
  - View doctor details and documents
  - Approve/reject button
  - Send email notification
  - Track approval status
- **Dependencies:** Doctor Registration
- **Assigned to:** [Team Member]

#### 17. Admin - User Management (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Admin can view and manage users
- **AC:**
  - User list page with search
  - User details modal
  - Edit user info
  - Deactivate/activate users
  - Action audit trail
- **Dependencies:** Admin Dashboard - Overview
- **Assigned to:** TBD

#### 18. Admin - Appointment Management (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Admin can view and manage appointments
- **AC:**
  - Appointment list with filters
  - View details
  - Manual rescheduling
  - Cancel with reason
  - Export reports
- **Dependencies:** Admin Dashboard - Overview
- **Assigned to:** TBD

---

### Epic 6: Data & Security

#### 19. Data Validation & Sanitization (Story Points: 5)
- **Priority:** 🔴 Critical
- **Status:** ▶️ In Progress
- **Description:** Validate and sanitize all user inputs
- **AC:**
  - Input validation on all forms
  - Backend validation for API endpoints
  - XSS prevention implemented
  - SQL injection prevention
  - CORS configured
- **Dependencies:** None
- **Assigned to:** [Team Member]

#### 20. Password Security (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Implement secure password hashing and reset
- **AC:**
  - Passwords hashed with bcrypt
  - Salt rounds: 10+
  - Password reset functionality
  - Reset link expires in 1 hour
  - Email sent for reset
- **Dependencies:** User Registration
- **Assigned to:** [Team Member]

#### 21. JWT Authentication (Story Points: 3)
- **Priority:** 🔴 Critical
- **Status:** ✅ Done
- **Description:** Implement JWT for session management
- **AC:**
  - JWT tokens generated on login
  - Token expiration: 7 days
  - Refresh token mechanism
  - Token validation on protected routes
  - Logout clears token
- **Dependencies:** User Registration
- **Assigned to:** [Team Member]

---

## PHASE 2: Enhancement (Should Have) 🟠

### Epic 7: User Experience

#### 22. User Profile Management (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Users can view and edit their profile
- **AC:**
  - Profile page accessible
  - Edit personal information
  - Upload profile picture
  - Update email/phone
  - Change password
  - Privacy settings
- **Dependencies:** User Registration
- **Assigned to:** TBD

#### 23. Doctor Reviews & Ratings (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Patients can leave reviews and ratings
- **AC:**
  - Review form on doctor page
  - Rating system (1-5 stars)
  - Review moderation
  - Display average rating
  - Sort by rating
- **Dependencies:** Doctor Detail Page
- **Assigned to:** TBD

#### 24. Appointment History (Story Points: 3)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Users can view past appointments
- **AC:**
  - Show past appointments list
  - Filter by date range
  - View appointment details
  - Download receipt/summary
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** TBD

#### 25. Upcoming Appointments View (Story Points: 3)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Users see upcoming appointments prominently
- **AC:**
  - Dashboard shows next appointment
  - Countdown to appointment
  - Quick reschedule option
  - Map to location (if available)
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** TBD

#### 26. Doctor Availability Calendar (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Visual calendar for doctor availability
- **AC:**
  - Month/week/day view
  - Click date to see slots
  - Color coding (available/booked/off)
  - Drag-and-drop reschedule
  - Sync with Google Calendar
- **Dependencies:** Doctor Schedule Management
- **Assigned to:** TBD

### Epic 8: Advanced Features

#### 27. Advanced Search Filters (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Filter doctors by multiple criteria
- **AC:**
  - Filter by experience level
  - Filter by rating
  - Filter by availability
  - Filter by consultation fee
  - Save search filters
  - Multiple filter combinations
- **Dependencies:** Doctor Search
- **Assigned to:** TBD

#### 28. Favorites/Bookmarking (Story Points: 2)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Users can bookmark favorite doctors
- **AC:**
  - Add to favorites button
  - Favorites list page
  - Quick re-booking from favorites
  - Send email when doctor available
- **Dependencies:** Doctor Detail Page
- **Assigned to:** TBD

#### 29. Payment Integration (Story Points: 13)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Online payment for appointments
- **AC:**
  - Payment gateway integration (Stripe/Razorpay)
  - Payment at booking or on-site
  - Invoice generation
  - Refund handling
  - Payment records in DB
  - Receipt email
- **Dependencies:** Appointment Booking Flow
- **Assigned to:** TBD

#### 30. Multi-language Support (Story Points: 8)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Support multiple languages
- **AC:**
  - Internationalization setup (i18n)
  - Implement 3 languages minimum
  - Language switcher UI
  - All text translated
  - Date/time localization
- **Dependencies:** None
- **Assigned to:** TBD

---

## PHASE 3: Scale (Could Have) 🟡

#### 31. Prescription Management (Story Points: 8)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Doctors can create digital prescriptions
- **AC:**
  - Prescription form in doctor dashboard
  - Prescription templates
  - Email prescription to patient
  - Download as PDF
  - Patient can view history
  - Pharmacy integration

#### 32. Medical Records (Story Points: 8)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Secure storage of patient medical records
- **AC:**
  - Upload medical records
  - Organize by type/date
  - Doctor access with permission
  - Download/print
  - Version history

#### 33. Video Consultation (Story Points: 13)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Video call integration
- **AC:**
  - WebRTC video integration
  - Start call from appointment
  - Recording option
  - Chat during call
  - Recording stored securely

#### 34. Analytics Dashboard (Story Points: 13)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** Admin analytics and reporting
- **AC:**
  - Doctor performance metrics
  - Patient satisfaction metrics
  - Revenue reports
  - Booking trends
  - Exportable reports

#### 35. Mobile App (Story Points: 34)
- **Priority:** 🟡 Medium
- **Status:** 📋 Backlog
- **Description:** React Native mobile application
- **AC:**
  - Feature parity with web
  - Push notifications
  - Offline capability
  - App stores (iOS/Android)

---

## PHASE 4: Future (Won't Have - Nice to Have) 🟢

#### 36. AI-Powered Recommendations (Story Points: 13)
- **Priority:** 🟢 Low
- **Status:** 📋 Backlog
- **Description:** ML-based doctor recommendations
- **AC:**
  - Collect user preferences
  - Recommend based on history
  - Personalized experience

#### 37. Telemedicine Features (Story Points: 21)
- **Priority:** 🟢 Low
- **Status:** 📋 Backlog
- **Description:** Full telemedicine support
- **AC:**
  - Remote consultations
  - Electronic health records
  - Digital prescriptions

#### 38. Insurance Integration (Story Points: 21)
- **Priority:** 🟢 Low
- **Status:** 📋 Backlog
- **Description:** Insurance verification and billing
- **AC:**
  - Check insurance coverage
  - Direct billing
  - Coverage estimates

#### 39. SMS Notifications (Story Points: 3)
- **Priority:** 🟢 Low
- **Status:** 📋 Backlog
- **Description:** SMS alerts for appointments
- **AC:**
  - SMS service integration
  - Booking confirmations
  - Reminders

#### 40. Push Notifications (Story Points: 3)
- **Priority:** 🟢 Low
- **Status:** 📋 Backlog
- **Description:** Browser/app push notifications
- **AC:**
  - Notification service setup
  - Opt-in/opt-out
  - Desktop/mobile alerts

---

## Technical Debt & Maintenance

#### 41. Upgrade Dependencies (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Keep packages updated
- **AC:**
  - Review outdated packages
  - Update when safe
  - Test after updates
  - Document breaking changes

#### 42. Performance Optimization (Story Points: 8)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Improve app performance
- **AC:**
  - Database query optimization
  - Frontend bundle size reduction
  - Image compression
  - Caching strategies
  - Lighthouse score > 90

#### 43. Test Coverage (Story Points: 13)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Implement comprehensive testing
- **AC:**
  - Unit tests (80% coverage)
  - Integration tests
  - E2E tests
  - CI/CD pipeline

#### 44. Documentation Updates (Story Points: 5)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Keep documentation current
- **AC:**
  - Update API docs
  - Update setup guide
  - Add troubleshooting section
  - API examples with curl/Postman

#### 45. Disaster Recovery Plan (Story Points: 8)
- **Priority:** 🟠 High
- **Status:** 📋 Backlog
- **Description:** Backup and recovery procedures
- **AC:**
  - Database backup automation
  - Recovery testing
  - Data retention policy
  - Business continuity plan

---

## Backlog Management Notes

### Prioritization Criteria
1. **Value to Users** - How much does it improve user experience?
2. **Business Impact** - Alignment with business goals?
3. **Risk/Dependencies** - Does it block other work?
4. **Technical Feasibility** - Can we build it with current skills?

### Refinement Process
- Backlog reviewed weekly during grooming sessions
- New items added with PO approval
- Items split if > 13 story points
- Dependencies documented
- Estimates reviewed each sprint

### Sprint Commitment
- Team commits to items in Sprint Backlog
- 60-70% should be predictable
- 20-30% improvement/flexibility
- Hold 10% buffer for critical fixes

---

**Backlog Status:** 🔴 6 Complete | ▶️ 2 In Progress | 📌 8 Ready | 📋 29 Backlog

**Next Backlog Refinement:** [To be scheduled]  
**Responsible:** Product Owner  
**Last Updated:** April 2026
