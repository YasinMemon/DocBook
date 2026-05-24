# DEFINITION OF DONE CHECKLIST

## Overview
The "Definition of Done" (DoD) is a shared understanding of what is required for a work item (user story, task, bug) to be considered complete and ready for release/deployment.

**Applicable to:** All development items  
**Checked by:** Developer (self-check) + Reviewer  
**Last Updated:** April 2026

---

## Categories

### 1. Development & Code Quality

- [ ] **Code Written** - All required functionality implemented
- [ ] **Code Self-Reviewed** - Developer reviewed own code for obvious issues
- [ ] **No Linting Errors** - ESLint reports zero errors
- [ ] **Code Formatted** - Prettier formatting applied
- [ ] **DRY Principle** - No significant code duplication (< 5% allowable)
- [ ] **Comments Added** - Complex logic has explanatory comments
- [ ] **Error Handling** - All error paths handled with user-friendly messages
- [ ] **No Hardcoded Values** - All configuration in environment variables
- [ ] **Follows Standards** - Code adheres to `DEVELOPMENT_STANDARDS.md`

**Assigned By:** Ticket Reviewer  
**Verified By:** Peer Reviewer + QA

---

### 2. Testing

- [ ] **Unit Tests Written** - All new functions have unit tests
- [ ] **Unit Tests Pass** - 100% pass rate locally
- [ ] **Test Coverage** - Minimum 70% code coverage
- [ ] **Integration Tests** - API endpoints tested end-to-end
- [ ] **Edge Cases Tested** - Boundary conditions and error cases covered
- [ ] **Manual Testing Done** - Feature manually tested in staging
- [ ] **Browser Compatibility** - Tested in Chrome, Firefox, Safari
- [ ] **Mobile Tested** - Responsive on mobile devices (if applicable)
- [ ] **Performance Tested** - Load time acceptable (< 2s for pages)
- [ ] **No Test Warnings** - Jest/Vitest reports clean

**Assigned By:** Ticket Reviewer  
**Verified By:** QA Lead

---

### 3. Code Review & Collaboration

- [ ] **Peer Code Review** - Reviewed by at least 2 developers
- [ ] **Review Comments Addressed** - All feedback incorporated or discussed
- [ ] **PR Feedback Resolved** - No outstanding blocking comments
- [ ] **Changes Committed** - All changes committed to branch
- [ ] **Branch Updated** - Rebased on latest develop
- [ ] **No Merge Conflicts** - Ready to merge without conflicts
- [ ] **Merged to Develop** - Code merged or ready for merge

**Assigned By:** Team Lead  
**Verified By:** Repo Owner

---

### 4. Documentation

- [ ] **Function/Method Documented** - JSDoc comments for all functions
- [ ] **Complex Logic Explained** - Non-obvious code has comments
- [ ] **README Updated** - If new feature or setup changes
- [ ] **API Documentation** - Endpoint documented if backend
- [ ] **Parameter Types** - Function signatures document parameter types
- [ ] **Changelog Updated** - Entry added to CHANGELOG.md
- [ ] **User-Facing Docs** - User guide updated if needed
- [ ] **Database Schema** - Schema changes documented

**Assigned By:** Tech Lead  
**Verified By:** Documentation Reviewer

---

### 5. Security & Performance

- [ ] **Input Validation** - All user inputs validated
- [ ] **SQL Injection Protected** - Parameterized queries used (if DB queries)
- [ ] **XSS Prevention** - Output properly escaped
- [ ] **No Secrets Exposed** - No API keys/passwords in code
- [ ] **CORS Configured** - Cross-origin requests properly handled
- [ ] **Rate Limiting** - Applied to sensitive endpoints
- [ ] **Performance Acceptable** - No regression in response times
- [ ] **Database Query Optimized** - No N+1 queries, indexes used
- [ ] **Bundle Size** - No significant increase in bundle size
- [ ] **Memory Leaks** - No memory leaks (checked with DevTools)

**Assigned By:** Security Lead  
**Verified By:** Security Reviewer + Performance Team

---

### 6. Database & Data

