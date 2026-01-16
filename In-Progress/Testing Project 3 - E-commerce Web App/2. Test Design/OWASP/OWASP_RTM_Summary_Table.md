# OWASP Top 10 2025 - Requirements Mapping Summary Table

## Consolidated Risk-Based Mapping Table

| Risk Name | Requirement ID | Risk Level | Reference | Testing Focus |
|-----------|---|---|---|---|
| **Authentication & Authorization Failures** | REQ-013, REQ-014, REQ-015 | CRITICAL | OWASP A01, A07 | Session management, token validation, credential verification, brute force protection, rate limiting |
| **Broken Access Control - Admin Functions** | REQ-022, REQ-023 | CRITICAL | OWASP A01 | Role-based access control, privilege verification, access denial, privilege escalation prevention |
| **Broken Access Control - User Data** | REQ-016, REQ-021 | CRITICAL | OWASP A01 | Authorization checks, object-level access control, forced browsing prevention, data filtering |
| **Payment & Transaction Processing** | REQ-019, REQ-020 | CRITICAL | OWASP A01, A04, A06 | Payment verification, encryption, authorization, fraud prevention, transaction integrity |
| **Session Management & Data Protection** | REQ-010, REQ-017 | HIGH | OWASP A01, A04 | Session storage, data encryption, secure cookies, confidentiality, session isolation |
| **Authentication & Account Management** | REQ-012, REQ-027 | HIGH | OWASP A01, A07 | Authentication verification, session validation, credential protection, account security |
| **Administrative Functions** | REQ-024, REQ-025, REQ-026 | HIGH | OWASP A01, A06 | Authorization, input validation, business logic, data integrity, transaction management |
| **Product Data Integrity** | REQ-009 | HIGH | OWASP A06 | Data validation, consistency verification, accuracy checks |
| **Data Retention & Cart Management** | REQ-011, REQ-018 | MEDIUM | OWASP A01 | Session timeout, data retention policies, transaction consistency |
| **Product Browsing & Filtering** | REQ-001, REQ-003, REQ-004, REQ-007 | MEDIUM | OWASP A01, A02, A05, A06 | Public access verification, input validation, SQL injection prevention, authorization checks |
| **Configuration & Error Handling** | REQ-006, REQ-008 | MEDIUM | OWASP A02, A06, A10 | Exception handling, error messages, configuration verification, graceful degradation |
| **Basic Navigation** | REQ-002, REQ-005 | LOW | OWASP A06 | Navigation functionality, state management, UI correctness |

---

## Requirements by OWASP Category

### OWASP A01: Broken Access Control (20 Requirements)
**Description:** Access control enforces policy such that users cannot act outside of their intended permissions.

- **REQ-001:** Homepage Access - Public resource access control
- **REQ-003:** Anonymous Access - Proper authorization for browsing
- **REQ-007:** Product Details Access - Product-level access control
- **REQ-010:** Temporary Cart Storage - Session-based cart isolation
- **REQ-011:** Temporary Cart Retention - Proper data retention and cleanup
- **REQ-012:** Customer Home Access - Authenticated user access control
- **REQ-013:** Login Redirect - Force authentication for protected resources
- **REQ-014:** Valid Login - Credential validation and session creation
- **REQ-016:** Protected Page Redirect - Enforcement of authorization
- **REQ-017:** Cart Persistence - User-specific cart data protection
- **REQ-018:** Cart Restore - Transaction integrity and data merge
- **REQ-019:** Checkout Processing - Authorization for payment transactions
- **REQ-020:** Order Confirmation - Order ownership verification
- **REQ-021:** Order Tracking View - **CRITICAL** - User can only view own orders
- **REQ-022:** Admin Portal Access - **CRITICAL** - Role-based access to admin functions
- **REQ-023:** Admin Access Restriction - **CRITICAL** - Prevent privilege escalation
- **REQ-024:** Product Creation - Admin authorization for data modifications
- **REQ-025:** Product Update - Admin authorization for data modifications
- **REQ-026:** Product Deletion - Admin authorization for data modifications
- **REQ-027:** User Account Management - User authorization for account settings

### OWASP A02: Security Misconfiguration (3 Requirements)
**Description:** Security misconfiguration occurs when a system is set up incorrectly from a security perspective.

- **REQ-001:** Homepage Access - Verify secure defaults
- **REQ-003:** Anonymous Access - Ensure public/private resource separation
- **REQ-008:** Product Information Display - Proper configuration of data visibility

