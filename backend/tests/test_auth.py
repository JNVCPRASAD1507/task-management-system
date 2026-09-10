

def test_register_user(client):
    payload = {
        "full_name": "John Doe",
        "email": "john@example.com",
        "password": "Password123",
    }

    response = client.post(
        "/auth/register",
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"

    assert data["user"]["full_name"] == "John Doe"
    assert data["user"]["email"] == "john@example.com"
    assert data["user"]["role"] == "member"
    assert data["user"]["is_active"] is True


def test_register_duplicate_email(client):
    payload = {
        "full_name": "John Doe",
        "email": "duplicate@example.com",
        "password": "Password123",
    }

    first_response = client.post(
        "/auth/register",
        json=payload,
    )

    assert first_response.status_code == 201

    second_response = client.post(
        "/auth/register",
        json=payload,
    )

    assert second_response.status_code == 409

    assert (
        second_response.json()["detail"]
        == "A user with this email already exists"
    )


def test_login_success(client):
    register_payload = {
        "full_name": "Login User",
        "email": "login@example.com",
        "password": "Password123",
    }

    register_response = client.post(
        "/auth/register",
        json=register_payload,
    )

    assert register_response.status_code == 201

    login_response = client.post(
        "/auth/login",
        json={
            "email": "login@example.com",
            "password": "Password123",
        },
    )

    assert login_response.status_code == 200

    data = login_response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "login@example.com"


def test_login_invalid_password(client):
    client.post(
        "/auth/register",
        json={
            "full_name": "Invalid Login",
            "email": "invalid-login@example.com",
            "password": "Password123",
        },
    )

    response = client.post(
        "/auth/login",
        json={
            "email": "invalid-login@example.com",
            "password": "WrongPassword123",
        },
    )

    assert response.status_code == 401

    assert response.json()["detail"] == "Invalid email or password"


def test_login_nonexistent_user(client):
    response = client.post(
        "/auth/login",
        json={
            "email": "doesnotexist@example.com",
            "password": "Password123",
        },
    )

    assert response.status_code == 401

    assert response.json()["detail"] == "Invalid email or password"


def test_register_invalid_password(client):
    response = client.post(
        "/auth/register",
        json={
            "full_name": "Short Password",
            "email": "short@example.com",
            "password": "123",
        },
    )

    assert response.status_code == 422


def test_protected_endpoint_without_token(client):
    response = client.get("/users/me")

    assert response.status_code in [401, 403]
    
    