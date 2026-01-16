# OWASP Top 10 2025 - Requirements Mapping Quick Reference

## Master Mapping Table

| # | REQ ID | Requirement Name | Risk Level | OWASP A01 | A02 | A04 | A05 | A06 | A07 | A10 | Test Category |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | REQ-001 | Homepage Access | MEDIUM | ✓ | ✓ | | | | | | Configuration |
| 2 | REQ-002 | Logo Redirect | LOW | | | | | ✓ | | | Navigation |
| 3 | REQ-003 | Anonymous Access | MEDIUM | ✓ | ✓ | | | | | | Access Control |
| 4 | REQ-004 | Category Filtering | MEDIUM | | | | ✓ | ✓ | | | Input Validation |
| 5 | REQ-005 | Clear Category Filter | LOW | | | | | ✓ | | | Navigation |
| 6 | REQ-006 | Empty Category Result | MEDIUM | | | | | ✓ | | ✓ | Error Handling |
| 7 | REQ-007 | Product Details Access | MEDIUM | ✓ | | | | ✓ | | | Access Control |
| 8 | REQ-008 | Product Information Display | MEDIUM | | ✓ | | | ✓ | | | Configuration |
| 9 | REQ-009 | Product Data Accuracy | HIGH | | | | | ✓ | | | Data Integrity |
| 10 | REQ-010 | Temporary Cart Storage | HIGH | ✓ | | ✓ | | | | | Encryption |
| 11 | REQ-011 | Temporary Cart Retention | MEDIUM | ✓ | | | | | | | Session Mgmt |
| 12 | REQ-012 | Customer Home Access | HIGH | ✓ | | | | | ✓ | | Authentication |
| 13 | REQ-013 | Login Redirect | **CRITICAL** | ✓ | | | | | ✓ | | **Authentication** |
| 14 | REQ-014 | Valid Login | **CRITICAL** | ✓ | | | | | ✓ | | **Authentication** |
| 15 | REQ-015 | Invalid Login Handling | **CRITICAL** | | | | | | ✓ | | **Authentication** |
| 16 | REQ-016 | Protected Page Redirect | **CRITICAL** | ✓ | | | | | | | **Access Control** |
| 17 | REQ-017 | Cart Persistence | HIGH | ✓ | | ✓ | | | | | Encryption |
| 18 | REQ-018 | Cart Restore | MEDIUM | ✓ | | | | | | | Transaction |
| 19 | REQ-019 | Checkout Processing | **CRITICAL** | ✓ | | ✓ | | ✓ | | | **Payment/Security** |
| 20 | REQ-020 | Order Confirmation | **CRITICAL** | ✓ | | ✓ | | | | | **Payment/Transaction** |
| 21 | REQ-021 | Order Tracking View | **CRITICAL** | ✓ | | | | | | | **Access Control** |
| 22 | REQ-022 | Admin Portal Access | **CRITICAL** | ✓ | | | | | | | **Access Control** |
| 23 | REQ-023 | Admin Access Restriction | **CRITICAL** | ✓ | | | | | | | **Access Control** |
| 24 | REQ-024 | Product Creation | HIGH | ✓ | | | | ✓ | | | Authorization |
| 25 | REQ-025 | Product Update | HIGH | ✓ | | | | ✓ | | | Authorization |
| 26 | REQ-026 | Product Deletion | HIGH | ✓ | | | | ✓ | | | Authorization |
| 27 | REQ-027 | User Account Management | HIGH | ✓ | | | | | ✓ | | Authentication |

---

## OWASP Coverage by Category

| OWASP Category | Title | Count | Key Requirements | Risk Focus |
|---|---|---|---|---|
| **A01** | **Broken Access Control** | 20 | REQ-013, 014, 016, 021, 022, 023 | **CRITICAL** |
| **A02** | **Security Misconfiguration** | 3 | REQ-001, 003, 008 | Configuration |
| **A04** | **Cryptographic Failures** | 4 | REQ-010, 017, 019, 020 | **Encryption** |
| **A05** | **Injection** | 1 | REQ-004 | SQL Injection |
| **A06** | **Insecure Design** | 11 | REQ-009, 024, 025, 026 | Business Logic |
| **A07** | **Authentication Failures** | 5 | REQ-013, 014, 015, 027 | **CRITICAL** |
| **A10** | **Mishandling of Exceptions** | 1 | REQ-006 | Error Handling |

---

## Critical Requirements (MUST TEST FIRST)

| REQ ID | Name | OWASP | Why Critical |
|---|---|---|---|
| **REQ-013** | Login Redirect | A01, A07 | Enforces authentication for protected resources |
| **REQ-014** | Valid Login | A01, A07 | Credential validation and session creation foundation |
| **REQ-015** | Invalid Login Handling | A07 | Brute force protection, rate limiting |
| **REQ-016** | Protected Page Redirect | A01 | Core access control enforcement |
| **REQ-019** | Checkout Processing | A01, A04, A06 | Payment security, encryption, authorization |
| **REQ-020** | Order Confirmation | A01, A04 | Transaction integrity, data protection |
| **REQ-021** | Order Tracking View | A01 | **CRITICAL:** User cannot view other orders |
| **REQ-022** | Admin Portal Access | A01 | Role-based access control foundation |
| **REQ-023** | Admin Access Restriction | A01 | Prevents privilege escalation |

