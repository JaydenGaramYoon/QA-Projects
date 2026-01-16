# OWASP RTM - All 27 Requirements at a Glance

## Complete Mapping Summary - One Page Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 OWASP TOP 10 2025 - REQUIREMENTS MAPPING                    │
│                   UniStyle E-Commerce Web App (27 REQs)                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Risk Distribution

```
CRITICAL (9)  ████████░░░░░░░░░░ 33%  → Test Week 1
HIGH (10)     ██████████░░░░░░░░ 37%  → Test Week 2-3
MEDIUM (6)    ███████░░░░░░░░░░░ 22%  → Test Week 4
LOW (2)       ██░░░░░░░░░░░░░░░░  7%  → Test Week 5
```

---

## CRITICAL REQUIREMENTS (Test Week 1)

### Row 1: Authentication Failures
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Authentication & Authorization Failures | REQ-013, 014, 015 | CRITICAL | OWASP A01, A07 | Session management, token validation, credential verification, brute force protection, rate limiting |

**Details:**
- **REQ-013:** Login Redirect - Enforce authentication for protected resources
- **REQ-014:** Valid Login - Secure credential validation and session creation
- **REQ-015:** Invalid Login Handling - Brute force protection, rate limiting

---

### Row 2: Broken Access Control - Admin
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Broken Access Control - Admin | REQ-022, 023 | CRITICAL | OWASP A01 | Role-based access control, privilege verification, access denial, privilege escalation prevention |

**Details:**
- **REQ-022:** Admin Portal Access - Admin-only portal access
- **REQ-023:** Admin Access Restriction - Prevent privilege escalation

---

### Row 3: Broken Access Control - User Data
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Broken Access Control - User Data | REQ-016, 021 | CRITICAL | OWASP A01 | Authorization checks, object-level access control, forced browsing prevention, data filtering |

**Details:**
- **REQ-016:** Protected Page Redirect - Redirect unauthenticated users
- **REQ-021:** Order Tracking View - **Users can ONLY view own orders**

---

### Row 4: Payment & Transaction Processing
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Payment & Transaction Processing | REQ-019, 020 | CRITICAL | OWASP A01, A04, A06 | Payment verification, encryption, authorization, fraud prevention, transaction integrity |

**Details:**
- **REQ-019:** Checkout Processing - Secure payment with TLS/SSL, authorization
- **REQ-020:** Order Confirmation - Transaction integrity, email security

---

## HIGH PRIORITY REQUIREMENTS (Test Week 2-3)

### Row 5: Session & Data Protection
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Session & Data Protection | REQ-010, 017 | HIGH | OWASP A01, A04 | Session storage, data encryption, secure cookies, confidentiality, session isolation |

**Details:**
- **REQ-010:** Temporary Cart Storage - Encrypt cart data, isolate sessions
- **REQ-017:** Cart Persistence - Encrypted persistent cart, user isolation

---

### Row 6: Authentication & Account Management
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Authentication & Account Management | REQ-012, 027 | HIGH | OWASP A01, A07 | Authentication verification, session validation, credential protection, account security |

**Details:**
- **REQ-012:** Customer Home Access - Session validation
- **REQ-027:** User Account Management - Self-service account security

---

### Row 7: Administrative Functions
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Administrative Functions | REQ-024, 025, 026 | HIGH | OWASP A01, A06 | Authorization, input validation, business logic, data integrity, transaction management |

**Details:**
- **REQ-024:** Product Creation - Admin authorization, input validation
- **REQ-025:** Product Update - Admin authorization, data integrity
- **REQ-026:** Product Deletion - Admin authorization, transaction handling

---

### Row 8: Product Data Integrity
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Product Data Integrity | REQ-009 | HIGH | OWASP A06 | Data validation, consistency verification, accuracy checks |

**Details:**
- **REQ-009:** Product Data Accuracy - Data consistency, validation

---

### Row 9: Product Access
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Product Details Access | REQ-007 | MEDIUM | OWASP A01, A06 | Authorization verification, product access control |

**Details:**
- **REQ-007:** Product Details Access - Authorization for product data

---

## MEDIUM PRIORITY REQUIREMENTS (Test Week 4)

### Row 10: Cart & Session Management
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Data Retention & Cart Management | REQ-011, 018 | MEDIUM | OWASP A01 | Session timeout, data retention policies, transaction consistency, cart merge integrity |

**Details:**
- **REQ-011:** Temporary Cart Retention - Session timeout, cleanup
- **REQ-018:** Cart Restore - Merge integrity, data consistency

---

### Row 11: Public Access & Security
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Product Access & Security Configuration | REQ-001, 003, 007 | MEDIUM | OWASP A01, A02 | Public resource access, authorization checks, configuration verification |

**Details:**
- **REQ-001:** Homepage Access - Public accessibility
- **REQ-003:** Anonymous Access - Proper authorization

---

### Row 12: Input Validation & Injection Prevention
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Input Validation & Injection Prevention | REQ-004 | MEDIUM | OWASP A05, A06 | SQL injection prevention, parameterized queries, business logic validation |

