from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

tasks = []
id = 1

app = FastAPI()

class TaskIn(BaseModel):
    title: str
    description : Optional[str] = None
    completed : bool = False

class TaskUpdate(BaseModel):
    title : Optional [str] = None
    completed : Optional [str] = None


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tasks")
async def get_tasks():
    return tasks

@app.post("/tasks")
async def create_task(task: TaskIn):
    global id
    new_task = {
        "id" : id,
        "title" : task.title,
        "description" : task.description,
        "completed" : False
    }
    tasks.add(new_task)
    id += 1
    return new_task

@app.delete("/tasks/{id}")
async def delete_task(id : int):
    for task in tasks:
        if task["id"] == id:
            tasks.pop(task)
            return {"message": "Task deleted"}
    return {"error": "Task not found"}, 404


@app.put("/tasks/{id}")
async def update_task(id : int, update : TaskUpdate):
    response = {"messages" : [], "success" : False}
    for task in tasks:
        if task["id"] == id:
            if update.completed is not None:
                task["completed"] = update.completed
                response["messages"].append("Task completion status updated")
            if update.title is not None:
                task["title"] = update.title
                response["messages"].append("Task title updated")

            if not response["messages"]:
                response["messages"].append("No changes made")

            response["success"] = True
            response["task_id"] = id
            return response

    response["messages"].append(f"Task with ID {id} not found")
    return response, 404
 
            

