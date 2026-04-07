from flask import Blueprint, request, jsonify
from controller.task_controller import (
    create_task,
    get_tasks_for_user,
    update_task,
    delete_task,
    update_toggle
)
from flask_jwt_extended import jwt_required


task_bp = Blueprint("task_bp", __name__)

# CREATE TASK
@task_bp.route("/create", methods=["POST"])
@jwt_required()
def create():
    data = request.get_json()
    response, status = create_task(data)
    return jsonify(response), status


# GET TASKS FOR USER
@task_bp.route("", methods=["GET", "OPTIONS"])
@jwt_required(optional=True)
def get_tasks():
    if request.method == "OPTIONS":
        return {}, 200
    response, status = get_tasks_for_user()
    return jsonify(response), status


# UPDATE TASK
@task_bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update(id):
    data = request.get_json()
    response, status = update_task(id,data)
    return jsonify(response), status


# UPDATE TASK TOGGLE
@task_bp.route("/update-toggle/<int:id>", methods=["PUT", "OPTIONS"])
@jwt_required(optional=True)
def toggle(id):
    if request.method == "OPTIONS":
        return {}, 200
    data = request.get_json()
    response, status = update_toggle(id,data)
    return jsonify(response), status

# DELETE TASK
@task_bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete(id):
    response, status = delete_task(id)
    return jsonify(response), status