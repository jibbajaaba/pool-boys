
from fastapi import Depends, APIRouter, HTTPException
from models.pools import PoolIn
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data

router = APIRouter()


@router.post("/api/pools")
def create_pools(
    new_pool: PoolIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create pool"
            )
