# SPRINT PLANNING & TRACKING TEMPLATE

## Sprint Information

| Property | Value |
|----------|-------|
| **Sprint Number** | Sprint 001 |
| **Sprint Goal** | Establish core authentication and doctor browsing functionality |
| **Duration** | 2 weeks (10 working days) |
| **Start Date** | Monday, April 14, 2026 |
| **End Date** | Friday, April 25, 2026 |
| **Team Capacity** | 40 story points (4 developers × 10 points/person) |
| **Sprint Status** | 📋 Planning |

---

## Sprint Goal

Clear, achievable goal for the sprint:
> "Deliver core authentication system and basic doctor discovery features while ensuring code quality and security standards."

### Success Criteria
- [ ] All committed stories marked "Done"
- [ ] No critical bugs in production
- [ ] Code coverage > 70%
- [ ] Performance benchmarks met (page load < 2s)
- [ ] Team velocity documented

---

## Sprint Backlog

### IN BACKLOG (Items selected for this sprint)

| ID | Title | Owner | SP | Status | Notes |
|----|----- |-------|----|----- |-------|
| US-001 | User Registration | Dev A | 5 | ▶️ In Progress | Google OAuth done, email validation pending |
| US-002 | Patient Login | Dev A | 3 | ▶️ In Progress | JWT implementation in progress |
| US-003 | Admin Authentication | Dev B | 3 | 📌 Ready | Depends on User Registration |
| US-005 | Doctor Directory | Dev B | 5 | 📌 Ready | Design approved, ready for dev |
| US-008 | Specialization Filters | Dev C | 3 | 📌 Ready | UI components available |
| US-007 | Doctor Detail Page | Dev C | 5 | 📌 Ready | Awaiting API endpoint |
| US-013 | Email Notifications - Confirmation | Dev D | 3 | 📌 Ready | Template designed |
| US-019 | Data Validation & Sanitization | Dev D | 5 | ▶️ In Progress | XSS testing in progress |
| US-028 | Favorites/Bookmarking | Dev A | 2 | 📌 Ready | Low priority, can defer if needed |
| US-041 | Upgrade Dependencies | Dev B | 5 | 📌 Ready | Security patches needed |

**Total Story Points:** 39/40 (Buffer: 1)

---

## Sprint Tasks by Developer

### Developer A (Frontend Lead)
- US-001: User Registration (5 SP) - **IN PROGRESS**
- US-002: Patient Login (3 SP) - **IN PROGRESS**
- US-028: Favorites/Bookmarking (2 SP) - **READY**

**Assigned Points:** 10/10

### Developer B (Backend Lead)
- US-003: Admin Authentication (3 SP) - **READY**
- US-005: Doctor Directory (5 SP) - **READY**
- US-041: Upgrade Dependencies (5 SP) - **READY**

**Assigned Points:** 13/13

### Developer C (Full Stack)
- US-008: Specialization Filters (3 SP) - **READY**
- US-007: Doctor Detail Page (5 SP) - **READY**

**Assigned Points:** 8/8

### Developer D (Security & QA)
- US-013: Email Notifications (3 SP) - **READY**
- US-019: Data Validation & Sanitization (5 SP) - **IN PROGRESS**

**Assigned Points:** 8/8

---

## Sprint Dependencies & Blockers

### Dependencies
- US-007 (Doctor Detail Page) depends on API endpoints from US-005
- US-028 (Favorites) depends on User Authentication completion

### Current Blockers
| Blocker | Impact | Owner | Status |
|---------|--------|-------|--------|
| Database schema not finalized | US-005, US-007 | Lead Dev | ✅ Resolved |
| Cloudinary credentials missing | US-007 (images) | DevOps | ⏳ In Progress |
| Email template approval | US-013 | Product | ✅ Approved |

---

## Sprint Daily Status

### Monday, April 14, 2026
**Attendees:** Dev A, B, C, D, Scrum Master, PO
**Meeting Time:** 09:00 AM

| Developer | Yesterday | Today | Blocker |
|-----------|-----------|-------|---------|
| Dev A | Setup complete, starting US-001 | Continue US-001 registration form | None |
| Dev B | Environment setup | Start US-003 admin routes | None |
| Dev C | Review design specs | Wait for US-005 API | Needs API endpoint |
| Dev D | Security review completed | Start form validation | None |

**Decisions:** 
- Prioritize US-005 API to unblock Dev C
- Schedule Cloudinary setup call

### Tuesday, April 15, 2026
**Attendees:** Dev A, B, C, D, Scrum Master

| Developer | Yesterday | Today | Blocker |
|-----------|-----------|-------|---------|
| Dev A | US-001 form created | Testing email validation | None |
| Dev B | US-003 routes 50% done | Continue US-003 | None |
| Dev C | Waiting on API | Still waiting | Needs API endpoint |
| Dev D | Form validation 70% | Finish validation logic | None |

**Action Items:**
- [ ] Dev B: Accelerate US-005 API endpoints

### Wednesday, April 16, 2026
**Attendees:** Dev A, B, C, D, Scrum Master

