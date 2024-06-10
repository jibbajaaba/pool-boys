from fastapi.testclient import TestClient
from queries.pools_queries import PoolQueries
from main import app
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse


client = TestClient(app)


class FakePoolQueries:
    def get_all_pools(self):
        return [
            {
                "id": 1,
                "poolowner_id": 1,
                "picture_url": "string",
                "address": "string",
                "description": "string",
                "hourly_rate": 0,
                "number_guests": 0
            }
        ]


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        username='fake_user'
    )


def test_pools():
    # arrange
    app.dependency_overrides[PoolQueries] = FakePoolQueries
    app.dependency_overrides[
        try_get_jwt_user_data
        ] = fake_try_get_jwt_user_data

    # act
    res = client.get("/api/pools")
    data = res.json()

    # assert
    assert res.status_code == 200
    assert len(data) == 1


def test_pool_details():
    # arrange

    # act

    # assert
    pass
