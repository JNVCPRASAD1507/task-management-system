

def create_test_task(
    client,
    admin_user,
    auth_headers,
):
    response = client.post(
        "/tasks",
        headers=auth_headers(admin_user),
        json={
            "title": "Comment Test Task",
            "description": "Task for comment testing",
            "priority": "medium",
        },
    )

    assert response.status_code == 201

    return response.json()["id"]


def test_create_comment(
    client,
    admin_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    response = client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "This is a test comment.",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["content"] == "This is a test comment."
    assert data["task_id"] == task_id
    assert data["user_id"] == admin_user.id


def test_get_task_comments(
    client,
    admin_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "First comment",
        },
    )

    response = client.get(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert "items" in data
    assert data["total"] >= 1


def test_get_comment_by_id(
    client,
    admin_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    create_response = client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "Find this comment",
        },
    )

    comment_id = create_response.json()["id"]

    response = client.get(
        f"/comments/{comment_id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == comment_id
    assert data["content"] == "Find this comment"


def test_update_own_comment(
    client,
    admin_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    create_response = client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "Original comment",
        },
    )

    comment_id = create_response.json()["id"]

    response = client.put(
        f"/comments/{comment_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "Updated comment",
        },
    )

    assert response.status_code == 200

    assert response.json()["content"] == "Updated comment"


def test_user_cannot_update_other_users_comment(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    create_response = client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "Admin comment",
        },
    )

    comment_id = create_response.json()["id"]

    response = client.put(
        f"/comments/{comment_id}",
        headers=auth_headers(member_user),
        json={
            "content": "Trying to change admin comment",
        },
    )

    assert response.status_code == 403


def test_delete_own_comment(
    client,
    admin_user,
    auth_headers,
):
    task_id = create_test_task(
        client,
        admin_user,
        auth_headers,
    )

    create_response = client.post(
        f"/comments/task/{task_id}",
        headers=auth_headers(admin_user),
        json={
            "content": "Delete this comment",
        },
    )

    comment_id = create_response.json()["id"]

    response = client.delete(
        f"/comments/{comment_id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 204
    
    