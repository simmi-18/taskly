from flask import Blueprint
from .auth_routes import auth_bp
from .task_routes import task_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(task_bp, url_prefix="/tasks")