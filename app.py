from flask import Flask, render_template, session
from boggle import generate_board

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    board = generate_board()
    session['board'] = board
    return render_template('index.html', board=board)