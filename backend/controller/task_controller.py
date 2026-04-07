from extensions import db
from models import Task
from flask_jwt_extended import get_jwt_identity

# CREATE TASK
def create_task(data):
    user_id = int(get_jwt_identity())

    if not data:
        return {"message": "Invalid request"}, 400
    new_task = Task(
        user_id=user_id,
        title=data["title"],
        description=data["description"],
        priority=data.get("priority"),
        category=data.get("category"),
    )

    db.session.add(new_task)
    db.session.commit()

    return {"message": "Task created successfully", "task_id": new_task.id}, 201


# GET ALL TASKS FOR USER
def get_tasks_for_user():
    user_id = int(get_jwt_identity())
    
    if not user_id :
        return {"message": "Unauthorized"}, 403
    tasks = Task.query.filter_by(user_id=user_id).all()
    print("Task fro users: ", tasks)
    return [{
        "id": t.id,
        "user_id": t.user_id,
        "title": t.title,
        "description":t.description,
        "priority": t.priority,
        "category": t.category,
        "done": t.done,
        "created_at": t.created_at,
        "updated_at": t.updated_at
    } for t in tasks], 200

# UPDATE TASK
def update_task(id, data):
    user_id = get_jwt_identity()
    task = Task.query.get(id)
  
    if not task:   #or data.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    if "title" in data:
        task.title = data["title"]
    if "description" in data:
        task.description = data["description"]
    if "priority" in data:
        task.priority = data["priority"]
    if "category" in data:
        task.category = data["category"]
    if "done" in data:
        task.done = data["done"]

    db.session.commit()
    return {"message": "Task updated successfully"}, 200

# UPDATE TOGGLE

def update_toggle(id,data):
    user_id = get_jwt_identity()
    task = Task.query.get(id)

    if not task:
        return jsonify({"message" : "Unauthorized"}) , 403

    if "done" in data:
        task.done = data["done"]
    
    db.session.commit()
    return {"message" : "Task toggle updated successfully!!!"} , 200



# DELETE TASK
def delete_task(id):
    user_id = int(get_jwt_identity())
    task = Task.query.get(id)

    if not task or task.user_id != user_id:
        return {"message": "Unauthorized"}, 403
    db.session.delete(task)
    db.session.commit()
    return {"message": "Task deleted successfully"}, 200