# TESTING STRATEGY & PLAN

## Overview
This document outlines the comprehensive testing strategy for the Doctor Appointment System, including testing types, coverage targets, tools, and procedures.

**Last Updated:** April 2026  
**Applicable to:** All team members  
**Testing Framework:** Jest (Unit/Integration), Playwright (E2E)

---

## Testing Pyramid

The testing approach follows the testing pyramid principle:

```
                /\
               /  \
              / E2E \      5% (Critical user paths)
             /      \
            /────────\
           /          \
          / Integration \  15% (API & component interaction)
         /              \
        /────────────────\
       /                  \
      /      Unit Tests    \ 80% (Functions, components, services)
     /____________________\
```

### Coverage Targets

| Test Type | Coverage | Priority | Tools |
|-----------|----------|----------|-------|
| **Unit** | 80%+ | High | Jest, Vitest |
| **Integration** | 60%+ | High | Jest, Supertest |
| **E2E** | 40% | Medium | Playwright |
| **Performance** | TBD | Medium | Lighthouse |
| **Security** | Critical paths | High | OWASP Tools |
| **Accessibility** | 90%+ | Low | Axe, WAVE |

---

## Unit Testing

### Frontend Unit Tests (React)

**Test Location:** `src/__tests__/` (co-located with components)  
**Pattern:** `ComponentName.test.jsx`

```javascript
describe('DoctorCard', () => {
  const mockDoctor = {
    id: '1',
    name: 'Dr. Smith',
    specialization: 'Cardiology',
    rating: 4.5
  };

  it('should render doctor information', () => {
    render(<DoctorCard doctor={mockDoctor} />);
    
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <DoctorCard doctor={mockDoctor} onClick={handleClick} />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should display rating correctly', () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(screen.getByText('4.5 ⭐')).toBeInTheDocument();
  });
});
```

**React Testing Best Practices:**
- Test user behavior, not implementation
- Use `screen` instead of `render().getByText`
- Mock API calls with `jest.mock()`
- Use `waitFor()` for async operations
- Test accessibility with role queries

### Backend Unit Tests (Node.js)

**Test Location:** `tests/unit/`  
**Pattern:** `userController.test.js`

```javascript
describe('User Controller', () => {
  describe('registerUser', () => {
    it('should register user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Test1234!',
        name: 'Test User'
      };

      User.create = jest.fn().mockResolvedValue({
        _id: '123',
        ...userData
      });

      const result = await registerUser(userData);

      expect(result._id).toBeDefined();
      expect(User.create).toHaveBeenCalledWith(userData);
    });

    it('should throw error for duplicate email', async () => {
      User.findOne = jest.fn().mockResolvedValue({
        email: 'test@example.com'
      });

      await expect(
        registerUser({ email: 'test@example.com', password: 'Test1234!' })
      ).rejects.toThrow('Email already exists');
    });

    it('should hash password before saving', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Test1234!'
      };

      await registerUser(userData);

      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });
});
```

---

## Integration Testing

### API Integration Tests

**Framework:** Jest + Supertest  
**Location:** `tests/integration/`

