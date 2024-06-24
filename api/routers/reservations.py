from fastapi import Depends, APIRouter, HTTPException
from models.reservations import ReservationIn, ReservationOut
from utils.authentication import try_get_jwt_user_data
from models.users import UserResponse
from queries.reservations_queries import ReservationQueries

router = APIRouter()


@router.post("/api/reservations")
def create_reservations(
    new_reservation: ReservationIn,
    user: UserResponse = Depends(try_get_jwt_user_data),
    reservation_queries: ReservationQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401, detail="Must be logged in to create reservation"
            )
    reservation = reservation_queries.create_reservation(
        new_reservation=new_reservation,
        user_id=user.id,
        )
    return reservation


@router.get("/api/reservations", response_model=list[ReservationOut])
def get_all_reservations(
    user: UserResponse = Depends(try_get_jwt_user_data),
    reservation_queries: ReservationQueries = Depends()
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    reservations = reservation_queries.get_all_reservations()
    if not reservations:
        raise HTTPException(
                status_code=404, detail="No reservations found")
    return reservations


@router.get("/api/reservations/{id}", response_model=ReservationOut)
def get_reservations_by_id(
    id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    reservation_queries: ReservationQueries = Depends()
):
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    reservation = reservation_queries.get_reservation_by_id(
        id=id,
        user_id=user.id
    )
    if not reservation:
        raise HTTPException(
            status_code=404, detail="reservation not found")
    return reservation


@router.delete("/api/reservations/{id}")
def reservation_delete(
    id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    reservation_queries: ReservationQueries = Depends()
):
    if not user:
        raise HTTPException(
            status_code=401, detail="You are not authorized"
        )
    return {
        "success": reservation_queries.delete_reservation(
            id=id,
            user_id=user.id
            )
    }


@router.get(
        "/api/pools/{pool_id}/reservations",
        response_model=list[ReservationOut]
    )
def get_reservations_by_pool(
    pool_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    reservation_queries: ReservationQueries = Depends()
):
    """
    Retrieve all reservations
    associated with a specific pool, identified by pool_id.
    """
    reservations = reservation_queries.get_reservation_by_pool_id(
        pool_id=pool_id
        )
    if not user:
        raise HTTPException(
            status_code=401, detail="You are not authorized"
        )
    if reservations is None:
        reservations = []
    return reservations
