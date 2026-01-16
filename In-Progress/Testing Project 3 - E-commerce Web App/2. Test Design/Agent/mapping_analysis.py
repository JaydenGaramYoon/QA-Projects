"""
OWASP Top 10 - Requirements Mapping Analysis

Based on:
1. Requirements extracted from UniStyle Requirement Traceability Matrix
2. OWASP Top 10 2025 documentation analysis

Requirements to OWASP Mapping:
"""

requirements_mapping = {
    # Authentication & Authorization (OWASP A01, A07)
    "REQ-014": {  # Valid Login
        "name": "Valid Login",
        "owasp": ["A07", "A01"],
        "description": "Users can log in with valid credentials",
        "risk_area": "Authentication & Authorization",
        "risk_level": "CRITICAL",
        "test_focus": "Credential validation, session management, token generation"
    },
    "REQ-015": {  # Invalid Login Handling
        "name": "Invalid Login Handling",
        "owasp": ["A07"],
        "description": "Invalid login attempts are properly handled",
        "risk_area": "Authentication & Authorization",
        "risk_level": "CRITICAL",
        "test_focus": "Brute force protection, error messages, rate limiting"
    },
    "REQ-013": {  # Login Redirect
        "name": "Login Redirect",
        "owasp": ["A07", "A01"],
        "description": "User is redirected to login when accessing protected resources",
        "risk_area": "Authentication & Authorization",
        "risk_level": "CRITICAL",
        "test_focus": "Access control, authentication verification, session validation"
    },
    "REQ-016": {  # Protected Page Redirect
        "name": "Protected Page Redirect",
        "owasp": ["A01"],
        "description": "Protected pages redirect to login for unauthorized users",
        "risk_area": "Broken Access Control",
        "risk_level": "CRITICAL",
        "test_focus": "Authorization checks, access enforcement"
    },
    
    # Admin Access Control (OWASP A01)
    "REQ-022": {  # Admin Portal Access
        "name": "Admin Portal Access",
        "owasp": ["A01"],
        "description": "Authorized admins can access admin portal",
        "risk_area": "Broken Access Control",
        "risk_level": "CRITICAL",
        "test_focus": "Role-based access control, privilege verification"
    },
    "REQ-023": {  # Admin Access Restriction
        "name": "Admin Access Restriction",
        "owasp": ["A01"],
        "description": "Non-admin users cannot access admin functions",
        "risk_area": "Broken Access Control",
        "risk_level": "CRITICAL",
        "test_focus": "Access denial, privilege elevation prevention"
    },
    
    # Product Management (OWASP A01, A06, A02)
    "REQ-024": {  # Product Creation
        "name": "Product Creation",
        "owasp": ["A01", "A06"],
        "description": "Admin can create new products",
        "risk_area": "Access Control & Business Logic",
        "risk_level": "HIGH",
        "test_focus": "Authorization, input validation, business logic"
    },
    "REQ-025": {  # Product Update
        "name": "Product Update",
        "owasp": ["A01", "A06"],
        "description": "Admin can update product information",
        "risk_area": "Access Control & Business Logic",
        "risk_level": "HIGH",
        "test_focus": "Authorization, data integrity, input validation"
    },
    "REQ-026": {  # Product Deletion
        "name": "Product Deletion",
        "owasp": ["A01", "A06"],
        "description": "Admin can delete products",
        "risk_area": "Access Control & Business Logic",
        "risk_level": "HIGH",
        "test_focus": "Authorization, data integrity, transaction management"
    },
    
    # Cart & Session Management (OWASP A01, A04)
    "REQ-010": {  # Temporary Cart Storage
        "name": "Temporary Cart Storage",
        "owasp": ["A01", "A04"],
        "description": "Anonymous users' cart data is stored temporarily",
        "risk_area": "Session Management & Cryptography",
        "risk_level": "HIGH",
        "test_focus": "Session storage, data encryption, confidentiality"
    },
    "REQ-011": {  # Temporary Cart Retention
        "name": "Temporary Cart Retention",
        "owasp": ["A01"],
        "description": "Temporary cart data is retained until customer login",
        "risk_area": "Session Management",
        "risk_level": "MEDIUM",
        "test_focus": "Session timeout, data retention policies"
    },
    "REQ-017": {  # Cart Persistence
        "name": "Cart Persistence",
        "owasp": ["A01", "A04"],
        "description": "Logged-in user cart persists across sessions",
        "risk_area": "Session Management & Data Protection",
        "risk_level": "HIGH",
        "test_focus": "Data encryption, session security, access control"
    },
    "REQ-018": {  # Cart Restore
        "name": "Cart Restore",
        "owasp": ["A01"],
        "description": "Temporary cart is restored to user's persistent cart",
        "risk_area": "Access Control & Data Integrity",
        "risk_level": "MEDIUM",
        "test_focus": "Data merge, transaction integrity"
    },
    
    # Payment & Transactions (OWASP A01, A04, A06)
    "REQ-019": {  # Checkout Processing
        "name": "Checkout Processing",
        "owasp": ["A01", "A04", "A06"],
        "description": "System processes checkout and payment",
        "risk_area": "Payment Processing & Security",
        "risk_level": "CRITICAL",
        "test_focus": "Payment verification, encryption, authorization, fraud prevention"
    },
    "REQ-020": {  # Order Confirmation
        "name": "Order Confirmation",
        "owasp": ["A01", "A04"],
        "description": "Order confirmation is provided after successful payment",
        "risk_area": "Transaction Integrity & Access Control",
        "risk_level": "CRITICAL",
        "test_focus": "Data integrity, authorization, email security"
    },
    
    # Order Management (OWASP A01)
    "REQ-021": {  # Order Tracking View
        "name": "Order Tracking View",
        "owasp": ["A01"],
        "description": "Users can only view their own orders",
        "risk_area": "Broken Access Control",
        "risk_level": "CRITICAL",
        "test_focus": "Authorization, object-level access control, data filtering"
    },
    
    # User Account Management (OWASP A07, A01, A04)
    "REQ-012": {  # Customer Home Access
        "name": "Customer Home Access",
        "owasp": ["A01", "A07"],
        "description": "Authenticated customers can access their home page",
        "risk_area": "Authentication & Access Control",
        "risk_level": "HIGH",
        "test_focus": "Authentication verification, session validation"
    },
    "REQ-027": {  # User Account Management
        "name": "User Account Management",
        "owasp": ["A07", "A01"],
        "description": "Users can manage their account settings",
        "risk_area": "Authentication & Access Control",
        "risk_level": "HIGH",
        "test_focus": "Authorization, profile updates, credential protection"
    },
    
    # Public Access & Navigation (OWASP A01, A02)
    "REQ-001": {  # Homepage Access
        "name": "Homepage Access",
        "owasp": ["A01", "A02"],
        "description": "Homepage is accessible to all users",
        "risk_area": "Access Control & Configuration",
        "risk_level": "MEDIUM",
        "test_focus": "Public resource access, proper configuration"
    },
    "REQ-002": {  # Logo Redirect
        "name": "Logo Redirect",
        "owasp": ["A06"],
        "description": "Logo click redirects to homepage",
        "risk_area": "Business Logic",
        "risk_level": "LOW",
        "test_focus": "Navigation, functionality"
    },
    "REQ-003": {  # Anonymous Access
        "name": "Anonymous Access",
        "owasp": ["A01", "A02"],
        "description": "Anonymous users can browse without login",
        "risk_area": "Access Control & Configuration",
        "risk_level": "MEDIUM",
        "test_focus": "Public access, proper authorization checks"
    },
    
    # Product Browsing (OWASP A01, A06, A05)
    "REQ-004": {  # Category Filtering
        "name": "Category Filtering",
        "owasp": ["A06", "A05"],
        "description": "Products can be filtered by category",
        "risk_area": "Business Logic & Input Validation",
        "risk_level": "MEDIUM",
        "test_focus": "Input validation, SQL injection prevention, business logic"
    },
    "REQ-005": {  # Clear Category Filter
        "name": "Clear Category Filter",
        "owasp": ["A06"],
        "description": "Category filter can be cleared",
        "risk_area": "Business Logic",
        "risk_level": "LOW",
        "test_focus": "State management, functionality"
    },
    "REQ-006": {  # Empty Category Result
        "name": "Empty Category Result",
        "owasp": ["A06", "A10"],
        "description": "Empty results are handled gracefully",
        "risk_area": "Error Handling & Business Logic",
        "risk_level": "MEDIUM",
        "test_focus": "Exception handling, user feedback"
    },
    "REQ-007": {  # Product Details Access
        "name": "Product Details Access",
        "owasp": ["A01", "A06"],
        "description": "Product details are accessible",
        "risk_area": "Access Control & Business Logic",
        "risk_level": "MEDIUM",
        "test_focus": "Authorization, product access"
    },
    "REQ-008": {  # Product Information Display
        "name": "Product Information Display",
        "owasp": ["A02", "A06"],
        "description": "Product information is correctly displayed",
        "risk_area": "Configuration & Business Logic",
        "risk_level": "MEDIUM",
        "test_focus": "Data accuracy, presentation"
    },
    "REQ-009": {  # Product Data Accuracy
        "name": "Product Data Accuracy",
        "owasp": ["A06"],
        "description": "Product data is accurate and consistent",
        "risk_area": "Data Integrity & Business Logic",
        "risk_level": "HIGH",
        "test_focus": "Data validation, consistency, accuracy"
    },
}