```javascript
describe('Appointment API', () => {
  describe('POST /api/appointments', () => {
    it('should create appointment with valid data', async () => {
      const appointmentData = {
        patientId: patientUser._id,
        doctorId: doctor._id,
        appointmentDate: new Date('2026-05-15T10:00'),
        notes: 'Regular checkup'
      };

      const response = await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${validToken}`)
        .send(appointmentData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBeDefined();
      
      // Verify in database
      const appointment = await Appointment.findById(response.body.data.id);
      expect(appointment).toBeDefined();
    });

    it('should return 400 with invalid date', async () => {
      const response = await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          patientId: patientUser._id,
          doctorId: doctor._id,
          appointmentDate: 'invalid-date'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should send confirmation email', async () => {
      await request(app)
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${validToken}`)
        .send(validAppointmentData)
        .expect(201);

      expect(emailService.sendConfirmation).toHaveBeenCalled();
    });
  });

  describe('GET /api/appointments', () => {
    it('should return user appointments', async () => {
      const response = await request(app)
        .get('/api/v1/appointments')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should not return appointments after logout', async () => {
      await request(app)
        .get('/api/v1/appointments')
        .expect(401);
    });
  });
});
```

---

## End-to-End (E2E) Testing

### E2E Test Scenarios

**Framework:** Playwright  
**Location:** `tests/e2e/`

#### Scenario 1: Patient Books Appointment

```javascript
test('Patient should book appointment successfully', async ({ page }) => {
  // 1. Login as patient
  await page.goto('http://localhost:3000/login');
  await page.fill('[data-testid="email"]', 'patient@example.com');
  await page.fill('[data-testid="password"]', 'Test1234!');
  await page.click('[data-testid="login-button"]');
  
  // 2. Wait for dashboard
  await page.waitForURL('**/dashboard');
  
  // 3. Search for doctor
  await page.click('[data-testid="search-doctors"]');
  await page.fill('[data-testid="search-input"]', 'Cardiology');
  
  // 4. Select doctor
  const doctorCard = page.locator('[data-testid="doctor-card"]').first();
  await doctorCard.click();
  await page.waitForURL('**/doctors/**');
  
  // 5. Book appointment
  const bookButton = page.locator('[data-testid="book-button"]');
  await bookButton.click();
  
  // 6. Select time slot
  const timeSlot = page.locator('[data-testid="time-slot"]').first();
  await timeSlot.click();
  
  // 7. Confirm booking
  await page.click('[data-testid="confirm-button"]');
  
  // 8. Verify confirmation
  await page.waitForURL('**/appointments/*');
  const confirmationMsg = page.locator('[data-testid="confirmation-message"]');
  await expect(confirmationMsg).toContainText('Appointment booked successfully');
});
```

#### Scenario 2: Doctor Manages Schedule

```javascript
test('Doctor should manage availability schedule', async ({ page }) => {
  // Login as doctor
  await page.goto('http://localhost:3000/doctor/login');
  await page.fill('[data-testid="email"]', 'doctor@example.com');
  await page.fill('[data-testid="password"]', 'Test1234!');
  await page.click('[data-testid="login-button"]');
  
  // Navigate to schedule
  await page.click('[data-testid="schedule-link"]');
  
  // Add availability
  await page.click('[data-testid="add-slot-button"]');
  await page.fill('[data-testid="date-input"]', '2026-05-20');
  await page.fill('[data-testid="start-time"]', '09:00');
  await page.fill('[data-testid="end-time"]', '17:00');
  await page.click('[data-testid="save-button"]');
  
  // Verify slot added
  const slotMessage = page.locator('[data-testid="success-message"]');
  await expect(slotMessage).toContainText('Slot added');
  
  // View appointments
  await page.click('[data-testid="appointments-link"]');
  const appointmentList = page.locator('[data-testid="appointment-item"]');
  await expect(appointmentList).toHaveCount(1);
});
```

---

## Test Data & Fixtures

### Test Database Setup

```javascript
// tests/setup.js
beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

beforeEach(async () => {
  // Clear collections
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Appointment.deleteMany({});
  
  // Seed test data
  await seedTestData();
});

afterAll(async () => {
  await mongoose.disconnect();
});

// tests/fixtures.js - Reusable test data
export const testUsers = {
  patient: {
    email: 'patient@example.com',
    password: 'Test1234!',
    name: 'John Patient'
  },
  doctor: {
    email: 'doctor@example.com',
    password: 'Test1234!',
    name: 'Dr. Jane Smith',
    specialization: 'Cardiology'
  }
};
```

---

## Performance Testing

### Goals
- Page load time < 2 seconds
- API response time < 200ms
- 95th percentile response time < 500ms

### Tools
- **Lighthouse** - Page performance metrics
- **Artillery** - Load testing
- **K6** - Performance benchmarking

### Example Load Test

```yaml
# load-test.yaml
scenarios:
  - name: 'Search Doctors'
    executor: 'ramping-vus'
    stages:
      - duration: '5m'
        target: 100
      - duration: '10m'
        target: 500
      - duration: '5m'
        target: 0
    exec: doctorSearch

functions:
  doctorSearch:
    - get('/api/doctors?specialization=cardiology')
    - check:
        'status is 200': 'r.status === 200'
        'response time < 200ms': 'r.timings.duration < 200'
```

---

## Security Testing

### Security Test Cases

| Test | Description | Tool |
|------|-------------|------|
| **XSS** | Test injection of scripts | OWASP ZAP |
| **SQL Injection** | Test database injection | SQLmap |
| **CORS** | Test cross-origin issues | Manual |
| **Auth** | Test authentication bypass | Manual + Burp |
| **Data Exposure** | Test data leakage | OWASP ZAP |

### Example Security Test

```javascript
describe('Security Tests', () => {
  it('should prevent XSS attacks', async () => {
    const maliciousInput = '<script>alert("XSS")</script>';
    
    const response = await request(app)
      .post('/api/appointments')
      .send({ notes: maliciousInput });
    
    const appointment = await Appointment.findById(response.body.data.id);
    expect(appointment.notes).not.toContain('<script>');
  });

  it('should validate CORS headers', async () => {
    const response = await request(app)
      .get('/api/doctors')
      .set('Origin', 'https://malicious-site.com');
    
    expect(response.get('Access-Control-Allow-Origin')).not.toBe(
      'https://malicious-site.com'
    );
  });
});
```

---

## Accessibility Testing

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Color contrast meets WCAG AA standard
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] ARIA labels used appropriately

### Testing Tool

```javascript
// Axe accessibility testing
describe('Accessibility', () => {
  it('Doctor card should be accessible', async () => {
    const { container } = render(<DoctorCard doctor={mockDoctor} />);
    const results = await axe(container);
    
    expect(results.violations).toHaveLength(0);
  });
});
```

---

## Test Execution Plan

### Daily Testing
```
Morning (9:00 AM):
- Run unit tests
- Check code coverage
- Lint check

Throughout Day:
- Run tests on new code
- Manual testing of changes
- Integration tests before merge

Evening (5:00 PM):
- Full test suite run
- Performance tests
- Security scan
```

### Weekly Testing
```
Monday:
- Smoke testing on staging
- API contract tests
- Database migration tests

Wednesday:
- Performance baseline
- Security scan
- Load testing

Friday:
- Full regression test suite
- E2E test suite
- Release readiness check
```

### Sprint Testing
```
Sprint Day 1: Planning
- Test plan review
- Test case creation

Sprint Days 2-8: Execution
- Continuous testing
- Bug reporting

Sprint Day 9: Regression
- Full test run
- Bug verification

Sprint Day 10: Release
- Final smoke test
- Go/no-go decision
```

---

## Test Metrics & Reporting

### Key Metrics

| Metric | Target | Current |
|--------|--------|---------|
| **Code Coverage** | > 80% | [To be measured] |
| **Test Pass Rate** | > 95% | [To be measured] |
| **Bug Escape Rate** | < 5% | [To be measured] |
| **Test Case Pass Time** | < 30 min | [To be measured] |
| **Critical Bugs Found** | 0 in prod | [To be measured] |

### Monthly Test Report Template

```
TESTING SUMMARY - [Month]

Coverage:
  - Unit: XX%
  - Integration: XX%
  - E2E: XX%
  - Overall: XX%

Test Results:
  - Total Tests: XXX
  - Passed: XXX (XX%)
  - Failed: XX (X%)
  - Skipped: XX (X%)

Issues Found:
  - Critical: X
  - High: XX
  - Medium: XX
  - Low: XXX

Recommendations:
  - [Action item 1]
  - [Action item 2]
```

---

## Bug Tracking & Resolution

### Bug Severity Levels

| Severity | Impact | Fix Time | Example |
|----------|--------|----------|---------|
| **P0** | System down, data loss | < 2 hours | Appointments not saving |
| **P1** | Feature broken, user blocked | < 4 hours | Login failure |
| **P2** | Feature degraded | < 24 hours | Slow search |
| **P3** | Minor issue, workaround exists | < 1 week | UI misalignment |
| **P4** | Documentation/cosmetic | No deadline | Typo |

### Bug Report Template

```markdown
## [Title]

**Severity:** P1 (Critical)

### Description
Clear description of the bug

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Environment
- Browser: Chrome 123
- OS: Windows 10
- Tested on: Staging

### Attachments
- Screenshots
- Console logs
- Network tab
```

---

## Continuous Integration Testing

### GitHub Actions Pipeline

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        run: npm run coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Performance check
        run: npm run test:performance
```

---

## Testing Checklist by Feature

### For Every New Feature
- [ ] Unit tests written (80%+ coverage)
- [ ] Integration tests written
- [ ] E2E test scenario created
- [ ] Edge cases tested
- [ ] Error handling tested
- [ ] Performance tested
- [ ] Security tested
- [ ] Accessibility tested
- [ ] Manual testing done
- [ ] Regression tests run

---

**Test Strategy Version:** 1.0  
**Last Updated:** April 2026  
**Next Review:** July 2026  
**Owner:** QA Lead