### OWASP A04: Cryptographic Failures (4 Requirements)
**Description:** Failures related to cryptography, including weak encryption and improper key management.

- **REQ-010:** Temporary Cart Storage - **Encryption of session data**
- **REQ-017:** Cart Persistence - **Encryption of persistent cart data**
- **REQ-019:** Checkout Processing - **TLS/SSL encryption for payment**
- **REQ-020:** Order Confirmation - **Secure transmission of order data**

### OWASP A05: Injection (1 Requirement)
**Description:** Injection flaws, such as SQL injection, occur when untrusted data is sent to an interpreter.

- **REQ-004:** Category Filtering - **Input validation, parameterized queries, SQL injection prevention**

### OWASP A06: Insecure Design (11 Requirements)
**Description:** Design flaws and missing or ineffective security controls in the design phase.

- **REQ-002:** Logo Redirect - Navigation flow correctness
- **REQ-004:** Category Filtering - Input validation and business logic
- **REQ-005:** Clear Category Filter - State management
- **REQ-006:** Empty Category Result - Error handling and exception management
- **REQ-007:** Product Details Access - Authorization design
- **REQ-008:** Product Information Display - Data display correctness
- **REQ-009:** Product Data Accuracy - **Data integrity requirements**
- **REQ-019:** Checkout Processing - Secure payment flow design
- **REQ-024:** Product Creation - Business logic validation
- **REQ-025:** Product Update - Business logic validation
- **REQ-026:** Product Deletion - Business logic and transaction handling

### OWASP A07: Authentication Failures (5 Requirements)
**Description:** Failures related to authentication, including weak credential management and improper session handling.

- **REQ-012:** Customer Home Access - Session validation
- **REQ-013:** Login Redirect - Authentication enforcement
- **REQ-014:** Valid Login - **Credential validation and session creation**
- **REQ-015:** Invalid Login Handling - **Brute force protection and rate limiting**
- **REQ-027:** User Account Management - Credential protection

### OWASP A10: Mishandling of Exceptional Conditions (1 Requirement)
**Description:** Improper error handling and exceptional condition management.

- **REQ-006:** Empty Category Result - Graceful error handling, no sensitive information leakage

---

## Testing Strategy by Risk Level

### CRITICAL PRIORITY (Immediate Testing Required)
```
REQ-013: Login Redirect
  ├─ Test 1: Unauthenticated access to /customer-home redirects to /login
  ├─ Test 2: Unauthenticated access to /admin redirects to /login
  └─ Test 3: Session expiration forces re-authentication

REQ-014: Valid Login
  ├─ Test 1: Valid credentials create session
  ├─ Test 2: Session token is secure (HttpOnly, Secure flags)
  └─ Test 3: Multiple simultaneous sessions handled correctly

REQ-015: Invalid Login Handling
  ├─ Test 1: Invalid credentials return generic error (no user enumeration)
  ├─ Test 2: Rate limiting prevents brute force (e.g., 5 attempts -> lockout)
  └─ Test 3: Account lockout after threshold reached

REQ-016: Protected Page Redirect
  ├─ Test 1: Direct URL access redirects properly
  ├─ Test 2: Forced browsing attempts blocked
  └─ Test 3: No sensitive data in redirect

REQ-019: Checkout Processing
  ├─ Test 1: TLS/SSL enforced (HTTPS only)
  ├─ Test 2: Amount verification before processing
  ├─ Test 3: User authorization verified
  ├─ Test 4: Payment gateway integration secure
  └─ Test 5: PCI compliance measures in place

REQ-020: Order Confirmation
  ├─ Test 1: Order created only after successful payment
  ├─ Test 2: Email confirmation sent securely
  └─ Test 3: No sensitive payment data in confirmation

REQ-021: Order Tracking View
  ├─ Test 1: User can only view own orders
  ├─ Test 2: Parameter tampering test (e.g., order_id=999) blocked
  └─ Test 3: Admin can view all orders

REQ-022: Admin Portal Access
  ├─ Test 1: Non-admin cannot access /admin
  ├─ Test 2: Admin role verified for each action
  └─ Test 3: Session hijacking impossible

REQ-023: Admin Access Restriction
  ├─ Test 1: Privilege escalation attempts blocked
  ├─ Test 2: Role downgrade prevents access to admin functions
  └─ Test 3: Audit logging of privilege attempts
```

