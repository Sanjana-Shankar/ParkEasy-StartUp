from fastapi import APIRouter
from datetime import datetime
from typing import List
router = APIRouter(prefix="/api/notifs", tags=["notifs"])

@router.get("")
def get_notifications():
    # load all notifications from database
    return []


@router.post("/read")
def mark_notifications_read(notification_ids: List[int]):
    # mark notifications as read in database
    return {"status": "updated", "ids": notification_ids}
