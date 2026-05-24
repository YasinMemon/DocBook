# DEVELOPMENT STANDARDS & GUIDELINES

## Overview
This document establishes coding standards, best practices, and conventions for the Doctor Appointment System project. All developers must follow these guidelines to ensure code quality, maintainability, and consistency.

**Last Updated:** April 2026  
**Applicable to:** All team members  
**Review Frequency:** Every quarter

---

## Table of Contents

1. [Code Quality Standards](#code-quality-standards)
2. [JavaScript/React Standards](#javascriptreact-standards)
3. [Backend/Node.js Standards](#backendnodejs-standards)
4. [Git & Version Control](#git--version-control)
5. [Code Review Process](#code-review-process)
6. [Testing Standards](#testing-standards)
7. [Documentation Standards](#documentation-standards)
8. [Performance Requirements](#performance-requirements)
9. [Security Standards](#security-standards)
10. [Tools & Configuration](#tools--configuration)

---

## Code Quality Standards

### General Principles

1. **Readability** - Code should be self-documenting and easy to understand
2. **Consistency** - Follow established patterns in codebase
3. **DRY** - Don't Repeat Yourself (avoid code duplication)
4. **SOLID** - Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
5. **Testing** - Write tests for all new functionality

### Linting & Formatting

- **Linter:** ESLint (configured in `eslint.config.js`)
- **Formatter:** Prettier (on save)
- **Max Line Length:** 100 characters (soft), 120 characters (hard)
- **Indentation:** 2 spaces (never tabs)
- **Semicolons:** Required at end of statements

### Code Metrics

| Metric | Target | Tool |
|--------|--------|------|
| **Code Coverage** | > 70% | Jest/Vitest |
| **Cyclomatic Complexity** | < 10 per function | ESLint |
| **Duplicate Code** | < 5% | SonarQube |
| **Maintainability Index** | > 70 | Code Climate |

---

## JavaScript/React Standards

### File Structure & Naming

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   ├── forms/
│   │   ├── LoginForm.jsx
│   │   └── RegistrationForm.jsx
│   ├── dashboard/
│   │   └── [component-name].jsx
│   └── index.js (re-exports all components)
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── index.js
├── context/
│   ├── AuthContext.jsx
│   └── index.js
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   └── index.js
├── utils/
│   ├── helpers.js
│   ├── validators.js
│   └── constants.js
├── api/
│   ├── auth.js
│   ├── doctors.js
│   └── index.js
├── styles/
│   ├── App.css
│   └── index.css
└── App.jsx
```

**Naming Conventions:**
- Components: PascalCase (e.g., `UserProfile.jsx`)
- Functions/Variables: camelCase (e.g., `getUserData()`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- CSS Classes: kebab-case (e.g., `.user-profile`)

### React Best Practices

#### Component Organization

```javascript
// ❌ BAD - Mixed concerns
function UserCard({ user }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(`/api/user/${user.id}`)
      .then(r => r.json())
      .then(setData);
  }, []);
  
  return <div>{data && <h1>{data.name}</h1>}</div>;
}

// ✅ GOOD - Separated concerns
function UserCard({ user }) {
  const userData = useUserData(user.id);
  
  if (!userData) return <Loader />;
  
  return <UserCardContent user={userData} />;
}

function UserCardContent({ user }) {
  return <h1>{user.name}</h1>;
}
```

#### Hooks Usage

```javascript
// ✅ Good Hook Practices

// Custom Hook
function useFetchUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    api.getUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);
  
  return { user, loading, error };
}

// Using Hook
function UserProfile({ userId }) {
  const { user, loading, error } = useFetchUser(userId);
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  return <UserCard user={user} />;
}
```

#### Props Handling

```javascript
// ✅ Prefer Destructuring
function Button({ label, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// ✅ Prop Validation with JSDoc
/**
 * Displays a doctor card
 * @param {Object} props
 * @param {string} props.id - Doctor unique ID
 * @param {string} props.name - Doctor full name
 * @param {string} props.specialization - Medical specialization
 * @param {number} props.rating - Rating 1-5
 * @returns {React.ReactElement}
 */
function DoctorCard({ id, name, specialization, rating }) {
  // ...
}
```

#### Event Handling

```javascript
// ❌ BAD - Inline function creates new function each render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD - Use useCallback for dependencies
const handleClick = useCallback((id) => {
  // handle click
}, []);

<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD - Simple handlers without dependencies
<input onChange={(e) => setEmail(e.target.value)} />
```

### State Management

```javascript
// ✅ Use Context API for global state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);
  
  const value = { user, setUser, loading };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Use localStorage for persistence
useEffect(() => {
  localStorage.setItem('user', JSON.stringify(user));
}, [user]);
```

### Error Handling

```javascript
// ✅ Proper error handling in components
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    api.getUser(userId)
      .then(setUser)
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user profile');
      });
  }, [userId]);
  
  if (error) {
    return <div className="error-banner">{error}</div>;
  }
  
  if (!user) return <Loader />;
  
  return <UserCard user={user} />;
}
```

---

## Backend/Node.js Standards

### File Structure & Naming

```
src/
├── config/
│   ├── db.js (Database connection)
│   ├── env.js (Environment variables)
│   └── constants.js
├── controllers/
│   ├── userController.js
│   ├── authController.js
│   └── doctorController.js
├── models/
│   ├── User.js
│   ├── Doctor.js
│   └── Appointment.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── index.js (Main routes)
├── middleware/
│   ├── auth.js (Authentication)
│   ├── validation.js
│   ├── errorHandler.js
│   └── cors.js
├── utils/
│   ├── validators.js
│   ├── emailTemplates.js
│   └── logger.js
├── services/
│   ├── emailService.js
│   ├── authService.js
│   └── uploadService.js
└── index.js (Main app)
```

### Express Application Structure

```javascript
// ✅ GOOD - Modular app structure
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { validateInput } from './middleware/validation.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(validateInput);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
```

### Controller Pattern

```javascript
// ✅ GOOD - Controller with proper error handling
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Business logic
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Database Patterns

```javascript
// ✅ GOOD - Mongoose Schema with validation
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
```

### Async/Await Usage

```javascript
// ✅ GOOD - Proper async/await with error handling
async function getUserWithAppointments(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    const appointments = await Appointment.find({ userId });
    
    return { user, appointments };
  } catch (error) {
    logger.error(`Failed to fetch user ${userId}:`, error);
    throw error;
  }
}

// ✅ GOOD - Handling multiple async operations
async function createAppointment(appointmentData) {
  try {
    const [doctor, patient] = await Promise.all([
      Doctor.findById(appointmentData.doctorId),
      User.findById(appointmentData.patientId)
    ]);
    
    if (!doctor || !patient) {
      throw new Error('Doctor or patient not found');
    }
    
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    
    // Send emails in parallel
    await Promise.all([
      emailService.sendConfirmation(patient.email, appointment),
      emailService.sendReminder(doctor.email, appointment)
    ]);
    
    return appointment;
  } catch (error) {
    logger.error('Appointment creation failed:', error);
    throw error;
  }
}
```

---

## Git & Version Control

### Branch Naming Convention

```
main                 - Production ready code
├── develop          - Development branch
│   ├── feature/     - New features
│   ├── bugfix/      - Bug fixes
│   ├── hotfix/      - Critical production fixes
│   └── refactor/    - Code refactoring
```

**Branch Naming Format:**
- Feature: `feature/short-description` (e.g., `feature/doctor-search`)
- Bugfix: `bugfix/issue-number-description` (e.g., `bugfix/123-fix-booking-bug`)
- Hotfix: `hotfix/critical-description` (e.g., `hotfix/payment-timeout`)
- Refactor: `refactor/what-changed` (e.g., `refactor/extract-utils`)

### Commit Message Standards

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Build/dependency updates

**Examples:**

```
✅ GOOD commits:
feat(auth): add Google OAuth login
fix(appointments): correct timezone handling in booking
docs(api): update endpoint documentation
refactor(components): extract common button logic
perf(database): add indexes for user queries
test(auth): add login validation tests

❌ BAD commits:
fixed bug
updated code
work in progress
random changes
```

### Pull Request Process

1. **Create Branch** from `develop`
2. **Make Changes** following standards
3. **Commit** with proper messages
4. **Push** to remote
5. **Create PR** with descriptive title
6. **Describe Changes** in PR body
7. **Request Review** from at least 2 developers
8. **Resolve Comments** if any
9. **Merge** after approval

**PR Template:**
```markdown
## Description
Brief description of what this PR does

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Done
Describe tests performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
```

---

## Code Review Process

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Logic is clear and correct
- [ ] Error handling is present
- [ ] Tests are adequate
- [ ] Performance impact assessed
- [ ] Security implications checked
- [ ] Documentation is updated
- [ ] No hardcoded values/secrets

### Reviewer Responsibilities

1. **Read PR description** thoroughly
2. **Understand context** and related issues
3. **Review code changes** carefully
4. **Run code locally** to test
5. **Check test coverage** and quality
6. **Provide constructive feedback**
7. **Approve when satisfied**
8. **Help resolve questions** raised

### Author Responsibilities

1. **Small PRs** (< 400 lines) for faster review
2. **Meaningful PR titles and descriptions**
3. **Self-review before submitting**
4. **Respond timely to feedback**
5. **Don't merge without approvals**
6. **Update branches when out of sync**

---

## Testing Standards

### Testing Pyramid

```
         /\
        /  \  E2E Tests (5%)
       /────\
      /      \
     /  ────  \  Integration Tests (15%)
    /  /    \  \
   /  /  ──  \  \  Unit Tests (80%)
  /__/______\__\
```

### Unit Testing

**Framework:** Jest/Vitest

```javascript
// ✅ GOOD - Well-organized tests
describe('validateEmail', () => {
  it('should validate correct email format', () => {
    const result = validateEmail('user@example.com');
    expect(result).toBe(true);
  });
  
  it('should reject invalid email format', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('invalid@')).toBe(false);
  });
  
  it('should handle empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### Integration Testing

```javascript
describe('User Authentication Flow', () => {
  it('should register and login user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Test1234!',
      name: 'Test User'
    };
    
    // Register
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);
    
    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);
    
    expect(loginRes.body).toHaveProperty('token');
  });
});
```

### Test Coverage Requirements

| Component Type | Coverage | Priority |
|---|---|---|
| Utilities | 90%+ | High |
| Services | 85%+ | High |
| Controllers | 80%+ | Medium |
| Components | 70%+ | Medium |
| Pages | 60%+ | Low |

---

## Documentation Standards

### Code Comments

```javascript
// ✅ GOOD - Clear, meaningful comments
// Check if user has permission to book appointment
if (!user.canBookAppointment) {
  throw new Error('User cannot book appointments');
}