---

## High Priority Requirements

| REQ ID | Name | OWASP | Test Focus |
|---|---|---|---|
| REQ-007 | Product Details Access | A01, A06 | Authorization for product data |
| REQ-009 | Product Data Accuracy | A06 | Data integrity verification |
| REQ-010 | Temporary Cart Storage | A01, A04 | Session encryption, isolation |
| REQ-012 | Customer Home Access | A01, A07 | Session validation |
| REQ-017 | Cart Persistence | A01, A04 | Encryption, access control |
| REQ-024 | Product Creation | A01, A06 | Admin authorization, input validation |
| REQ-025 | Product Update | A01, A06 | Admin authorization, data integrity |
| REQ-026 | Product Deletion | A01, A06 | Admin authorization, transaction handling |
| REQ-027 | User Account Management | A01, A07 | Self-service account security |

---

## Testing Priority Breakdown

```
PHASE 1 - CRITICAL (Week 1)
├─ REQ-013: Login Redirect
├─ REQ-014: Valid Login
├─ REQ-015: Invalid Login Handling
├─ REQ-016: Protected Page Redirect
├─ REQ-021: Order Tracking View
├─ REQ-022: Admin Portal Access
├─ REQ-023: Admin Access Restriction
├─ REQ-019: Checkout Processing
└─ REQ-020: Order Confirmation

PHASE 2 - HIGH (Week 2-3)
├─ REQ-010: Temporary Cart Storage
├─ REQ-012: Customer Home Access
├─ REQ-017: Cart Persistence
├─ REQ-024: Product Creation
├─ REQ-025: Product Update
├─ REQ-026: Product Deletion
├─ REQ-027: User Account Management
├─ REQ-007: Product Details Access
└─ REQ-009: Product Data Accuracy

PHASE 3 - MEDIUM (Week 4)
├─ REQ-001: Homepage Access
├─ REQ-003: Anonymous Access
├─ REQ-004: Category Filtering
├─ REQ-006: Empty Category Result
├─ REQ-008: Product Information Display
├─ REQ-011: Temporary Cart Retention
└─ REQ-018: Cart Restore

PHASE 4 - LOW (Week 5)
├─ REQ-002: Logo Redirect
└─ REQ-005: Clear Category Filter
```

---

## Test Case Summary by Type

| Test Type | Requirements | Count | Examples |
|---|---|---|---|
| **Access Control** | REQ-013, 016, 021, 022, 023 | 5 | Unauthorized access, privilege escalation |
| **Authentication** | REQ-014, 015, 027 | 3 | Login, brute force, password security |
| **Encryption/Security** | REQ-010, 017, 019, 020 | 4 | HTTPS, data encryption, secure cookies |
| **Authorization** | REQ-024, 025, 026 | 3 | Role-based access, admin functions |
| **Data Integrity** | REQ-009, 018, 020 | 3 | Consistency, transaction rollback |
| **Input Validation** | REQ-004 | 1 | SQL injection, XSS prevention |
| **Error Handling** | REQ-006 | 1 | Graceful degradation, no info leakage |
| **Business Logic** | REQ-002, 005, 007, 008, 011, 012 | 6 | Navigation, functionality, state mgmt |

---

## Quick Access by Risk Area

### Access Control & Authentication (CRITICAL)
- REQ-013, REQ-014, REQ-015, REQ-016, REQ-021, REQ-022, REQ-023

### Payment & Transactions (CRITICAL)
- REQ-019, REQ-020

### Data Protection & Encryption
- REQ-010, REQ-017, REQ-019, REQ-020

### Admin Functions
- REQ-024, REQ-025, REQ-026

### User Account Management
- REQ-012, REQ-027

### Product Management
- REQ-004, REQ-007, REQ-008, REQ-009

### Public Access
- REQ-001, REQ-003

### Cart Management
- REQ-010, REQ-011, REQ-017, REQ-018

### Navigation & UI
- REQ-002, REQ-005, REQ-006

---

## Key Security Testing Considerations

1. **Session Management:** Test REQ-010, 011, 017, 018 for proper isolation
2. **Forced Browsing:** Test REQ-016, 021, 022, 023 for unauthorized access
3. **Parameter Tampering:** Test REQ-019, 020, 021 for order/payment manipulation
4. **Privilege Escalation:** Test REQ-022, 023, 024, 025, 026 for role bypass
5. **SQL Injection:** Test REQ-004 for parameterized queries
6. **XSS Prevention:** Test REQ-004, 024, 025 for input sanitization
7. **Encryption:** Test REQ-010, 017, 019, 020 for secure communication
8. **Brute Force:** Test REQ-014, 015 for rate limiting
9. **Data Integrity:** Test REQ-009, 020 for consistency
10. **Error Handling:** Test REQ-006 for information leakage
