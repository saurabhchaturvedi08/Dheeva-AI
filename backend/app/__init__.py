from flask import Flask
from flask_cors import CORS
from app.utils.db import init_db

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object("instance.config.Config")
    CORS(app)

    init_db(app)

    from app.routes import file, chat, search
    app.register_blueprint(file.bp)
    app.register_blueprint(chat.bp)
    app.register_blueprint(search.bp)

    return app