- [ ] **Schema Migration** - Database schema changes documented
- [ ] **Data Validation** - Data types and constraints enforced
- [ ] **Backwards Compatible** - Old data still works with changes
- [ ] **No Default Data Loss** - Default values set for new fields
- [ ] **Indexes Added** - Necessary indexes created for performance
- [ ] **Rollback Plan** - Can revert if needed

**Assigned By:** Database Admin  
**Verified By:** DBA or Tech Lead

---

### 7. Deployment & DevOps

- [ ] **Environment Variables** - All required env vars documented
- [ ] **Configuration Updated** - No deployment changes needed
- [ ] **Build Passes** - CI/CD pipeline succeeds
- [ ] **No Build Warnings** - Build process reports clean
- [ ] **Artifacts Generated** - Docker image (if applicable) successfully built
- [ ] **Deployment Tested** - Tested deploy to staging
- [ ] **Rollback Tested** - Can easily rollback if issues
- [ ] **Monitoring Updated** - New metrics added if needed

**Assigned By:** DevOps Lead  
**Verified By:** DevOps Team

---

### 8. Acceptance Criteria

- [ ] **All AC Met** - Every acceptance criterion verified
- [ ] **Functionality Complete** - Feature works as specified
- [ ] **No Workarounds** - Real solution, not temporary fix
- [ ] **Product Owner Approved** - Feature demo'd and approved
- [ ] **Edge Cases Handled** - Unusual scenarios work correctly
- [ ] **User Experience Good** - UI/UX meets design specification

**Assigned By:** Product Owner  
**Verified By:** Product Owner + QA

---

### 9. Quality Assurance

- [ ] **Bug Regression Testing** - Related features still work
- [ ] **Smoke Testing** - Core functionality works
- [ ] **Critical Path Tested** - Main user flows verified
- [ ] **Error Scenarios** - Error states display correctly
- [ ] **Accessibility** - Screen reader compatible (if frontend)
- [ ] **No Critical Bugs** - No P0 or P1 bugs found
- [ ] **No Blocking Issues** - All QA findings resolved
- [ ] **QA Sign-Off** - QA team approves for release

**Assigned By:** QA Lead  
**Verified By:** QA Team

---

### 10. Documentation for Release

- [ ] **Release Notes** - Feature documented in release notes
- [ ] **API Changes** - API documentation updated
- [ ] **Breaking Changes** - Clearly marked if breaking change
- [ ] **Migration Guide** - Instructions provided if data migration needed
- [ ] **Deployment Steps** - Clear deployment procedure documented
- [ ] **Known Limitations** - Any limitations documented

**Assigned By:** Release Manager  
**Verified By:** Tech Lead

---

## Checklist by Story Type

### USER STORY (Feature)

**Minimum Required Sections:**
- [x] Development & Code Quality (All)
- [x] Testing (All)
- [x] Code Review & Collaboration (All)
- [x] Documentation (All except user-facing if not applicable)
- [x] Security & Performance (All)
- [x] Database & Data (If applicable)
- [x] Deployment & DevOps (All)
- [x] Acceptance Criteria (All)
- [x] Quality Assurance (All)
- [x] Documentation for Release (All)

**Estimated Effort:** 100% coverage

---

### BUG FIX

**Minimum Required Sections:**
- [x] Development & Code Quality (Code Written, Reviewed, Linting, Formatting)
- [x] Testing (Unit tests for fix, regression testing)
- [x] Code Review & Collaboration (Peer review required)
- [x] Documentation (Explain fix in comments)
- [x] Security & Performance (Only if applicable)
- [x] Deployment & DevOps (Build passes)
- [x] Quality Assurance (Verify bug fixed, no regression)

**Can Skip:** Documentation for Release (unless critical)

**Estimated Effort:** 70% coverage

---

### TECHNICAL DEBT / REFACTORING

**Minimum Required Sections:**
- [x] Development & Code Quality (All)
- [x] Testing (All - especially regression)
- [x] Code Review & Collaboration (Peer review)
- [x] Documentation (Update if needed)
- [x] Performance (Measure improvement)
- [x] Deployment & DevOps (Build passes)
- [ ] Acceptance Criteria (N/A)
- [x] Quality Assurance (Regression testing)

**Estimated Effort:** 80% coverage

---

### HOTFIX (Critical Production Bug)

