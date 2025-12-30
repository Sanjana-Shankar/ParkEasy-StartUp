from sqlalchemy import Column, Integer, Float, Boolean
from database import Base

class ParkingSpot(Base):
    __tablename__ = "parking_spots"
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lng = Column(Float)
    available = Column(Boolean)

    