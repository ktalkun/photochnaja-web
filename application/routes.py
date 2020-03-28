import os

from flask import render_template

from application import app


@app.context_processor
def context_processor():
    return dict(api_url=os.environ['API_URL'])


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