**Minimum Required Sections:**
- [x] Development & Code Quality (Code reviewed, passes linting)
- [x] Testing (Quick manual test, unit test for fix)
- [x] Code Review & Collaboration (At least 1 review)
- [x] Deployment & DevOps (Build passes, can deploy)
- [x] Quality Assurance (Verified fixed)

**Can Defer:** Full documentation, comprehensive testing (fix later)

**Estimated Effort:** 50% coverage

---

## Severity/Priority Modifications

### P1 (Critical) - Production Down
- Minimal DoD applies
- Fast-track review
- Deploy to production ASAP
- Backfill documentation after stabilization

### P2 (High) - Major Impact
- 80% of standard DoD
- Can defer some documentation
- Must pass security & performance checks

### P3 (Normal) - Standard Feature
- 100% of standard DoD required
- All checks must pass
- Quality gate strict

### P4 (Low) - Nice to Have
- Can negotiate DoD items
- May defer some testing
- Requires PO approval for deferral

---

## Communication & Sign-Off

### Developer Checklist
```txt
I confirm that this work item meets the Definition of Done:
- [ ] All code quality checks pass
- [ ] Tests are written and passing
- [ ] Code reviewed and approved
- [ ] Documentation complete
- [ ] Ready for QA testing
```

### QA Sign-Off
```txt
QA has verified this work item:
- [ ] Feature works as specified
- [ ] No critical/high bugs
- [ ] Regression testing passed
- [ ] Approved for release
```

### Release Manager
```txt
This work item is approved for release:
- [ ] All checks complete
- [ ] Risk assessment done
- [ ] Deployment ready
- [ ] Release notes complete
```

---

## Tracking & Metrics

### DoD Compliance Tracking

| Item | Sprint 1 | Sprint 2 | Sprint 3 |
|------|----------|----------|----------|
| DoD Items Checked | 95% | 98% | 100% |
| Stories Failing DoD | 1 | 0 | 0 |
| Average Checklist Completion | 94% | 97% | 99% |
| Critical Items Missed | 0 | 0 | 0 |

### Process Improvements

**After each sprint retrospective:**
- Review any DoD violations
- Discuss why items weren't caught
- Update checklist if needed
- Share learnings with team

---

## Tools for Tracking

### GitHub Integration
- Use PR templates with DoD checklist
- Require approvals before merge
- Link commits to issues
- Automated checks in CI/CD pipeline

### Jira/Trello Integration
- Add DoD checklist to story template
- Use custom fields for tracking
- Create sub-tasks for each section
- Report on DoD compliance

### Manual Tracking
- Use this document as reference
- Maintain sprint spreadsheet
- Discuss in standups
- Review in retrospectives

---

## FAQ

**Q: Can we skip items in the DoD?**  
A: Only with explicit approval from Product Owner and Tech Lead, usually for P1 hotfixes. Document waivers.

**Q: Who is responsible for DoD verification?**  
A: Developer performs self-check, reviewer verifies during code review, QA confirms before release.

**Q: How do we handle DoD violations?**  
A: Item moves back to "In Progress", address violations, re-review, then move to "Done".

**Q: Is DoD different for frontend vs backend?**  
A: Core DoD is same, some items (browser testing, performance metrics) specific to component type.

**Q: When should we update the DoD?**  
A: During retrospectives quarterly, or when process changes significantly.

---

## Quick Reference Card

```
BEFORE STARTING:
☐ Task assigned and estimated
☐ Acceptance criteria clear
☐ Dependencies identified

DURING DEVELOPMENT:
☐ Write tests as you code
☐ Follow code standards
☐ Commit regularly
☐ Document complex logic

BEFORE REVIEW:
☐ Self-review code
☐ Run tests locally
☐ Check coverage
☐ Linting passes

AT CODE REVIEW:
☐ At least 2 reviewers
☐ Address feedback
☐ Get approvals

BEFORE QA:
☐ Merge to develop
☐ CI/CD passes
☐ Build artifacts created

AFTER QA APPROVAL:
☐ Update release notes
☐ Final documentation
☐ Ready for deployment
```

---

**Definition of Done Version:** 1.0  
**Last Updated:** April 2026  
**Next Review:** After Sprint 2  
**Owner:** Scrum Master / Tech Lead
