

from datetime import date, timedelta


def test_create_task_as_admin(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Build dashboard",
            "description": "Create the dashboard UI",
            "priority": "high",
            "due_date": str(date.today() + timedelta(days=7)),
            "assignee_id": member_user.id,
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Build dashboard"
    assert data["description"] == "Create the dashboard UI"
    assert data["priority"] == "high"
    assert data["status"] == "todo"
    assert data["assignee_id"] == member_user.id
    assert data["created_by"] == admin_user.id


def test_create_task_as_manager(
    client,
    manager_user,
    member_user,
    auth_headers,
):
    response = client.post(
        "/tasks",
        headers=auth_headers(manager_user),
        json={
            "title": "Manager Task",
            "description": "Created by manager",
            "priority": "medium",
            "assignee_id": member_user.id,
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Manager Task"
    assert data["created_by"] == manager_user.id


def test_member_cannot_create_task(
    client,
    member_user,
    auth_headers,
):
    response = client.post(
        "/tasks",
        headers=auth_headers(member_user),
        json={
            "title": "Unauthorized Task",
            "priority": "low",
        },
    )

    assert response.status_code == 403


def test_get_tasks(
    client,
    admin_user,
    auth_headers,
):
    client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Task One",
            "priority": "low",
        },
    )

    response = client.get(
        "/tasks",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert "items" in data
    assert "total" in data
    assert data["total"] >= 1


def test_get_task_by_id(
    client,
    admin_user,
    auth_headers,
):
    create_response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Get Task",
            "priority": "medium",
        },
    )

    task_id = create_response.json()["id"]

    response = client.get(
        f"/tasks/{task_id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == task_id
    assert data["title"] == "Get Task"


def test_get_nonexistent_task(
    client,
    admin_user,
    auth_headers,
):
    response = client.get(
        "/tasks/999999",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 404


def test_update_task(
    client,
    admin_user,
    auth_headers,
):
    create_response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Original Task",
            "priority": "low",
        },
    )

    task_id = create_response.json()["id"]

    response = client.put(
        f"/tasks/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "title": "Updated Task",
            "status": "in_progress",
            "priority": "high",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Updated Task"
    assert data["status"] == "in_progress"
    assert data["priority"] == "high"


def test_filter_tasks_by_status(
    client,
    admin_user,
    auth_headers,
):
    create_response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Filter Task",
            "priority": "medium",
        },
    )

    task_id = create_response.json()["id"]

    client.put(
        f"/tasks/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "status": "completed",
        },
    )

    response = client.get(
        "/tasks?status=completed",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    for task in data["items"]:
        assert task["status"] == "completed"


def test_delete_task(
    client,
    admin_user,
    auth_headers,
):
    create_response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Delete Task",
            "priority": "low",
        },
    )

    task_id = create_response.json()["id"]

    response = client.delete(
        f"/tasks/{task_id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 204

    get_response = client.get(
        f"/tasks/{task_id}",
        headers=auth_headers(admin_user),
    )

    assert get_response.status_code == 404
    
    