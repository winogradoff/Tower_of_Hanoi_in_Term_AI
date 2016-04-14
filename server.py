from flask import Flask, render_template
import json

app = Flask(__name__)
game = None


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get_game_state")
def get_game_state():
    return json.dumps({
        "status": game.status,
        "board": game.pyramids
    })


def run(game_instance):
    global game
    game = game_instance
    app.run()