### HIGH PRIORITY
```
REQ-007: Product Details Access
  ├─ Test 1: Anonymous user can view product details
  └─ Test 2: Details include sensitive pricing info properly secured

REQ-009: Product Data Accuracy
  ├─ Test 1: Verify database consistency
  ├─ Test 2: Price updates reflected immediately
  └─ Test 3: Concurrent update handling

REQ-010: Temporary Cart Storage
  ├─ Test 1: Cart data encrypted in storage
  ├─ Test 2: Session cookie secure flags set
  └─ Test 3: No cart leakage between users

REQ-012: Customer Home Access
  ├─ Test 1: Authenticated user reaches home page
  └─ Test 2: Session validation on each request

REQ-017: Cart Persistence
  ├─ Test 1: Cart data persists after logout/login
  ├─ Test 2: User A cannot see User B's cart
  └─ Test 3: Encryption in transit and at rest

REQ-024: Product Creation
  ├─ Test 1: Admin authorization required
  ├─ Test 2: Input validation (name, price, description)
  └─ Test 3: XSS prevention in product descriptions

REQ-025: Product Update
  ├─ Test 1: Admin authorization required
  ├─ Test 2: Data integrity checks
  └─ Test 3: Concurrent update handling

REQ-026: Product Deletion
  ├─ Test 1: Admin authorization required
  ├─ Test 2: Cascading delete handling
  └─ Test 3: Transaction rollback on failure

REQ-027: User Account Management
  ├─ Test 1: User can only modify own account
  ├─ Test 2: Password change validation
  └─ Test 3: Email verification for sensitive changes
```

### MEDIUM PRIORITY
```
REQ-001: Homepage Access
  ├─ Test 1: Homepage loads without authentication
  └─ Test 2: No sensitive data exposed

REQ-003: Anonymous Access
  ├─ Test 1: Product listing accessible without login
  └─ Test 2: Product search functional

REQ-004: Category Filtering
  ├─ Test 1: Input validation prevents SQL injection
  ├─ Test 2: Parameterized queries used
  └─ Test 3: XSS prevention in filter parameters

REQ-006: Empty Category Result
  ├─ Test 1: Graceful handling of empty results
  ├─ Test 2: Error messages don't reveal system info
  └─ Test 3: Proper status codes returned

REQ-008: Product Information Display
  ├─ Test 1: Data displayed correctly
  └─ Test 2: No sensitive backend info exposed

REQ-011: Temporary Cart Retention
  ├─ Test 1: Cart retained until login
  └─ Test 2: Cart cleared after timeout

REQ-018: Cart Restore
  ├─ Test 1: Temporary cart merged with persistent cart
  └─ Test 2: No data loss in merge
```

### LOW PRIORITY
```
REQ-002: Logo Redirect
  ├─ Test 1: Logo click navigates to homepage
  └─ Test 2: Works from all pages

REQ-005: Clear Category Filter
  ├─ Test 1: Clear button resets filters
  └─ Test 2: All products displayed after clear
```

---

## Mapping Summary Statistics

- **Total Requirements:** 27
- **CRITICAL Risk Level:** 9 (33%)
- **HIGH Risk Level:** 10 (37%)
- **MEDIUM Risk Level:** 6 (22%)
- **LOW Risk Level:** 2 (7%)

- **OWASP A01 Coverage:** 20 requirements (74%)
- **OWASP A06 Coverage:** 11 requirements (41%)
- **OWASP A07 Coverage:** 5 requirements (19%)
- **OWASP A04 Coverage:** 4 requirements (15%)
- **OWASP A02 Coverage:** 3 requirements (11%)
- **OWASP A05 Coverage:** 1 requirement (4%)
- **OWASP A10 Coverage:** 1 requirement (4%)

---

## Key Testing Insights

1. **Access Control is Critical:** 74% of requirements map to OWASP A01, making authorization testing the top priority.

2. **Authentication is Essential:** 5 critical requirements focus on authentication, including login handling and privilege verification.

3. **Payment Security:** Payment processing (REQ-019, REQ-020) requires encryption, authorization, and fraud prevention testing.

4. **Session Management:** Cart and order data must be encrypted and properly isolated per user.

5. **Input Validation:** Product filtering (REQ-004) requires SQL injection and XSS prevention testing.

6. **Error Handling:** Proper exception handling (REQ-006) prevents information disclosure.

7. **Business Logic:** Product management functions require authorization and data integrity verification.

---

## Compliance Notes

- **PCI DSS:** Applies to REQ-019, REQ-020 (payment processing)
- **GDPR/Privacy:** Applies to REQ-017, REQ-027 (user data handling)
- **Secure by Design:** All requirements should be tested with threat modeling approach
- **Logging & Monitoring:** Should be added to all CRITICAL requirements
