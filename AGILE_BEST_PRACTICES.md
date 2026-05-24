# AGILE BEST PRACTICES & GUIDELINES

## Overview
This document outlines tried and tested agile best practices for the Doctor Appointment System project. These practices help maintain velocity, quality, and team morale.

**Last Updated:** April 2026  
**Version:** 1.0  
**Applicable to:** All team members

---

## Table of Contents

1. [Sprint Execution](#sprint-execution)
2. [Backlog Management](#backlog-management)
3. [Code Collaboration](#code-collaboration)
4. [Quality Assurance](#quality-assurance)
5. [Communication](#communication)
6. [Problem Solving](#problem-solving)
7. [Continuous Improvement](#continuous-improvement)
8. [Team Health](#team-health)

---

## Sprint Execution

### Sprint Planning Best Practices

**✅ DO:**

1. **Plan Thoroughly**
   - Spend adequate time (1-2 hours) on planning
   - Discuss acceptance criteria for each item
   - Identify dependencies upfront
   - Break down large items (if > 8 points)

2. **Realistic Estimation**
   - Use historical velocity as guide
   - Account for meetings and maintenance
   - Include buffer (20-30%) for surprises
   - Consider team capacity

3. **Clear Sprint Goal**
   - Write a single, specific goal
   - Ensure team alignment
   - Share with stakeholders
   - Revisit at retrospective

4. **Capacity Planning**
   - Account for known time off
   - Include time for support/maintenance
   - Factor in onboarding if new members
   - Reserve 10-15% for emergencies

**❌ DON'T:**

- Over-commit without buffer
- Plan more than team can reasonably do
- Ignore team's previous velocity
- Forget about existing commitments

### Daily Standup Best Practices

**✅ DO:**

1. **Start on Time**
   - Keeps everyone accountable
   - Respects everyone's schedule
   - Builds discipline

2. **Stick to 15 Minutes**
   ```
   Person 1: 3-5 minutes
   Person 2: 3-5 minutes
   Person 3: 3-5 minutes
   Person 4: 3-5 minutes
   ```

3. **Focus on Three Questions**
   - What did I complete yesterday?
   - What will I work on today?
   - What blockers do I have?

4. **Highlight Blockers**
   - Identify problems immediately
   - Assign resolution owner
   - Follow up same day

**❌ DON'T:**

- Go into technical details (save for later)
- Discuss in-depth debugging
- Ignore team members who don't show up
- Use standup for status reporting only

### Sprint Progress Tracking

**✅ DO:**

1. **Update Daily**
   - Move cards in Kanban board
   - Update story status
   - Keep burndown chart current

2. **Track Metrics**
   - Story points completed
   - Velocity trend
   - Bug count
   - Items stuck (> 2 days)

3. **Address Risks Early**
   - Identify at-risk items by day 3
   - Rebalance if needed
   - Get help immediately
   - Don't wait until end of sprint

**❌ DON'T:**

- Ignore status updates
- Pretend everything's fine when it's not
- Wait until Friday to update progress
- Forget about low-priority items

---

## Backlog Management

### Backlog Grooming Best Practices

**✅ DO:**

1. **Regular Grooming (Weekly)**
   - Review top 20 items
   - Add acceptance criteria
   - Estimate if not done
   - Identify dependencies

2. **Prioritization**
   - Based on business value
   - Consider dependencies
   - Balance features with tech debt
   - Get stakeholder input

3. **Clear Acceptance Criteria**
   ```
   ✅ GOOD:
   - User can register with email
   - Email verification link sent within 30s
   - Invalid emails rejected
   - Duplicate emails show error
   
   ❌ BAD:
   - User registration works
   - Make it secure
   - Test it properly
   ```

4. **Break Down Large Items**
   - Split items > 13 points
   - Max story size: 13 points (for one sprint)
   - Smaller items = better planning

**❌ DON'T:**

- Keep backlog >100 items (too hard to maintain)
- Leave incomplete acceptance criteria
- Keep items >13 points
- Prioritize without stakeholder input

### Backlog Refinement Process

**Before Sprint Planning:**

```
Tuesday: Backlog Grooming Session
├── Review top 20 items
├── Add/refine acceptance criteria
├── Update estimates
├── Identify blockers
└── Prepare for planning

Monday: Sprint Planning
├── PO presents prioritized items
├── Team estimates items
├── Discuss acceptance criteria
├── Commit to sprint goal
└── Assign initial owners
```

---

## Code Collaboration

### Branching Strategy (Git Flow)

```
main (v1.0.0 in prod)
  │
  ├─ develop (integration branch)
  │    │
  │    ├─ feature/user-registration
  │    ├─ feature/doctor-search
  │    ├─ bugfix/email-validation
  │    ├─ hotfix/critical-bug
  │    └─ refactor/extract-components
```

**Best Practices:**

1. **Branch Names**
   - Use hyphens (not underscores): `feature/user-auth`
   - Be descriptive: `feature/social-auth` not `feature/auth2`
   - Include issue number: `feature/123-google-oauth`

2. **Branch Lifecycle**
   - Create from `develop`
   - Keep branch lifespan short (< 1 week)
   - Delete after merge
   - Never work on stale branches

3. **Merge Strategy**
   - Require at least 2 approvals
   - Resolve conflicts locally first
   - Squash commits for cleanliness (optional)
   - Delete branch after merge

### Code Review Best Practices

**For Reviewers:**

✅ DO:
- Review within 4 hours of PR opening
- Check logic and edge cases
- Verify tests are present
- Look for performance issues
- Suggest, don't demand changes
- Be respectful and constructive

❌ DON'T:
- Review while tired/rushed
- Leave incomplete reviews
- Nitpick style (use linting)
- Approve without reading code
- Ask for rewrites without explanation

**For Authors:**

✅ DO:
- Keep PRs small (< 400 lines)
- Write clear PR descriptions
- Self-review before requesting review
- Respond promptly to feedback
- Ask questions if unclear

❌ DON'T:
- Open huge PRs (> 1000 lines)
- Leave PR comments blank
- Ignore reviewer feedback
- Merge without approval
- Fix unrelated issues in same PR

### Commit Message Standards

```
✅ GOOD:
feat(auth): add Google OAuth login

Add Google OAuth 2.0 authentication to allow users
to sign in with their Google accounts. Implements
OAuth flow and JWT token generation.

Closes #123

❌ BAD:
fixed auth
update code
work in progress
random changes
```

---

## Quality Assurance

### Testing Before Merge

**Before Requesting Review:**

- [ ] Tests written (unit + integration)
- [ ] Tests passing locally
- [ ] Coverage > 70%
- [ ] Manual testing done
- [ ] No console errors
- [ ] No hardcoded values

**Review Checklist:**

- [ ] Code follows standards
- [ ] Logic is sound
- [ ] Error handling present
- [ ] Tests are adequate
- [ ] Documentation updated
- [ ] Performance acceptable

### Bug Prevention

**✅ Write Better Code:**
- Validate inputs early
- Use type checking (JSDoc/TypeScript)
- Handle edge cases
- Avoid nested conditions (max 2 levels)
- Keep functions small (max 30 lines)

**✅ Test More:**
- Test happy path
- Test error cases
- Test edge cases
- Test with invalid data
- Test with empty data

**✅ Communicate Better:**
- Ask questions early
- Clarify requirements
- Discuss edge cases
- Review AC together

### Bug Triage

When a bug is reported:

```
Day 1 (Today):
└─ Reproduce bug
└─ Assign severity
└─ Create fix if P0/P1

Day 2:
└─ Code fix
└─ Write tests
└─ Request review

Day 3:
└─ Review & approve
└─ Merge to develop
└─ Deploy to staging

Day 4:
└─ QA verification
└─ Deploy to production
```

---

## Communication

### Status Communication

**aily Standup (15 mins)**
- Share blockers and risks
- Ask for help immediately
- Celebrate wins

**Slack Updates (throughout day)**
- PRs ready for review
- Tests passed/failed
- Questions/clarifications
- Celebrations

**Weekly Sync (1 hour)**
- Technical deep dives
- Architecture decisions
- Process improvements

**Sprint Review (1 hour)**
- Demo completed work
- Get feedback
- Celebrate achievements

**Retrospective (1 hour)**
- What went well
- What didn't
- How to improve

### Escalation Communication

```
Blocker Found
    │
    ├─ Try to solve (yourself)      [< 30 min]
    │
    ├─ Ask team for help            [standup + < 1 hour]
    │
    ├─ Request Tech Lead help       [immediately]
    │
    └─ Escalate to Scrum Master    [immediately]
```

### Communicating Changes

When proposing changes, include:

1. **Context** - Why change is needed
2. **Problem** - What's currently broken
3. **Solution** - How to fix it
4. **Impact** - Who it affects
5. **Timeline** - When needed
6. **Alternatives** - Other options considered

---

## Problem Solving

### Debugging Process

**When Issue Found:**

1. **Understand the Problem**
   - Reproduce consistently
   - Check recent changes
   - Review error message
   - Check logs/console

2. **Gather Information**
   - Browser/version
   - Steps to reproduce
   - Expected vs actual
   - Environment (dev/staging/prod)

3. **Isolate the Issue**
   - Is it frontend or backend?
   - Which component fails?
   - When did it start?
   - Does it happen everywhere?

4. **Fix and Verify**
   - Implement fix
   - Test fix works
   - Verify no regressions
   - Document learned lesson

### Blocker Resolution

```
BLOCKED
    │
    ├─ What exactly is blocked? [Be specific]
    │
    ├─ Why is it blocked? [Root cause]
    │
    ├─ How urgent is it? [P0/P1/P2]
    │
    ├─ Who can unblock? [Name owner]
    │
    └─ What's the workaround? [If any]
```

**Escalation Rules:**
- P0: Escalate immediately
- P1: Escalate within 1 hour
- P2: Escalate within 4 hours
- P3: Can wait until sprint planning

---

## Continuous Improvement

### Retrospective Best Practices

**Never Skip Retrospectives**

Even if sprint went smoothly:
- Celebrate what worked
- Identify one improvement
- Plan for next sprint

**Retrospective Format (1 hour):**

```
Opening (5 min)
└─ Set tone, explain process

What Went Well? (15 min)
└─ Everyone shares (no criticism)
└─ List on board

What Didn't Go Well? (15 min)
└─ Everyone shares (focus on facts)
└─ No blame or defensiveness

Action Items (20 min)
└─ Pick top 3 improvements
└─ Assign owners
└─ Plan for next sprint

Closing (5 min)
└─ Confirm action items
└─ Schedule next retro
```

### Measuring Improvement

Track these metrics:

| Metric | Why Important | How to Improve |
|--------|--------------|-----------------|
| **Velocity Stability** | Predictable planning | Reduce surprises, better estimation |
| **Bug Escape Rate** | Quality indicator | Better testing, code review |
| **Deployment Time** | DevOps efficiency | Automate, reduce manual steps |
| **Review Time** | Code quality loop | Review faster, clearer PRs |
| **Team Happiness** | Retention & performance | Address concerns in retro |

### Learning & Development

**Invest in Growth:**

- 1 hour/week for learning
- Share knowledge with team
- Attend workshops/webinars
- Read latest documentation
- Mentor teammates
- Experiment with new tools

---

## Team Health

### Recognizing Burnout

**Red Flags:**
- Declining velocity
- Increasing mistakes
- Late for meetings
- Disengaged in discussion
- Procrastinating
- Complaining frequently

**If Noticed:**
1. Talk privately and empathetically
2. Listen more than talk
3. Help reduce workload
4. Adjust sprint goals
5. Involve management if needed

### Sustainable Pace

**✅ Healthy Sprints:**
- Regular work hours (8-9 hours/day)
- No consistent overtime
- Adequate breaks
- Vacation time respected
- Reasonable on-call duty

**❌ Unsustainable:**
- Regular 12+ hour days
- No time for exercise/family
- Always available (even nights/weekends)
- Ignored vacation
- Constant emergency work

### Team Rituals

1. **Daily Standup** - Connection & alignment
2. **Weekly Sync** - Deep technical discussion
3. **Sprint Review** - Show off work
4. **Retrospective** - Improve together
5. **Social Events** - Build relationships
6. **Team Lunch** - Informal bonding
7. **Celebration** - Acknowledge wins

---

## Quick Reference: Agile Do's and Don'ts

| DO | DON'T |
|----|-------|
| ✅ Communicate early | ❌ Wait until Friday |
| ✅ Ask for help | ❌ Struggle alone |
| ✅ Update progress daily | ❌ Disappear and reappear Friday |
| ✅ Write tests | ❌ Submit untested code |
| ✅ Review code carefully | ❌ Rubber-stamp PRs |
| ✅ Document decisions | ❌ Assume everyone knows why |
| ✅ Celebrate wins | ❌ Forget what you achieved |
| ✅ Learn from failures | ❌ Blame others |
| ✅ Take responsibility | ❌ Point fingers |
| ✅ Help teammates | ❌ Hoard knowledge |

---

## Agile Metrics Dashboard

### Sprint Health Indicators

```
📊 Sprint 1 Health Dashboard

Velocity:        40 SP (On Target)  ████████████░░░░░░░░
Completion:      95% (Excellent)    ████████████████░░░░
Quality:         78% Coverage (Good) ███████████░░░░░░░░░
Team Happiness:  4.2/5 (Happy)      ████████░░░░░░░░░░░░
Bug Escape:      2% (Excellent)     ░░░░░░░░████████░░░░░
```

### Metrics to Track

| Metric | Good Range | Warning | Alert |
|--------|-----------|---------|-------|
| Velocity | ±10% | ±20% | >±30% |
| Burndown | Linear | Some spike | Flat |
| Test Coverage | >80% | 70-80% | <70% |
| Bug Escape | <5% | 5-10% | >10% |
| Happiness | 4+/5 | 3-4/5 | <3/5 |

---

## Summary: 7-Point Agile Success Plan

1. **Plan Honestly** - Realistic goals, real estimates, real capacity
2. **Execute Daily** - Stand up, update, communicate, help
3. **Test Always** - Before shipping anything
4. **Review Carefully** - Two pairs of eyes minimum
5. **Improve Continuously** - Learn from each sprint
6. **Communicate Clearly** - Over-communicate rather than under
7. **Celebrate Wins** - Acknowledge achievements and growth

---

**Agile Best Practices Version:** 1.0  
**Last Updated:** April 2026  
**Next Review:** July 2026  
**Owner:** Scrum Master / Tech Lead
