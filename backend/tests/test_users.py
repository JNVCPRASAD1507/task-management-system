

def test_get_my_profile(
    client,
    member_user,
    auth_headers,
):
    response = client.get(
        "/users/me",
        headers=auth_headers(member_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == member_user.id
    assert data["email"] == member_user.email
    assert data["full_name"] == member_user.full_name
    assert data["role"] == "member"


def test_get_user_by_id(
    client,
    member_user,
    auth_headers,
):
    response = client.get(
        f"/users/{member_user.id}",
        headers=auth_headers(member_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == member_user.id
    assert data["email"] == member_user.email


def test_get_nonexistent_user(
    client,
    member_user,
    auth_headers,
):
    response = client.get(
        "/users/999999",
        headers=auth_headers(member_user),
    )

    assert response.status_code == 404


def test_admin_can_get_users(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    response = client.get(
        "/users",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 200

    data = response.json()

    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "page_size" in data
    assert "total_pages" in data


def test_member_cannot_get_all_users(
    client,
    member_user,
    auth_headers,
):
    response = client.get(
        "/users",
        headers=auth_headers(member_user),
    )

    assert response.status_code == 403


def test_admin_can_create_user(
    client,
    admin_user,
    auth_headers,
):
    response = client.post(
        "/users",
        headers=auth_headers(admin_user),
        json={
            "full_name": "Created User",
            "email": "created@example.com",
            "password": "Password123",
            "role": "member",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["full_name"] == "Created User"
    assert data["email"] == "created@example.com"
    assert data["role"] == "member"


def test_member_cannot_create_user(
    client,
    member_user,
    auth_headers,
):
    response = client.post(
        "/users",
        headers=auth_headers(member_user),
        json={
            "full_name": "Unauthorized User",
            "email": "unauthorized@example.com",
            "password": "Password123",
            "role": "member",
        },
    )

    assert response.status_code == 403


def test_admin_can_update_user(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    response = client.put(
        f"/users/{member_user.id}",
        headers=auth_headers(admin_user),
        json={
            "full_name": "Updated User",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == member_user.id
    assert data["full_name"] == "Updated User"


def test_admin_can_deactivate_user(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    response = client.put(
        f"/users/{member_user.id}",
        headers=auth_headers(admin_user),
        json={
            "is_active": False,
            "status": "inactive",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["is_active"] is False
    assert data["status"] == "inactive"


def test_admin_can_delete_user(
    client,
    admin_user,
    member_user,
    auth_headers,
):
    response = client.delete(
        f"/users/{member_user.id}",
        headers=auth_headers(admin_user),
    )

    assert response.status_code == 204
    
    