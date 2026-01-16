# OWASP Top 10 2025 - E-Commerce Requirement Traceability Matrix

## Consolidated Risk-Based Mapping Table (As Requested)

| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Authentication & Authorization Failures | REQ-013, 014, 015 | CRITICAL | OWASP A01, A07 | Session management, token validation, credential verification, brute force protection, rate limiting |
| Broken Access Control - Admin | REQ-022, 023 | CRITICAL | OWASP A01 | Role-based access control, privilege verification, access denial, privilege escalation prevention |
| Broken Access Control - User Data | REQ-016, 021 | CRITICAL | OWASP A01 | Authorization checks, object-level access control, forced browsing prevention, data filtering |
| Payment & Transaction Processing | REQ-019, 020 | CRITICAL | OWASP A01, A04, A06 | Payment verification, encryption, authorization, fraud prevention, transaction integrity |
| Session & Data Protection | REQ-010, 017 | HIGH | OWASP A01, A04 | Session storage, data encryption, secure cookies, confidentiality, session isolation |
| Authentication & Account Management | REQ-012, 027 | HIGH | OWASP A01, A07 | Authentication verification, session validation, credential protection, account security |
| Administrative Functions | REQ-024, 025, 026 | HIGH | OWASP A01, A06 | Authorization, input validation, business logic, data integrity, transaction management |
| Product Data Integrity | REQ-009 | HIGH | OWASP A06 | Data validation, consistency verification, accuracy checks |
| Data Retention & Cart Management | REQ-011, 018 | MEDIUM | OWASP A01 | Session timeout, data retention policies, transaction consistency, cart merge integrity |
| Product Access & Security Configuration | REQ-001, 003, 007 | MEDIUM | OWASP A01, A02 | Public resource access, authorization checks, configuration verification |
| Input Validation & Injection Prevention | REQ-004 | MEDIUM | OWASP A05, A06 | SQL injection prevention, parameterized queries, business logic validation |
| Error Handling & System Resilience | REQ-006, 008 | MEDIUM | OWASP A02, A06, A10 | Exception handling, error message security, graceful degradation, no information leakage |
| Basic Navigation & Functionality | REQ-002, 005 | LOW | OWASP A06 | Navigation correctness, state management, UI functionality |

---

## Full Requirements Mapping (27 Requirements)

### Group 1: Critical - Authentication & Authorization (9 Requirements)

| REQ | Name | OWASP | Risk | Critical Tests |
|---|---|---|---|---|
| REQ-013 | Login Redirect | A01, A07 | CRITICAL | Unauthenticated → login redirection, session enforcement |
| REQ-014 | Valid Login | A01, A07 | CRITICAL | Credential validation, secure session creation, token generation |
| REQ-015 | Invalid Login Handling | A07 | CRITICAL | Brute force protection, rate limiting, generic error messages |
| REQ-016 | Protected Page Redirect | A01 | CRITICAL | Authorization enforcement, no unauthorized access, session validation |
| REQ-019 | Checkout Processing | A01, A04, A06 | CRITICAL | TLS/SSL encryption, payment security, authorization, PCI compliance |
| REQ-020 | Order Confirmation | A01, A04 | CRITICAL | Order creation integrity, email security, data protection |
| REQ-021 | Order Tracking View | A01 | CRITICAL | **User can ONLY view own orders**, prevent order ID tampering |
| REQ-022 | Admin Portal Access | A01 | CRITICAL | Admin role verification, session validation, access enforcement |
| REQ-023 | Admin Access Restriction | A01 | CRITICAL | Non-admin users denied, privilege escalation prevention |

### Group 2: High - Session & Account Management (10 Requirements)