// Use Cloudinary to optimize images for different devices
const optimizedUrl = cloudinary.url(imageId, {
  responsive: true,
  quality: 'auto'
});

// ❌ BAD - Obvious or unhelpful comments
// Increment i
i++;

// Check if x equals 1
if (x === 1) {
```

### Function Documentation

```javascript
/**
 * Books an appointment for a patient with a doctor
 * 
 * @async
 * @param {Object} params - Booking parameters
 * @param {string} params.patientId - Patient MongoDB ID
 * @param {string} params.doctorId - Doctor MongoDB ID
 * @param {Date} params.appointmentDate - Appointment date/time
 * @param {string} params.notes - Optional patient notes
 * 
 * @returns {Promise<Object>} Appointment object with ID
 * 
 * @throws {Error} If doctor not available or patient not eligible
 * 
 * @example
 * const appointment = await bookAppointment({
 *   patientId: '123',
 *   doctorId: '456',
 *   appointmentDate: new Date('2026-05-15T10:00'),
 *   notes: 'Follow-up visit'
 * });
 */
export async function bookAppointment({ patientId, doctorId, appointmentDate, notes }) {
  // implementation...
}
```

---

## Performance Requirements

### Frontend Performance

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.8s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Speedindex | < 3.4s | Lighthouse |
| Interactive (TTI) | < 3.8s | Lighthouse |
| Bundle Size | < 250KB | Webpack |

### Backend Performance

| Metric | Target | Tool |
|--------|--------|------|
| API Response Time | < 200ms | New Relic |
| Database Query Time | < 100ms | MongoDB Profiling |
| Memory Usage | < 300MB | Node Monitor |
| CPU Usage | < 60% | System Monitor |
| Concurrent Connections | > 1000 | Load Testing |

### Optimization Guidelines

```javascript
// ✅ GOOD - Lazy load images
import { lazy } from 'react';
const DoctorList = lazy(() => import('./DoctorList'));

// ✅ GOOD - Code splitting
const DoctorSearch = React.lazy(() => import('./DoctorSearch'));

<Suspense fallback={<Loader />}>
  <DoctorSearch />
</Suspense>

// ✅ GOOD - Memoization for expensive components
const DoctorCard = React.memo(({ doctor }) => {
  return <div>{doctor.name}</div>;
});

// ✅ GOOD - Debounce search input
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useCallback(
  debounce((term) => {
    api.searchDoctors(term);
  }, 300),
  []
);
```

---

## Security Standards

### Input Validation

```javascript
// ✅ GOOD - Validate all inputs
function validateUserInput(data) {
  const { email, password, name } = data;
  
  if (!email || !password || !name) {
    throw new Error('Missing required fields');
  }
  
  if (typeof email !== 'string' || email.length > 255) {
    throw new Error('Invalid email');
  }
  
  if (password.length < 8) {
    throw new Error('Password too short');
  }
  
  return true;
}
```

### API Security

```javascript
// ✅ GOOD - Implement API security
app.use(helmet()); // Headers
app.use(cors()); // CORS
app.use(rateLimit({ // Rate limiting
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// ✅ GOOD - Protect sensitive routes
app.use('/api/admin', authenticate, authorize('admin'));
```

### Environment Variables

```javascript
// ✅ GOOD - Never commit secrets
// .env (add to .gitignore)
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
API_KEY=your-api-key

// ❌ BAD - Hardcoded secrets
const mongoUri = 'mongodb://user:pass@...';
const jwtSecret = 'hardcoded-secret';
```

---

## Tools & Configuration

### Required Dependencies

**Frontend:**
```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "axios": "^1.13.6",
  "tailwindcss": "^4.1.18"
}
```

**Backend:**
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.5",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.3"
}
```

### VSCode Extensions (Recommended)

- ESLint
- Prettier
- REST Client
- Thunder Client
- MongoDB for VS Code
- ES7+ React/Redux/React-Native snippets

### Global Commands

```bash
# Linting
npm run lint           # Check for errors
npm run lint:fix       # Auto-fix errors

# Tests
npm run test           # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report

# Build
npm run build          # Production build
npm run preview        # Test production build

# Development
npm run dev            # Start dev server
npm run dev:backend    # Start backend server
```

---

## Common Pitfalls to Avoid

| ❌ Don't | ✅ Do Instead |
|---------|---|
| Commit `node_modules` | Use `.gitignore` |
| Use `var` | Use `const`/`let` |
| Ignore errors | Use try-catch |
| Hardcode URLs | Use environment variables |
| Write huge functions | Keep functions < 30 lines |
| Skip testing | Test critical paths |
| Push to main | Use develop/feature branches |
| Console.log in production | Use proper logger |

---

## Escalation & Exceptions

**When can these standards be deviated?**
1. Security vulnerability requires immediate action
2. Critical bug threatens system availability
3. Performance impact requires breaking change
4. Explicit approval from Team Lead

**Process:**
1. Document the deviation with reason
2. Get approval from Team Lead
3. Create task to fix properly
4. Plan for remediation

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Next Review:** July 2026  
**Maintained by:** Development Lead
