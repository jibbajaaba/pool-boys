from fastapi.testclient import TestClient
from queries.pools_queries import PoolQueries
from queries.pool_amenities_queries import PoolAmenitiesQueries
from models.pools import PoolOut
from main import app
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse

client = TestClient(app)


class FakePoolQueries:
    def get_by_poolowner_id(self, id: int, poolowner_id: int):
        return PoolOut(
            picture_url="string",
            address="string",
            description="string",
            hourly_rate=0,
            number_guests=0,
            amenities_ids=[
                2,
                3
            ],
            id=5,
            poolowner_id=1
        )


class FakePoolAmenitiesQueries:
    def get_pool_with_amenities(self, pool_id: int):
        if pool_id == 5:
            return [2, 3]
        return []


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=1,
        username='fake_user'
    )


def test_pool_details():
    app.dependency_overrides[PoolQueries] = FakePoolQueries
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data
    app.dependency_overrides[PoolAmenitiesQueries] = FakePoolAmenitiesQueries

    res = client.get("/api/pools/5")
    assert res.status_code == 200
