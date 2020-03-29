#!/bin/bash

source venv/bin/activate
export API_URL="http://0.0.0.0:8000/"
gunicorn --bind=0.0.0.0:8001 --timeout 600 photochnaja:app