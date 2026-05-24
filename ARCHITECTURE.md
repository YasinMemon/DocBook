# ARCHITECTURE & SYSTEM DESIGN

## Overview
This document describes the overall architecture, system design, and technical decisions for the Doctor Appointment System (DAS).

**Last Updated:** April 2026  
**Tech Stack:** MERN (MongoDB, Express, React, Node.js)  
**Deployment:** Cloud (AWS/GCP)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Data Models](#data-models)
4. [API Design](#api-design)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Database Schema](#database-schema)
8. [Security Architecture](#security-architecture)
9. [Deployment Architecture](#deployment-architecture)
10. [Scalability & Performance](#scalability--performance)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  React Frontend (Browser) │ Mobile App (React Native)       │
│  - Patient Portal         │ - iOS/Android                   │
│  - Doctor Dashboard       │                                 │
│  - Admin Dashboard        │                                 │
└────────────────┬──────────────────────────────┬─────────────┘
                 │                              │
                 ▼                              ▼
        ┌─────────────────────────────────────────────┐
        │         API GATEWAY / LOAD BALANCER          │
        │  - Route requests                            │
        │  - Rate limiting                             │
        │  - CORS, Security headers                    │
        └────────────┬────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │   APPLICATION LAYER     │
        │  (Node.js/Express)      │
        ├───────────────────────┬─┤
        │ Auth Service          │E│
        │ Appointment Service   │N│
        │ Doctor Service        │D│
        │ User Service          │P│
        │ Admin Service         │O│
        │ Notification Service  │I│
        │ File Upload Service   │N│
        └────────┬──────────────┴─┤
                 │                │
        ┌────────▼────────┬───────▼────────┐
        │  DATABASE       │  EXTERNAL      │
        │  MongoDB        │  SERVICES      │
        │  - Collections  │  - Cloudinary  │
        │  - Indexes      │  - Nodemailer  │
        │  - Replicas     │  - Google Auth │
        │                 │  - Stripe      │
        └─────────────────┴────────────────┘
```

### Architectural Principles

1. **Separation of Concerns** - Clear division between frontend, API, and database
2. **Scalability** - Design for growing user base and data
3. **Reliability** - Error handling, redundancy, backups
4. **Security** - Authentication, authorization, data encryption
5. **Maintainability** - Clean code, documentation, modular design

---

## System Components

### Frontend Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **React App** | React 19.2.0 | Main UI framework |
| **Router** | React Router v7.13 | Client-side routing |
| **State** | React Context | Global state management |
| **API Client** | Axios | HTTP requests |
| **UI Framework** | Tailwind CSS | Styling |
| **Build Tool** | Vite | Development & production builds |

### Backend Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Express.js 5.2 | API framework |
| **Database** | MongoDB 9.1 | Data persistence |
| **Auth** | JWT + Google OAuth | Authentication |
| **Encryption** | bcrypt | Password hashing |
| **Email** | Nodemailer | Email notifications |
| **File Storage** | Cloudinary | Image/doc storage |
| **Task Scheduling** | node-cron | Scheduled tasks |

### External Services

| Service | Provider | Purpose |
|---------|----------|---------|
| **Cloud Storage** | Cloudinary | Store doctor photos, documents |
| **Email** | Gmail/SMTP | Send notifications |
| **OAuth** | Google | Social login |
| **Payment** | Stripe/Razorpay | Process payments (future) |

---

## Data Models

### Core Entities

#### User (Patient)
```
User {
  id: ObjectId (unique)
  email: String (unique, lowercase)
  password: String (hashed)
  name: String
  phone: String
  profilePicture: String (Cloudinary URL)
  address: {
    street: String
    city: String
    state: String
    zip: String
  }
  preferences: {
    language: String
    notifications: Boolean
  }
  createdAt: Date
  updatedAt: Date
  deletedAt: Date (soft delete)
}
```

#### Doctor
```
Doctor {
  id: ObjectId (unique)
  userId: ObjectId (reference to User)
  email: String (unique)
  password: String (hashed)
  name: String
  phone: String
  specialization: String
  licenseNumber: String
  yearsOfExperience: Number
  bio: String
  profilePicture: String (Cloudinary URL)
  qualifications: [{
    degree: String
    institution: String
    year: Number
  }]
  consultationFee: Number
  availability: [{
    dayOfWeek: Number (0-6)
    startTime: String (HH:MM)
    endTime: String (HH:MM)
  }]
  rating: Number (average)
  totalReviews: Number
  status: String (pending, approved, rejected, active, inactive)
  verifiedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Appointment
```
Appointment {
  id: ObjectId (unique)
  patientId: ObjectId (reference to User)
  doctorId: ObjectId (reference to Doctor)
  appointmentDate: Date
  appointmentTime: String (HH:MM)
  duration: Number (minutes)
  notes: String
  status: String (scheduled, confirmed, completed, cancelled)
  cancellationReason: String
  cancelledBy: String (patient, doctor, system)
  cancelledAt: Date
  confirmedAt: Date
  completedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

#### Admin
```
Admin {
  id: ObjectId (unique)
  email: String (unique)
  password: String (hashed)
  name: String
  role: String (super_admin, admin, moderator)
  permissions: [String]
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date
}
```

---

## API Design

### API Architecture

**Base URL:** `https://api.doctorappointment.com/api`  
**Version:** v1 (in future: v2, v3, etc.)  
**Format:** RESTful JSON

### Authentication Flow

```
CLIENT                          SERVER
  │                               │
  ├──← POST /auth/register ──────→│
  │         (email, password)     │
  │                               │
  │←─── Response + JWT Token ─────┤
  │                               │
  ├──← GET /doctors ──────────────→│ (with token in header)
  │     Authorization: Bearer ...  │
  │                               │
  │←─── Doctors List ─────────────┤
```

### API Endpoints Structure

```
/api/v1/
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── GET /refresh-token
│   ├── POST /forgot-password
│   └── POST /reset-password
├── /users
│   ├── GET / (list, protected)
│   ├── GET /:id (get one, protected)
│   ├── PUT /:id (update, protected)
│   ├── DELETE /:id (delete, protected)
│   └── GET /:id/appointments (user's appointments)
├── /doctors
│   ├── GET / (list, public)
│   ├── GET /:id (detail, public)
│   ├── POST / (register, public)
│   ├── PUT /:id (update, protected - own profile)
│   ├── GET /:id/availability (get slots)
│   ├── POST /:id/availability (set slots, protected)
│   └── DELETE /:id/availability/:slotId
├── /appointments
│   ├── GET / (list, protected)
│   ├── POST / (create, protected)
│   ├── GET /:id (detail, protected)
│   ├── PUT /:id (reschedule, protected)
│   └── DELETE /:id (cancel, protected)
└── /admin
    ├── GET /dashboard (stats)
    ├── GET /doctors/pending (approval list)
    ├── POST /doctors/:id/approve
    ├── POST /doctors/:id/reject
    └── GET /reports (analytics)
```

### Response Format

**Success Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Dr. Smith"
  },
  "message": "Doctor retrieved successfully"
}
```

**Error Response (4xx, 5xx)**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Invalid email format"
  },
  "timestamp": "2026-04-14T10:00:00Z"
}
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── components/
│   ├── common/          - Shared components
│   ├── forms/           - Form components
│   ├── dashboard/       - Dashboard specific
│   ├── appointments/    - Appointment related
│   └── admin/           - Admin specific
├── pages/               - Route pages
├── context/             - Global state (Auth, etc.)
├── hooks/               - Custom hooks
├── api/                 - API client functions
├── utils/               - Helper functions
├── styles/              - Global styles
├── config/              - Configuration
└── App.jsx
```

### State Management Pattern

```
App
├── AuthContext (Global)
│   ├── user
│   ├── token
│   ├── loading
│   └── login/logout methods
│
└── Pages
    ├── HomePage
    │   ├── useSearchDoctors (local)
    │   └── useDoctorList (local)
    │
    └── DoctorDashboard
        ├── useAvailability (local)
        ├── useAppointments (local)
        └── useProfile (local)
```

### Component Communication

```
Parent Component
├── State Management
│   ├── useState (local state)
│   ├── useContext (global state)
│   └── Custom Hooks
│
├── Pass Props Down
│   └── Child Components
│
└── Lift Events Up
    └── Callbacks to Parent
```

---

## Backend Architecture

### Service Layer Pattern

```
Routes (Express)
    ↓
Controllers (Business Logic)
    ↓
Services (Helpers)
    ↓
Models (Database)
    ↓
Database (MongoDB)
```

### Middleware Stack

```
Request
  ↓
┌──────────────────────────────┐
│ 1. CORS Middleware           │ - Allow cross-origin
├──────────────────────────────┤
│ 2. Body Parser               │ - Parse JSON
├──────────────────────────────┤
│ 3. Authentication            │ - Verify JWT
├──────────────────────────────┤
│ 4. Authorization             │ - Check permissions
├──────────────────────────────┤
│ 5. Validation                │ - Validate input
├──────────────────────────────┤
│ 6. Route Handler             │ - Business logic
├──────────────────────────────┤
│ 7. Error Handler             │ - Catch errors
└──────────────────────────────┘
  ↓
Response
```

### Error Handling

```javascript
// Centralized error handling
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Async error wrapper
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Error middleware
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message
    }
  });
});
```

---

## Database Schema

### Collections & Indexes

```
users (collection)
├── Indexes:
│   ├── email (unique)
│   ├── createdAt
│   └── deletedAt (sparse)
│
doctors (collection)
├── Indexes:
│   ├── userId (unique)
│   ├── email (unique)
│   ├── specialization
│   ├── createdAt
│   └── status
│
appointments (collection)
├── Indexes:
│   ├── patientId
│   ├── doctorId
│   ├── appointmentDate
│   └── status
│
admins (collection)
├── Indexes:
│   ├── email (unique)
│   └── createdAt
```

### Aggregation Examples

**Get doctor with appointments count**
```javascript
db.doctors.aggregate([
  { $match: { _id: ObjectId("...") } },
  { $lookup: {
      from: "appointments",
      localField: "_id",
      foreignField: "doctorId",
      as: "appointments"
    }
  },
  { $addFields: {
      totalAppointments: { $size: "$appointments" }
    }
  }
])
```

---

## Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────┐
│       AUTHENTICATION FLOW               │
├─────────────────────────────────────────┤
│ 1. User enters credentials              │
│ 2. Password verified (bcrypt)           │
│ 3. JWT created (expires in 7 days)      │
│ 4. Token sent to client                 │
│ 5. Client stores in localStorage        │
│ 6. Token sent with each request         │
│ 7. Server verifies token                │
│ 8. User data attached to request        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      AUTHORIZATION FLOW                 │
├─────────────────────────────────────────┤
│ 1. Check user role (patient/doctor/admin)
│ 2. Verify user has permission           │
│ 3. Allow/deny access                    │
│ 4. Log authorization decision           │
└─────────────────────────────────────────┘
```

### Data Protection

- **In Transit:** HTTPS/TLS encryption
- **At Rest:** Passwords hashed with bcrypt (salt: 10)
- **Sensitive Data:** Encrypted with AES-256 (if needed)
- **API Keys:** Stored in environment variables

---

## Deployment Architecture

### Deployment Topology

```
┌─────────────────────────────────────────┐
│         CDN (CloudFront)                │
│    - Static files caching               │
│    - Global distribution                │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Load Balancer  │
        │  (AWS ALB)      │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│Instance│  │Instance│  │Instance│
│  #1    │  │  #2    │  │  #3    │
│(Docker)│  │(Docker)│  │(Docker)│
└─────┬──┘  └─────┬──┘  └─────┬──┘
      └──────┬──────┬──────┘
             │      │
        ┌────▼──────▼────┐
        │  MongoDB       │
        │  Cluster       │
        │  (Replicas)    │
        └────────────────┘
```

### CI/CD Pipeline

```
Code Push
    │
    ▼
┌──────────────────┐
│ GitHub Actions   │
├──────────────────┤
│ 1. Run Tests     │
│ 2. Lint Check    │
│ 3. Build         │
│ 4. Build Docker  │
│ 5. Push to ECR   │
└────────┬─────────┘
         │
    ┌────▼─────────────────┐
    │ Staging Deployment   │
    │ - Run migrations    │
    │ - Health checks     │
    └────────┬─────────────┘
             │
         ✓ Approved by QA
             │
    ┌────────▼────────────┐
    │ Production Deploy   │
    │ - Rolling update    │
    │ - Health checks     │
    │ - Monitoring        │
    └────────────────────┘
```

---

## Scalability & Performance

### Horizontal Scaling

```
                    Auto-Scaling Group
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    Instance 1         Instance 2         Instance 3
    - CPU: 20%         - CPU: 45%         - CPU: 30%
    - Mem: 25%         - Mem: 50%         - Mem: 35%
    
    Scaling Rules:
    - Scale up when average CPU > 70%
    - Scale down when average CPU < 30%
    - Min instances: 2, Max instances: 10
```

### Database Performance

**Optimization Strategies:**
- Connection pooling
- Query optimization
- Index optimization
- Aggregation pipeline for complex queries
- Caching layer (Redis) for frequently accessed data

### Caching Strategy

```
Request
    │
    ├─→ Check Redis Cache
    │   ├─→ Cache HIT: Return cached data
    │   │
    │   └─→ Cache MISS: 
    │       ├─→ Query Database
    │       ├─→ Cache result in Redis
    │       └─→ Return data
    │
    └─→ Response
```

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Page Load Time | < 2s | TBD |
| API Response | < 200ms | TBD |
| Database Query | < 100ms | TBD |
| Concurrent Users | 10,000+ | TBD |
| Uptime | 99.9% | TBD |

---

## Disaster Recovery & Backup

### Backup Strategy

```
Primary Database (MongoDB)
         │
    ┌────┴────────┐
    │             │
    ▼             ▼
Daily Snapshot   Hourly Logs
(AWS S3)         (AWS CloudWatch)
    │
    └─→ Retained for 30 days
    └─→ Weekly archives to Glacier
```

### Recovery Procedures

**Recovery Time Objective (RTO):** 1 hour  
**Recovery Point Objective (RPO):** 15 minutes

---

## Monitoring & Logging

### Application Monitoring

```
Application Metrics
├── User metrics
│   ├── Active users
│   ├── New registrations
│   └── Retention rate
├── API metrics
│   ├── Request rate
│   ├── Response time
│   ├── Error rate
│   └── Throughput
└── Infrastructure
    ├── CPU usage
    ├── Memory usage
    ├── Disk space
    └── Network I/O
```

### Alerting

- **P0 (Critical):** System down, data loss - Alert immediately
- **P1 (High):** Performance degradation - Alert within 5 min
- **P2 (Medium):** Errors rising - Alert within 15 min
- **P3 (Low):** Warnings - Daily digest

---

**Architecture Document Version:** 1.0  
**Last Updated:** April 2026  
**Next Review:** July 2026  
**Owner:** Technical Architect
