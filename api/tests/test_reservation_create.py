from fastapi.testclient import TestClient
from main import app
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse
from queries.reservations_queries import ReservationQueries
from models.reservations import ReservationIn


client = TestClient(app)


class FakeReservationQueries:
    def create_reservation(
            self,
            new_reservation: ReservationIn,
            user_id: int
    ):
        return {
                "id": 1,
                "pool_id": new_reservation.pool_id,
                "start_time": "2024-06-10T19:28:26.185Z",
                "end_time": "2024-06-10T19:28:26.185Z",
                "user_id": user_id
            }


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        username='fake_user'
    )


def test_create_reservations():
    # Arrange
    app.dependency_overrides[ReservationQueries] = FakeReservationQueries
    app.dependency_overrides[
        try_get_jwt_user_data
        ] = fake_try_get_jwt_user_data
    # Act
    body = {
        "pool_id": 1,
        "start_time": "2024-06-10T19:28:26.185Z",
        "end_time": "2024-06-10T19:28:26.185Z",
    }
    result = client.post("/api/reservations", json=body)
    data = result.json()
    # Assert
    assert result.status_code == 200
    assert data == {
        "id": 1,
        "pool_id": 1,
        "start_time": "2024-06-10T19:28:26.185Z",
        "end_time": "2024-06-10T19:28:26.185Z",
        "user_id": 1
    }
