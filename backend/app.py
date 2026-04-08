from flask import Flask
from extensions import db , jwt
from flask_cors import CORS
from config import Config
from routes import register_routes
from flask_migrate import Migrate
import os

migrate = Migrate()
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # CORS(app)
    CORS(app,
        resources={r"/*": {"origins": "http://localhost:1717", "http://taskly-indol-tau.vercel.app"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    register_routes(app)
    return app

app = create_app()


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 1616))
    app.run(host="0.0.0.0", port=port)