from fastapi.testclient import TestClient
from queries.reservations_queries import ReservationQueries
from main import app
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse

client = TestClient(app)


class FakeReservationQueries:
    def get_all_reservations(self):
        return [
            {
                "id": 2,
                "start_time": "2024-06-10T19:09:08.662000",
                "end_time": "2024-06-10T19:09:08.662000",
                "pool_id": 1,
                "user_id": 1
            }
        ]


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        username='fake_user'
    )


def test_get_all_reservations():
    app.dependency_overrides[ReservationQueries] = FakeReservationQueries
    app.dependency_overrides[
        try_get_jwt_user_data
        ] = fake_try_get_jwt_user_data
    res = client.get("/api/reservations")
    data = res.json()
    assert res.status_code == 200
    assert len(data) == 1