from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/api/timers", tags=["timers"])


@router.post("")
def start_timer(started_time: datetime, duration_minutes: int):
    # start new parking/garage timer
    # store timer in database
    return {"status": "started", "timer": [started_time, duration_minutes]}



@router.get("")
def get_active_timers():
    # get all active timers from database
    return [] # for now


@router.delete("/{timer_id}")
def cancel_timer(timer_id: int):
    # cancel the timer by ID from database
    return {"status": "cancelled", "timer_id": timer_id}
