
from fastapi import Depends, APIRouter, HTTPException
from models.pools import PoolIn, PoolOut, GetPools
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from queries.pools_queries import PoolQueries


router = APIRouter()


@router.post("/api/pools")
def create_pools(
    new_pool: PoolIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create pool"
            )
    return queries.create_pool(new_pool=new_pool, poolowner_id=user.id)


@router.get("/api/pools/{pool_id}")
def get_pools_details(
    pool_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create pool"
            )
    pools = queries.get_by_poolowner_id(
        id=pool_id,
        poolowner_id=user.id
    )
    if not pools:
        raise HTTPException(
            status_code=404, detail="pool not found")
    return pools


@router.delete("/api/pools/{pool_id}")
def delete_pool(
    pool_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends()
):
    return {
        "success": queries.delete_pool(pool_id=pool_id, poolowner_id=user.id)
    }


@router.put("/api/pools/{pool_id}", response_model=PoolOut)
def update_pool(
    pool_id: int,
    pool_data: PoolIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends()
):
    try:
        updated_pool = queries.update_pool(
            pool_id=pool_id,
            pools=pool_data,
            poolowner_id=user.id
        )
        if not updated_pool:
            raise HTTPException(status_code=404)
        return updated_pool
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/api/pools/", response_model=list[GetPools])
def get_all_pools(
    user: UserResponse = Depends(try_get_jwt_user_data),
    pool_queries: PoolQueries = Depends()
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return pool_queries.get_all_pools()
