from flask import Flask, render_template, request, flash, redirect, jsonify, send_file
import os
from binascii import a2b_base64
import random
import numpy as np
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route("/")
def hello():
    return {"data" : "backend"}

@app.route('/upload',methods=['GET','POST'])
def upload():
    # print(request.json['imageBase64'])
    return "Worked Finally!!!"

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001,debug=True)