from extensions import db, bcrypt
from models  import Users
from flask_jwt_extended import create_access_token , get_jwt_identity

def register_user(data):
    # Check if email exists
    if Users.query.filter_by(email=data["email"]).first():
        return {"error": "Email already exists"}, 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    new_user = Users(email=data["email"], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return {"message": "User created successfully"}, 201


def login_user(data):
    user = Users.query.filter_by(email=data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return {"error": "Invalid email or password"}, 401

    token = create_access_token(identity=str(user.id))

    return {
        "token": token,
        "user": {"id": user.id, "email": user.email}
    }, 200

# GET ALL TASKS FOR USER
def get_user():
    user_id = get_jwt_identity()
    user = Users.query.get(user_id)
    if not user :
        return {"message": "User not found"}, 403

    return {
        "id": user.id,
        "email" : user.email,
        "created_at": user.created_at,
    } , 200
