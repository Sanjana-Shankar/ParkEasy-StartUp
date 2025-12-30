from fastapi import APIRouter

router = APIRouter(prefix="/parking")

@router.get("/")
def get_parking():
    return [
        {"id": 1, "lat": 37.7749, "lng": -122.4194, "available": True}
    ]

