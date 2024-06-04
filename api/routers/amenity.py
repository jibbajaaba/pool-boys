from fastapi import Depends, APIRouter
from models.amenity import AmenityOut
from queries.amenity_queries import AmenitiesQueries


router = APIRouter()


@router.get("/api/amenities", response_model=list[AmenityOut])
def get_all_amenities(
    amenity_queries: AmenitiesQueries = Depends()
):
    return amenity_queries.get_all()


@router.get("/api/amenities/{id}", response_model=AmenityOut)
def get_amenity(
    id: int,
    amenity_queries: AmenitiesQueries = Depends()
):
    return amenity_queries.get_amenities_id(id)
