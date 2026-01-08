from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import parking, timers, notifs, auth


app = FastAPI()

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(parking.router)
app.include_router(timers.router)
app.include_router(notifs.router)
app.include_router(auth.router)


# @app.get("/api/health")
# def health_check():
#     return {"status": "ok"}

# @app.get("/api/test")
# def test():
#     return {"message": "FastAPI backend connected!"}
