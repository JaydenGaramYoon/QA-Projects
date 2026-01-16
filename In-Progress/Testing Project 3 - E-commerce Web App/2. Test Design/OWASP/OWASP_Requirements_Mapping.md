# OWASP Top 10 2025 - Requirements Traceability Matrix

## Executive Summary

This document maps all 27 requirements from the UniStyle E-commerce Web App to relevant OWASP Top 10 2025 categories. The requirements are primarily focused on security areas related to Access Control, Authentication, Data Integrity, and Business Logic.

---

## Risk-Based Requirements Mapping

### 1. Authentication & Authorization Failures (CRITICAL)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Authentication & Authorization | REQ-013, REQ-014, REQ-015 | CRITICAL | A01, A07 | Credential validation, session management, token generation, brute force protection, error message handling, rate limiting |
| Broken Access Control | REQ-016, REQ-021, REQ-022, REQ-023 | CRITICAL | A01 | Authorization checks, access enforcement, role-based access control, privilege verification, access denial, privilege elevation prevention |

---

### 2. Payment & Transaction Risks (CRITICAL)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Payment Processing & Security | REQ-019 | CRITICAL | A01, A04, A06 | Payment verification, encryption, authorization, fraud prevention, transaction integrity |
| Transaction Integrity & Access Control | REQ-020 | CRITICAL | A01, A04 | Data integrity, authorization, email security, order confirmation accuracy |

---

### 3. Session & Data Protection (HIGH)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Session Management & Cryptography | REQ-010 | HIGH | A01, A04 | Session storage, data encryption, confidentiality, secure cookie handling |
| Session Management & Data Protection | REQ-017 | HIGH | A01, A04 | Data encryption, session security, access control, persistent session validation |
| Authentication & Access Control | REQ-012, REQ-027 | HIGH | A01, A07 | Authentication verification, session validation, credential protection, account security |

---

### 4. Access Control & Business Logic (HIGH)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Access Control & Business Logic | REQ-007, REQ-024, REQ-025, REQ-026 | HIGH | A01, A06 | Authorization, input validation, business logic enforcement, data integrity |
| Data Integrity & Business Logic | REQ-009 | HIGH | A06 | Data validation, consistency, accuracy verification |

---

### 5. Error Handling & Exceptional Conditions (MEDIUM)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Error Handling & Business Logic | REQ-006 | MEDIUM | A06, A10 | Exception handling, user feedback, graceful degradation |
| Business Logic & Input Validation | REQ-004 | MEDIUM | A05, A06 | Input validation, SQL injection prevention, business logic correctness |

---

### 6. Session Management & Data Retention (MEDIUM)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Session Management | REQ-011 | MEDIUM | A01 | Session timeout, data retention policies, cleanup procedures |
| Access Control & Data Integrity | REQ-018 | MEDIUM | A01 | Data merge integrity, transaction rollback, consistency |

---

### 7. Configuration & Public Access (MEDIUM)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Access Control & Configuration | REQ-001, REQ-003 | MEDIUM | A01, A02 | Public resource access, proper authorization checks, security headers |
| Configuration & Business Logic | REQ-008 | MEDIUM | A02, A06 | Data accuracy, presentation, configuration verification |

---

### 8. Basic Functionality (LOW)

| Risk Name | Requirement ID | Risk Level | OWASP Reference | Testing Focus |
|-----------|---|---|---|---|
| Business Logic | REQ-002, REQ-005 | LOW | A06 | Navigation functionality, state management, UI correctness |

---

## Detailed Requirements Analysis

### REQ-001: Homepage Access
- **Description:** Homepage is accessible to all users
- **OWASP Categories:** A01 (Broken Access Control), A02 (Security Misconfiguration)
- **Risk Level:** MEDIUM
- **Security Concerns:** Proper configuration, public resource accessibility
- **Test Focus:** Verify public access without authentication, check for information disclosure

### REQ-002: Logo Redirect
- **Description:** Logo click redirects to homepage
- **OWASP Categories:** A06 (Insecure Design)
- **Risk Level:** LOW
- **Security Concerns:** Business logic correctness
- **Test Focus:** Navigation flow, UI functionality

### REQ-003: Anonymous Access
- **Description:** Anonymous users can browse products without login
- **OWASP Categories:** A01 (Broken Access Control), A02 (Security Misconfiguration)
- **Risk Level:** MEDIUM
- **Security Concerns:** Proper authorization checks, access control enforcement
- **Test Focus:** Verify anonymous browsing capabilities, ensure protected resources require authentication

### REQ-004: Category Filtering
- **Description:** Products can be filtered by category
- **OWASP Categories:** A05 (Injection), A06 (Insecure Design)
- **Risk Level:** MEDIUM
- **Security Concerns:** Input validation, SQL injection prevention
- **Test Focus:** Validate filter inputs, test for injection attacks, verify query parameterization

