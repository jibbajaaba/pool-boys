
from fastapi import Depends, APIRouter, HTTPException
from models.pools import PoolIn, PoolOut, PoolOutWithAmenityIds
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from queries.pools_queries import PoolQueries
from queries.pool_amenities_queries import PoolAmenitiesQueries
from queries.amenity_queries import AmenitiesQueries


router = APIRouter()


@router.post("/api/pools", response_model=PoolOut)
def create_pools(
    new_pool: PoolIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends(),
    amenities_queries: AmenitiesQueries = Depends(),
    pool_amenities_queries: PoolAmenitiesQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create pool"
            )
    for amenity_id in new_pool.amenities_ids:
        if amenities_queries.get_amenities_id(amenity_id) is None:
            raise HTTPException(
                status_code=404, detail="amenity not found")
    pool = queries.create_pool(new_pool=new_pool, poolowner_id=user.id)
    for amenity_id in new_pool.amenities_ids:
        pool_amenities_queries.create_pool_amenity(
            pool_id=pool.id,
            amenity_id=amenity_id
        )
    return pool


@router.get("/api/pools/{pool_id}")
def get_pools_details(
    pool_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends(),
    pool_amenities_queries: PoolAmenitiesQueries = Depends()
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
    amenities_ids = pool_amenities_queries.get_pool_with_amenities(
        pool_id=pools.id
    )
    return PoolOutWithAmenityIds(
        **pools.dict(),
        amenities_ids=amenities_ids
    )


@router.delete("/api/pools/{pool_id}")
def delete_pool(
    pool_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends()
):
    return {
        "success": queries.delete_pool(pool_id=pool_id, poolowner_id=user.id)
    }


@router.put("/api/pools/{pool_id}", response_model=PoolOutWithAmenityIds)
def update_pool(
    pool_id: int,
    pool_data: PoolIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: PoolQueries = Depends(),
    pool_amenities_queries: PoolAmenitiesQueries = Depends(),
    amenities_queries: AmenitiesQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Must be logged in to update pool"
            )
    for amenity_id in pool_data.amenities_ids:
        if amenities_queries.get_amenities_id(amenity_id) is None:
            raise HTTPException(
                status_code=404,
                detail=f"Amenity {amenity_id} not found"
                )
    updated_pool = queries.update_pool(
        pool_id=pool_id,
        pools=pool_data,
        poolowner_id=user.id
    )
    if not updated_pool:
        raise HTTPException(
            status_code=404,
            detail="Pool not found"
            )
    original_amenity_ids = set(pool_amenities_queries.get_pool_with_amenities(
        pool_id=pool_id
        ))
    new_amenity_ids = set(pool_data.amenities_ids)
    to_add = new_amenity_ids - original_amenity_ids
    to_delete = original_amenity_ids - new_amenity_ids
    for amenity_id in to_delete:
        pool_amenities_queries.delete(pool_id=pool_id, amenity_id=amenity_id)
    for amenity_id in to_add:
        pool_amenities_queries.create_pool_amenity(
            pool_id=pool_id,
            amenity_id=amenity_id
            )
    amenities_ids = pool_amenities_queries.get_pool_with_amenities(
        pool_id=pool_id
        )
    return PoolOutWithAmenityIds(
        **updated_pool.dict(),
        amenities_ids=amenities_ids
    )


@router.get("/api/pools", response_model=list[PoolOut])
def get_all_pools(
    user: UserResponse = Depends(try_get_jwt_user_data),
    pool_queries: PoolQueries = Depends()
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return pool_queries.get_all_pools()
