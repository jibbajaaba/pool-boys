from fastapi import Depends, APIRouter, HTTPException
from models.reservations import ReservationIn
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse

router = APIRouter()


@router.post("/api/reservations/")
def create_reservations(
    new_reservation: ReservationIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create reservation"
            )
    return new_reservation
