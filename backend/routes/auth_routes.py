from flask import Blueprint, request, jsonify
from controller.auth_controller import register_user, login_user , get_user
from flask_jwt_extended import jwt_required

auth_bp = Blueprint("auth_bp", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    response, status = register_user(data)
    return jsonify(response), status


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    response, status = login_user(data)
    return jsonify(response), status


# GET_USER
@auth_bp.route("", methods=["GET" , "OPTIONS"])
@jwt_required(optional=True)
def user():
    if request.method == "OPTIONS":
        return {}, 200
    # data = request.get_json()
    response, status = get_user()
    return jsonify(response), status