### REQ-005: Clear Category Filter
- **Description:** Category filter can be cleared
- **OWASP Categories:** A06 (Insecure Design)
- **Risk Level:** LOW
- **Security Concerns:** State management, business logic
- **Test Focus:** Functionality testing, state reset

### REQ-006: Empty Category Result
- **Description:** Empty results are handled gracefully
- **OWASP Categories:** A06 (Insecure Design), A10 (Mishandling of Exceptional Conditions)
- **Risk Level:** MEDIUM
- **Security Concerns:** Error handling, user feedback
- **Test Focus:** Exception handling, appropriate error messages, no sensitive data in errors

### REQ-007: Product Details Access
- **Description:** Product details are accessible
- **OWASP Categories:** A01 (Broken Access Control), A06 (Insecure Design)
- **Risk Level:** MEDIUM
- **Security Concerns:** Access control, authorization
- **Test Focus:** Verify product access, check authorization for detailed information

### REQ-008: Product Information Display
- **Description:** Product information is correctly displayed
- **OWASP Categories:** A02 (Security Misconfiguration), A06 (Insecure Design)
- **Risk Level:** MEDIUM
- **Security Concerns:** Data accuracy, proper configuration
- **Test Focus:** Data display accuracy, no sensitive information exposure

### REQ-009: Product Data Accuracy
- **Description:** Product data is accurate and consistent
- **OWASP Categories:** A06 (Insecure Design)
- **Risk Level:** HIGH
- **Security Concerns:** Data integrity, business logic
- **Test Focus:** Data validation, consistency across database, update verification

### REQ-010: Temporary Cart Storage
- **Description:** Anonymous users' cart data is stored temporarily
- **OWASP Categories:** A01 (Broken Access Control), A04 (Cryptographic Failures)
- **Risk Level:** HIGH
- **Security Concerns:** Data encryption, session security, confidentiality
- **Test Focus:** Secure storage mechanisms, encryption in transit and at rest, session isolation

### REQ-011: Temporary Cart Retention
- **Description:** Temporary cart data is retained until customer login
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** MEDIUM
- **Security Concerns:** Session management, data retention policies
- **Test Focus:** Verify data retention duration, cleanup procedures, timeout mechanisms

### REQ-012: Customer Home Access
- **Description:** Authenticated customers can access their home page
- **OWASP Categories:** A01 (Broken Access Control), A07 (Authentication Failures)
- **Risk Level:** HIGH
- **Security Concerns:** Authentication verification, access control
- **Test Focus:** Authentication verification, session validation, proper redirects

### REQ-013: Login Redirect
- **Description:** User is redirected to login when accessing protected resources
- **OWASP Categories:** A01 (Broken Access Control), A07 (Authentication Failures)
- **Risk Level:** CRITICAL
- **Security Concerns:** Access control enforcement, authentication
- **Test Focus:** Verify redirect to login for unauthenticated users, check for forced browsing vulnerabilities

### REQ-014: Valid Login
- **Description:** Users can log in with valid credentials
- **OWASP Categories:** A01 (Broken Access Control), A07 (Authentication Failures)
- **Risk Level:** CRITICAL
- **Security Concerns:** Credential validation, session management
- **Test Focus:** Credential verification, secure session creation, token generation, secure password handling

### REQ-015: Invalid Login Handling
- **Description:** Invalid login attempts are properly handled
- **OWASP Categories:** A07 (Authentication Failures)
- **Risk Level:** CRITICAL
- **Security Concerns:** Brute force protection, error handling
- **Test Focus:** Rate limiting, account lockout mechanisms, generic error messages (no user enumeration)

### REQ-016: Protected Page Redirect
- **Description:** Protected pages redirect to login for unauthorized users
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** CRITICAL
- **Security Concerns:** Access control enforcement, authorization
- **Test Focus:** Verify access denial, proper redirects, no sensitive data leakage

### REQ-017: Cart Persistence
- **Description:** Logged-in user cart persists across sessions
- **OWASP Categories:** A01 (Broken Access Control), A04 (Cryptographic Failures)
- **Risk Level:** HIGH
- **Security Concerns:** Data encryption, access control, session security
- **Test Focus:** Secure data storage, encryption, access control verification, no cart mixing

### REQ-018: Cart Restore
- **Description:** Temporary cart is restored to user's persistent cart
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** MEDIUM
- **Security Concerns:** Data integrity, transaction correctness
- **Test Focus:** Verify data merge integrity, transaction consistency, no data loss

### REQ-019: Checkout Processing
- **Description:** System processes checkout and payment
- **OWASP Categories:** A01 (Broken Access Control), A04 (Cryptographic Failures), A06 (Insecure Design)
- **Risk Level:** CRITICAL
- **Security Concerns:** Payment verification, encryption, authorization, fraud prevention
- **Test Focus:** Payment gateway integration, SSL/TLS encryption, PCI compliance, authorization checks, amount verification