**Details:**
- **REQ-004:** Category Filtering - SQL injection prevention, input validation

---

### Row 13: Error Handling
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Error Handling & System Resilience | REQ-006, 008 | MEDIUM | OWASP A02, A06, A10 | Exception handling, error message security, graceful degradation, no information leakage |

**Details:**
- **REQ-006:** Empty Category Result - Graceful error handling
- **REQ-008:** Product Information Display - Configuration verification

---

## LOW PRIORITY REQUIREMENTS (Test Week 5)

### Row 14: Basic Navigation
| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| Basic Navigation & Functionality | REQ-002, 005 | LOW | OWASP A06 | Navigation correctness, state management, UI functionality |

**Details:**
- **REQ-002:** Logo Redirect - Navigation to homepage
- **REQ-005:** Clear Category Filter - State reset, functionality

---

## OWASP Category Breakdown

```
A01 (Broken Access Control)           ████████████████████  20 REQs (74%)
├─ REQ-001, 003, 007, 010, 011, 012
├─ REQ-013, 014, 016, 017, 018
├─ REQ-019, 020, 021, 022, 023
├─ REQ-024, 025, 026, 027

A06 (Insecure Design)                 ███████████           11 REQs (41%)
├─ REQ-002, 004, 005, 006, 007, 008
├─ REQ-009, 019, 024, 025, 026

A07 (Authentication Failures)         █████                  5 REQs (19%)
├─ REQ-012, 013, 014, 015, 027

A04 (Cryptographic Failures)          ████                   4 REQs (15%)
├─ REQ-010, 017, 019, 020

A02 (Security Misconfiguration)       ███                    3 REQs (11%)
├─ REQ-001, 003, 008

A05 (Injection)                       ██                     1 REQ  (4%)
├─ REQ-004

A10 (Mishandling of Exceptions)       ██                     1 REQ  (4%)
├─ REQ-006
```

---

## Testing Timeline

```
Week 1: CRITICAL (9 REQs)
┌─────────────────────────────────────────────────────────┐
│ Mon: REQ-013, 014, 015 (Authentication)                 │
│ Tue: REQ-016, 022, 023 (Access Control)                 │
│ Wed: REQ-019, 020 (Payment Processing)                  │
│ Thu: REQ-021 (Order Data Access)                        │
│ Fri: Summary & Issues                                   │
└─────────────────────────────────────────────────────────┘

Week 2-3: HIGH (10 REQs)
┌─────────────────────────────────────────────────────────┐
│ Week 2: REQ-010, 012, 017 (Session & Auth)              │
│         REQ-024, 025, 026 (Admin Functions)             │
│ Week 3: REQ-027 (Account Management)                    │
│         REQ-007, 009 (Product Management)               │
└─────────────────────────────────────────────────────────┘

Week 4: MEDIUM (6 REQs)
┌─────────────────────────────────────────────────────────┐
│ REQ-001, 003, 004, 006, 008, 011, 018                   │
│ (Public Access, Input Validation, Error Handling)       │
└─────────────────────────────────────────────────────────┘

Week 5: LOW (2 REQs)
┌─────────────────────────────────────────────────────────┐
│ REQ-002, 005 (Navigation & Functionality)               │
└─────────────────────────────────────────────────────────┘
```

---

## Key Testing Points

### CRITICAL (Week 1)
- [ ] Authentication: Login, brute force protection, rate limiting
- [ ] Access Control: Forced browsing prevention, privilege escalation tests
- [ ] Payments: HTTPS/TLS, authorization, fraud prevention
- [ ] User Data: Prevent viewing other users' orders

### HIGH (Week 2-3)
- [ ] Encryption: Cart data, persistent data
- [ ] Session Management: Isolation, timeout, security
- [ ] Admin Functions: Authorization for CRUD operations
- [ ] Data Integrity: Consistency, accuracy, validation

### MEDIUM (Week 4)
- [ ] Input Validation: SQL injection, XSS prevention
- [ ] Error Handling: Graceful degradation, no info leakage
- [ ] Configuration: Proper security settings

### LOW (Week 5)
- [ ] Navigation: UI functionality
- [ ] State Management: Filter reset, state transitions

---

## Success Metrics

```
Phase 1 (CRITICAL): 100% test coverage, zero high vulnerabilities
Phase 2 (HIGH):     100% test coverage, all medium issues resolved
Phase 3 (MEDIUM):   80%+ test coverage, low issues logged
Phase 4 (LOW):      50%+ test coverage, automated testing
```

---

## Files Generated

1. **README_OWASP_Mapping.md** - This summary document
2. **OWASP_RTM_Final.md** - Complete mapping with testing plan
3. **OWASP_RTM_Quick_Reference.md** - Quick lookup tables
4. **OWASP_RTM_Summary_Table.md** - Detailed analysis
5. **OWASP_Requirements_Mapping.md** - Comprehensive documentation

---

**Status:** ✅ COMPLETE - Ready for Testing
**Date:** January 6, 2026
**Total Requirements:** 27
**OWASP Coverage:** 100%
