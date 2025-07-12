from fastapi import FastAPI
from pydantic import BaseModel

tasks = []
id = 1

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tasks")
async def get_tasks():
    return tasks