### REQ-020: Order Confirmation
- **Description:** Order confirmation is provided after successful payment
- **OWASP Categories:** A01 (Broken Access Control), A04 (Cryptographic Failures)
- **Risk Level:** CRITICAL
- **Security Concerns:** Data integrity, authorization, email security
- **Test Focus:** Order creation verification, authorization checks, secure email transmission, no sensitive data in confirmation

### REQ-021: Order Tracking View
- **Description:** Users can only view their own orders
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** CRITICAL
- **Security Concerns:** Object-level access control, data filtering
- **Test Focus:** Verify users can only see own orders, test for forced browsing with other order IDs, parameter tampering prevention

### REQ-022: Admin Portal Access
- **Description:** Authorized admins can access admin portal
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** CRITICAL
- **Security Concerns:** Role-based access control, privilege verification
- **Test Focus:** Verify admin authentication, role verification, session validation for admin functions

### REQ-023: Admin Access Restriction
- **Description:** Non-admin users cannot access admin functions
- **OWASP Categories:** A01 (Broken Access Control)
- **Risk Level:** CRITICAL
- **Security Concerns:** Privilege escalation prevention, access denial
- **Test Focus:** Verify non-admin users denied access, test for privilege escalation attempts, authorization bypass attempts

### REQ-024: Product Creation
- **Description:** Admin can create new products
- **OWASP Categories:** A01 (Broken Access Control), A06 (Insecure Design)
- **Risk Level:** HIGH
- **Security Concerns:** Authorization, input validation, business logic
- **Test Focus:** Verify admin authorization, input validation, SQL injection prevention, XSS prevention

### REQ-025: Product Update
- **Description:** Admin can update product information
- **OWASP Categories:** A01 (Broken Access Control), A06 (Insecure Design)
- **Risk Level:** HIGH
- **Security Concerns:** Authorization, data integrity, input validation
- **Test Focus:** Verify admin authorization, data integrity checks, input validation, prevent unauthorized modifications

### REQ-026: Product Deletion
- **Description:** Admin can delete products
- **OWASP Categories:** A01 (Broken Access Control), A06 (Insecure Design)
- **Risk Level:** HIGH
- **Security Concerns:** Authorization, data integrity, transaction management
- **Test Focus:** Verify admin authorization, cascading deletion handling, transaction rollback, audit logging

### REQ-027: User Account Management
- **Description:** Users can manage their account settings
- **OWASP Categories:** A01 (Broken Access Control), A07 (Authentication Failures)
- **Risk Level:** HIGH
- **Security Concerns:** Authorization, credential protection, account security
- **Test Focus:** Verify user authorization for own account only, password change validation, email verification, account recovery security

---

## OWASP Top 10 2025 Coverage Summary

| OWASP Category | Requirements | Count | Primary Focus |
|---|---|---|---|
| **A01: Broken Access Control** | REQ-001, 003, 007, 010, 011, 012, 013, 014, 016, 017, 018, 019, 020, 021, 022, 023, 024, 025, 026, 027 | 20 | Access control, authorization enforcement, privilege management |
| **A02: Security Misconfiguration** | REQ-001, 003, 008 | 3 | Proper security configuration, secure defaults |
| **A04: Cryptographic Failures** | REQ-010, 017, 019, 020 | 4 | Data encryption, secure communication, cryptographic key management |
| **A05: Injection** | REQ-004 | 1 | Input validation, SQL injection prevention, parameterized queries |
| **A06: Insecure Design** | REQ-002, 004, 005, 006, 007, 008, 009, 019, 024, 025, 026 | 11 | Business logic, design flaws, threat modeling |
| **A07: Authentication Failures** | REQ-012, 013, 014, 015, 027 | 5 | Authentication mechanisms, credential management, session handling |
| **A10: Mishandling of Exceptional Conditions** | REQ-006 | 1 | Error handling, exception management, graceful degradation |

---

## Risk Level Distribution

- **CRITICAL:** 9 requirements (REQ-013, 014, 015, 016, 019, 020, 021, 022, 023)
- **HIGH:** 12 requirements (REQ-007, 009, 010, 012, 017, 024, 025, 026, 027, and others)
- **MEDIUM:** 4 requirements (REQ-001, 003, 004, 006, 008, 011, 018)
- **LOW:** 2 requirements (REQ-002, 005)

---

## Testing Recommendations

### Critical Priority (Must Test First)
1. **Authentication & Login:** REQ-013, 014, 015, 027
2. **Access Control:** REQ-016, 021, 022, 023
3. **Payments:** REQ-019, 020

### High Priority
4. **Session Management:** REQ-010, 017
5. **Admin Functions:** REQ-024, 025, 026
6. **Data Integrity:** REQ-009

### Medium Priority
7. **Public Access:** REQ-001, 003
8. **Product Management:** REQ-004, 006, 007, 008
9. **Cart Management:** REQ-011, 018

### Low Priority
10. **Basic Functionality:** REQ-002, 005