| REQ | Name | OWASP | Risk | Key Tests |
|---|---|---|---|---|
| REQ-010 | Temporary Cart Storage | A01, A04 | HIGH | Cart encryption, session isolation, secure storage |
| REQ-012 | Customer Home Access | A01, A07 | HIGH | Authentication verification, session validation |
| REQ-017 | Cart Persistence | A01, A04 | HIGH | Data encryption, user isolation, session security |
| REQ-024 | Product Creation | A01, A06 | HIGH | Admin authorization, input validation, XSS prevention |
| REQ-025 | Product Update | A01, A06 | HIGH | Admin authorization, data integrity, input validation |
| REQ-026 | Product Deletion | A01, A06 | HIGH | Admin authorization, cascading deletes, transaction rollback |
| REQ-027 | User Account Management | A01, A07 | HIGH | User self-authorization, credential protection |
| REQ-007 | Product Details Access | A01, A06 | MEDIUM | Authorization for product data, proper access control |
| REQ-009 | Product Data Accuracy | A06 | HIGH | Data consistency, validation, concurrent updates |

### Group 3: Medium - Cart Management (2 Requirements)

| REQ | Name | OWASP | Risk | Key Tests |
|---|---|---|---|---|
| REQ-011 | Temporary Cart Retention | A01 | MEDIUM | Session timeout, data retention, cleanup procedures |
| REQ-018 | Cart Restore | A01 | MEDIUM | Merge integrity, data consistency, no loss |

### Group 4: Medium - Public Access (3 Requirements)

| REQ | Name | OWASP | Risk | Key Tests |
|---|---|---|---|---|
| REQ-001 | Homepage Access | A01, A02 | MEDIUM | Public accessibility, no authentication required |
| REQ-003 | Anonymous Access | A01, A02 | MEDIUM | Browse without login, proper authorization |

### Group 5: Medium - Input & Error Handling (3 Requirements)

| REQ | Name | OWASP | Risk | Key Tests |
|---|---|---|---|---|
| REQ-004 | Category Filtering | A05, A06 | MEDIUM | SQL injection prevention, parameterized queries |
| REQ-006 | Empty Category Result | A06, A10 | MEDIUM | Graceful handling, no info leakage |
| REQ-008 | Product Information Display | A02, A06 | MEDIUM | Data accuracy, no sensitive backend info |

### Group 6: Low - Navigation (2 Requirements)

| REQ | Name | OWASP | Risk | Key Tests |
|---|---|---|---|---|
| REQ-002 | Logo Redirect | A06 | LOW | Navigation to homepage |
| REQ-005 | Clear Category Filter | A06 | LOW | State reset, functionality |

---

## OWASP Top 10 2025 Coverage Summary

### A01: Broken Access Control (20 Requirements - 74%)
**Description:** Users performing actions outside intended permissions

Requirements: REQ-001, 003, 007, 010, 011, 012, 013, 014, 016, 017, 018, 019, 020, 021, 022, 023, 024, 025, 026, 027

- **CRITICAL (9):** REQ-013, 014, 016, 019, 020, 021, 022, 023
- **HIGH (10):** REQ-010, 012, 017, 024, 025, 026, 027
- **MEDIUM (3):** REQ-001, 003, 011, 018, 007

### A02: Security Misconfiguration (3 Requirements - 11%)
**Description:** System configured incorrectly from security perspective

Requirements: REQ-001, 003, 008

### A04: Cryptographic Failures (4 Requirements - 15%)
**Description:** Failures related to cryptography and encryption

Requirements: REQ-010, 017, 019, 020

### A05: Injection (1 Requirement - 4%)
**Description:** Untrusted data sent to interpreter as commands

Requirements: REQ-004

### A06: Insecure Design (11 Requirements - 41%)
**Description:** Design flaws and missing security controls

Requirements: REQ-002, 004, 005, 006, 007, 008, 009, 019, 024, 025, 026

### A07: Authentication Failures (5 Requirements - 19%)
**Description:** Failures in authentication mechanisms

Requirements: REQ-012, 013, 014, 015, 027

### A10: Mishandling of Exceptional Conditions (1 Requirement - 4%)
**Description:** Improper error handling

Requirements: REQ-006

---

## Testing Execution Plan

### Phase 1: CRITICAL (Week 1 - Days 1-5)
**Focus:** Security vulnerabilities that could cause immediate compromise

1. **Day 1:** REQ-013, REQ-014, REQ-015 (Authentication)
   - Login functionality, brute force protection

2. **Day 2:** REQ-016, REQ-022, REQ-023 (Access Control)
   - Protected pages, admin access