# Group by Risk Area for the final table
risk_groups = {}
for req_id, details in requirements_mapping.items():
    risk_area = details["risk_area"]
    if risk_area not in risk_groups:
        risk_groups[risk_area] = {
            "requirements": [],
            "owasp_items": set(),
            "risk_level": details["risk_level"],
            "test_focus": []
        }
    risk_groups[risk_area]["requirements"].append(req_id)
    risk_groups[risk_area]["owasp_items"].update(details["owasp"])
    risk_groups[risk_area]["test_focus"].append(details["test_focus"])

# Print the consolidated mapping
print("OWASP Top 10 2025 - REQUIREMENTS MAPPING TABLE")
print("=" * 150)
print()

for risk_area in sorted(risk_groups.keys()):
    group = risk_groups[risk_area]
    req_ids = ", ".join(sorted(group["requirements"]))
    owasp_refs = ", ".join(sorted(group["owasp_items"]))
    test_focus = "; ".join(group["test_focus"][:3])  # First 3 focus items
    
    print(f"| {risk_area} | {req_ids} | {group['risk_level']} | OWASP {owasp_refs} | {test_focus} |")
    print()

print("\n" + "=" * 150)
print("DETAILED REQUIREMENTS LISTING")
print("=" * 150)
print()

for i in range(1, 28):
    req_id = f"REQ-{str(i).zfill(3)}"
    if req_id in requirements_mapping:
        req = requirements_mapping[req_id]
        owasp_list = ", ".join([f"[{o}](#OWASP-{o})" for o in sorted(req["owasp"])])
        print(f"{req_id}: {req['name']}")
        print(f"  Description: {req['description']}")
        print(f"  OWASP: {owasp_list}")
        print(f"  Risk Level: {req['risk_level']}")
        print(f"  Test Focus: {req['test_focus']}")
        print()
