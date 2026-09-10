
# Task Management System - Test Cases

## 1. Authentication Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| AUTH-001 | Register valid user | 201 Created |
| AUTH-002 | Register duplicate email | 409 Conflict |
| AUTH-003 | Register invalid password | 422 Validation Error |
| AUTH-004 | Login valid credentials | 200 OK |
| AUTH-005 | Login invalid password | 401 Unauthorized |
| AUTH-006 | Login nonexistent user | 401 Unauthorized |
| AUTH-007 | Access protected API without token | 401/403 |
| AUTH-008 | Access protected API with invalid JWT | 401 Unauthorized |

---

# 2. User Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| USER-001 | Get own profile | 200 OK |
| USER-002 | Get user by ID | 200 OK |
| USER-003 | Get nonexistent user | 404 |
| USER-004 | Admin gets users | 200 OK |
| USER-005 | Member gets users | 403 |
| USER-006 | Admin creates user | 201 |
| USER-007 | Member creates user | 403 |
| USER-008 | Admin updates user | 200 |
| USER-009 | Admin deactivates user | 200 |
| USER-010 | Admin deletes user | 204 |

---

# 3. Task Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| TASK-001 | Admin creates task | 201 |
| TASK-002 | Manager creates task | 201 |
| TASK-003 | Member creates task | 403 |
| TASK-004 | Get task list | 200 |
| TASK-005 | Get task by ID | 200 |
| TASK-006 | Get nonexistent task | 404 |
| TASK-007 | Update task | 200 |
| TASK-008 | Filter by status | 200 |
| TASK-009 | Filter by priority | 200 |
| TASK-010 | Delete task | 204 |
| TASK-011 | Assign task to valid user | 201 |
| TASK-012 | Assign task to nonexistent user | 404 |

---

# 4. Comment Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| COMMENT-001 | Create comment | 201 |
| COMMENT-002 | Get task comments | 200 |
| COMMENT-003 | Get comment | 200 |
| COMMENT-004 | Update own comment | 200 |
| COMMENT-005 | Update another user's comment | 403 |
| COMMENT-006 | Delete own comment | 204 |
| COMMENT-007 | Comment on nonexistent task | 404 |

---

# 5. Dashboard Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| DASH-001 | Get dashboard | 200 |
| DASH-002 | Verify task statistics | Correct counts |
| DASH-003 | Verify user statistics | Correct counts |
| DASH-004 | Verify overdue tasks | Correct count |
| DASH-005 | Verify assigned task count | Correct count |
| DASH-006 | Verify recent tasks | Maximum 5 tasks |

---

# 6. Notification Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| NOTIF-001 | Get notifications | 200 |
| NOTIF-002 | Get unread notifications | 200 |
| NOTIF-003 | Get notification by ID | 200 |
| NOTIF-004 | Mark notification read | 200 |
| NOTIF-005 | Mark all notifications read | 204 |
| NOTIF-006 | Delete notification | 204 |

---

# 7. Attachment Test Cases

| ID | Test Case | Expected Result |
|---|---|---|
| ATT-001 | Get task attachments | 200 |
| ATT-002 | Upload attachment | 201 |
| ATT-003 | Delete own attachment | 204 |
| ATT-004 | Delete another user's attachment | 403 |
| ATT-005 | Upload to nonexistent task | 404 |

---

# 8. Authorization Test Cases

| ID | Role | Operation | Expected |
|---|---|---|---|
| RBAC-001 | Admin | Create user | Allowed |
| RBAC-002 | Admin | Delete user | Allowed |
| RBAC-003 | Manager | Create task | Allowed |
| RBAC-004 | Manager | Delete task | Allowed |
| RBAC-005 | Member | Create task | Forbidden |
| RBAC-006 | Member | View tasks | Allowed |
| RBAC-007 | Member | Create comment | Allowed |
| RBAC-008 | Member | Update own comment | Allowed |
| RBAC-009 | Member | Update another user's comment | Forbidden |

---

# 9. Validation Test Cases

| ID | Test Case | Expected |
|---|---|---|
| VAL-001 | Invalid email | 422 |
| VAL-002 | Password shorter than 8 characters | 422 |
| VAL-003 | Empty task title | 422 |
| VAL-004 | Invalid task priority | 422 |
| VAL-005 | Invalid task status | 422 |
| VAL-006 | Invalid pagination page | 422 |
| VAL-007 | Page size greater than 100 | 422 |

---

# 10. Health Test Cases

| ID | Endpoint | Expected |
|---|---|---|
| HEALTH-001 | GET / | 200 |
| HEALTH-002 | GET /health | 200 |
| HEALTH-003 | GET /docs | 200 |
| HEALTH-004 | GET /redoc | 200 |

---

# 11. Automated Test Command

Run all tests:

```bash
pytest