3. **Day 3:** REQ-019, REQ-020 (Payment Processing)
   - Encryption, authorization, transaction integrity

4. **Day 4:** REQ-021 (Order Data Access)
   - User isolation, no data leakage

5. **Day 5:** Critical testing summary & remediation

### Phase 2: HIGH (Week 2-3)
**Focus:** Data protection and authorization

- REQ-010, REQ-017 (Session/cart encryption)
- REQ-012, REQ-027 (Account management)
- REQ-024, REQ-025, REQ-026 (Admin functions)
- REQ-009 (Data integrity)
- REQ-007 (Product access)

### Phase 3: MEDIUM (Week 4)
**Focus:** Input validation and public access

- REQ-001, REQ-003 (Public access)
- REQ-004 (Input validation)
- REQ-006, REQ-008 (Error handling)
- REQ-011, REQ-018 (Cart management)

### Phase 4: LOW (Week 5)
**Focus:** Navigation and basic functionality

- REQ-002, REQ-005 (UI/Navigation)

---

## Key Risk Indicators

| Metric | Value | Risk Assessment |
|---|---|---|
| **CRITICAL Requirements** | 9 (33%) | **HIGH - Immediate testing required** |
| **HIGH Requirements** | 10 (37%) | **MEDIUM-HIGH - Week 1-2 testing** |
| **MEDIUM Requirements** | 6 (22%) | **MEDIUM - Week 3-4 testing** |
| **LOW Requirements** | 2 (7%) | **LOW - Week 5 testing** |
| **A01 Coverage** | 20 (74%) | **CRITICAL - Access control focus** |
| **A04 Coverage** | 4 (15%) | **HIGH - Encryption focus** |
| **A07 Coverage** | 5 (19%) | **CRITICAL - Authentication focus** |

---

## Test Case Matrix (By OWASP Category)

### A01 - Broken Access Control (20 Requirements)
```
Test Category: Forced Browsing
├─ REQ-013: Can unauthenticated user access /login?
├─ REQ-016: Does /admin redirect to login?
└─ REQ-022, 023: Non-admin blocked from admin?

Test Category: Parameter Tampering
├─ REQ-021: Change order_id in URL → denied?
└─ REQ-019, 020: Change amount/order → denied?

Test Category: Privilege Escalation
├─ REQ-022: Admin role required for /admin
├─ REQ-024, 025, 026: Admin role required for CRUD
└─ REQ-023: Verify non-admin cannot escalate

Test Category: Horizontal Privilege Escalation
├─ REQ-021: User B cannot view User A orders
├─ REQ-017: User B cannot see User A cart
└─ REQ-027: User B cannot edit User A account
```

### A04 - Cryptographic Failures (4 Requirements)
```
Test Category: Data in Transit
├─ REQ-019: HTTPS required for payment
├─ REQ-020: Order confirmation sent encrypted
└─ REQ-010, 017: Cart data encrypted in transit

Test Category: Data at Rest
├─ REQ-010: Temporary cart encrypted
├─ REQ-017: Persistent cart encrypted
└─ REQ-020: Order data encrypted

Test Category: Weak Cryptography
├─ REQ-019: Modern TLS version (1.2+)
└─ REQ-020: Secure email transmission
```

### A07 - Authentication Failures (5 Requirements)
```
Test Category: Brute Force
├─ REQ-014: Rate limiting after N attempts
├─ REQ-015: Account lockout mechanism
└─ REQ-013: Session security

Test Category: Weak Credentials
├─ REQ-014: Password strength validation
└─ REQ-015: Credential breach checking

Test Category: Session Management
├─ REQ-012: Session validation on each request
├─ REQ-027: Secure session handling
└─ REQ-013: Proper session termination
```

---

## Sign-Off Checklist

- [ ] All 27 requirements reviewed and understood
- [ ] OWASP mapping verified for accuracy
- [ ] Risk levels assigned based on business impact
- [ ] Testing prioritization confirmed with stakeholders
- [ ] Critical path identified (9 CRITICAL requirements)
- [ ] Test environment ready for execution
- [ ] Automation scripts prepared for regression
- [ ] Test data prepared and sanitized
- [ ] Performance baseline established
- [ ] Security testing tools configured
