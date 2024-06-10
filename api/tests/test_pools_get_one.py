from fastapi.testclient import TestClient
from queries.pools_queries import PoolQueries
from main import app
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse


client = TestClient(app)


class FakePoolQueries:
    def get_pools_details(self, id: int):
        return [
            {
                "picture_url": "string",
                "address": "string",
                "description": "string",
                "hourly_rate": 0,
                "number_guests": 0,
                "amenities_ids": [
                    2,
                    3
                ],
                "id": 5,
                "poolowner_id": 1
            }
        ]


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        username='fake_user'
    )


def test_pool_details():
    app.dependency_overrides[PoolQueries] = FakePoolQueries
    app.dependency_overrides[
        try_get_jwt_user_data
        ] = fake_try_get_jwt_user_data
    res = client.get("/api/pools/{pool_id}")
    data = res.json()
    assert len(data) == 1