| Developer | Yesterday | Today | Blocker |
|-----------|-----------|-------|---------|
| Dev A | US-001 email validation done | Merge to dev, code review | None |
| Dev B | US-003 merged to dev | Start US-005 endpoints | None |
| Dev C | Got US-005 endpoints | US-007 50% complete | None |
| Dev D | Validation complete | Start integration testing | None |

### Thursday, April 17, 2026

### Friday, April 18, 2026

---

## Sprint Burndown Chart

```
Story Points Remaining (Target: Linear Decrease to 0)

40 |
   | ●
35 | ●  ●
   |    ●
30 |       ●
   |           ●
25 |               ●
   |
20 |
   |
15 |
   |
10 |
   |
5  |
   |
0  |
   └─────────────────────────────────── Days
     0  1  2  3  4  5  6  7  8  9  10
     
Legend:
●  = Actual Progress
─  = Ideal Progress (if linear)
```

**Current Status (Day 3):** 37 SP complete, 3 SP remaining = **92.5% on track**

---

## Definition of Done Checklist

For each item to be marked "Done":

- [ ] Code written and self-reviewed
- [ ] At least 70% code coverage
- [ ] Peer code review completed
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Tested on staging environment
- [ ] No critical/high bugs
- [ ] Acceptance criteria verified
- [ ] Merged to develop branch
- [ ] Changelog updated

---

## Sprint Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| **Velocity** | 40 SP | TBD | ⏳ |
| **Burn Rate** | ~4 SP/day | 3.7 SP/day | 📈 |
| **Bugs Found** | < 5 | 2 | ✅ |
| **Code Coverage** | > 70% | TBD | ⏳ |
| **Sprint Completion** | 100% | TBD | ⏳ |
| **Story Estimates Accuracy** | ±20% | TBD | ⏳ |

---

## Test Plan for Sprint

### Test Coverage by User Story

#### US-001: User Registration
- [ ] Valid registration with all fields
- [ ] Invalid email format rejection
- [ ] Password validation (min 8 chars, uppercase, number)
- [ ] Password confirmation mismatch
- [ ] Duplicate email handling
- [ ] Email verification link works
- [ ] User data saved correctly

**Test Cases:** 7  
**Status:** 📋 To be executed

#### US-002: Patient Login
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Login with non-existent email
- [ ] JWT token generation
- [ ] Token expiration
- [ ] Session persistence
- [ ] Google OAuth callback

**Test Cases:** 7  
**Status:** 📋 To be executed

#### US-019: Data Validation
- [ ] XSS payload rejection
- [ ] SQL injection prevention
- [ ] CORS headers validated
- [ ] Input length limits enforced

**Test Cases:** 4  
**Status:** 📋 To be executed

---

## Sprint Review Preparation

### Demo Schedule
**Date:** Friday, April 25, 2026, 4:00 PM  
**Duration:** 30 minutes  
**Attendees:** Team, Product Owner, Stakeholders

### Items to Demo
1. User Registration completed
2. Patient Login with Google OAuth
3. Doctor Directory browsing
4. Specialization Filters
5. Doctor Detail Page
6. Email notification sent

### Acceptance Criteria Verification
- [ ] All working features meet AC
- [ ] No show-stopping bugs
- [ ] Performance acceptable
- [ ] UI/UX meets design spec

---

## Sprint Retrospective

**Date:** Friday, April 25, 2026, 4:30 PM  
**Duration:** 30 minutes  
**Facilitator:** Scrum Master

### What Went Well?
- [To be filled after sprint]

### What Didn't Go Well?
- [To be filled after sprint]

### Action Items for Next Sprint
- [To be filled after sprint]

---

## Notes & Decisions

### Key Decisions Made
1. **Defer US-028 (Favorites)** - If sprint becomes overloaded, move to Sprint 2
2. **Prioritize US-005** - Unblocks multiple dependent items
3. **Security Focus** - Extra scrutiny on US-019 (Validation)

### Technical Decisions
- Use bcrypt for password hashing (10 salt rounds)
- JWT expiration: 7 days
- Email service: Nodemailer
- Error handling: Consistent API error format

### Communication
- Daily standups at 9:00 AM sharp
- Slack for quick questions
- GitHub for code discussions
- Weekly sync meeting: Thursdays 2:00 PM

---

## Sprint Resources

### Required before Sprint Start
- [x] Database schema approved
- [x] API design documented
- [ ] Design mockups finalized
- [ ] Test environment set up

### Tools & Access
- GitHub: [repository-link]
- Jira/Trello: [board-link]
- Staging Server: [server-link]
- Postman Collection: [link]

---

## Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Scrum Master | [Name] | _____ | April 14 |
| Product Owner | [Name] | _____ | April 14 |
| Team Lead | [Name] | _____ | April 14 |

---

**Created:** April 14, 2026  
**Last Updated:** April 18, 2026  
**Next Sprint:** Sprint 002 (Starts April 28, 2026)

---

## How to Use This Template

1. **Copy this file** to create sprint docs: `SPRINT_001.md`, `SPRINT_002.md`, etc.
2. **Update Sprint Information** at the top for each sprint
3. **Keep Current Sprint** information in `SPRINT_ACTIVE.md`
4. **Archive completed** sprints in `SPRINT_HISTORY/`
5. **Reference** burndown chart and metrics throughout sprint
6. **Update daily status** during standups
7. **Complete retrospective** before sprint ends
