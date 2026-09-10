

def test_get_dashboard(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Dashboard Task",
            "description": "Dashboard test task",
            "priority": "high",
            "assignee_id": member_user.id,
        },
    )

    response = client.get(
        "/dashboard",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert "stats" in data
    assert "recent_tasks" in data

    stats = data["stats"]

    assert "total_tasks" in stats
    assert "todo_tasks" in stats
    assert "in_progress_tasks" in stats
    assert "completed_tasks" in stats
    assert "cancelled_tasks" in stats
    assert "total_users" in stats
    assert "active_users" in stats
    assert "overdue_tasks" in stats
    assert "my_tasks" in stats


def test_dashboard_counts_assigned_tasks(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Member Assigned Task",
            "priority": "medium",
            "assignee_id": member_user.id,
        },
    )

    response = client.get(
        "/dashboard",
        headers=auth_headers(member_user),
    )

    assert response.status_code == 200

    stats = response.json()["stats"]

    assert stats["my_tasks"] >= 1


def test_dashboard_recent_tasks(
    client,
    admin_user,
    auth_headers,
):
    client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Recent Dashboard Task",
            "priority": "urgent",
        },
    )

    response = client.get(
        "/dashboard",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    recent_tasks = response.json()["recent_tasks"]

    assert isinstance(recent_tasks, list)
    assert len(recent_tasks) >= 1

    assert "id" in recent_tasks[0]
    assert "title" in recent_tasks[0]
    assert "status" in recent_tasks[0]
    assert "priority" in recent_tasks[0]
    
    