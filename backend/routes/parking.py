from fastapi import APIRouter
from datetime import datetime
router = APIRouter(prefix="/api/parking", tags=["parking"])

@router.get("/nearby")
# get nearby street (1) + lot(2) parking given location (lat, lng, radius)
# call external parking API [?]
# returns id, location, and results = [avaliable: bool, name: str, ...]
def get_nearby_parking(lat: float, lng: float, radius: int = 1000):
    
    return [
        {"id": 1, "lat": 37.7749, "lng": -122.4194, "results": []}
    ]


@router.get("/garages")
def get_garage_details(lat: float, lng: float):
    # based on location of garage, return garage specific info 
    # info = [capacity_percentage: int, avaliabilty: int, trends: str]
    # will call external garage API [?]
    return []

@router.post("/parked")
def saved_last_parked(lat: float, lng: float, address: str, parked_at_time: datetime, max_mins: int = 0):
    # returns location and time of parking, and sets status of parking to parked
    return {"status": "saved", "location": [lat, lng, address], "time_parked": [parked_at_time, max_mins]}

@router.get("/parked")
def get_last_parked():
    # get parked information from database
    return None # for now

@router.delete("/parked")
def clear_last_parked():
    # clear the last saved parking state
    # delete parking state from database
    return {"status": "cleared"}