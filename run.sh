#!/bin/bash

source venv/bin/activate
export API_URL="http://127.0.0.1:5000/"
export FLASK_APP=photochnaja.py
flask run -p 5001