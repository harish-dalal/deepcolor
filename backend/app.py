from urllib import response
import re
from flask import Flask, render_template, request, flash, redirect, jsonify, send_file
import requests
import os
import base64
from io import BytesIO
from binascii import a2b_base64
from PIL import Image
import random
import numpy as np
from flask_cors import CORS, cross_origin
import cv2
import matplotlib.pyplot as plt
from skimage.color import rgb2lab, lab2rgb, rgb2gray, xyz2lab

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route("/")
def hello():
    return {"data" : "backend"}

@app.route('/upload',methods=['POST'])
def upload():

    image = re.sub('^data:image/.+;base64,', '', request.json['imageBase64'])

    im = Image.open(BytesIO(base64.b64decode(image)))   

    image_chosen = cv2.resize(np.array(im) , (320 , 320))
    image_gray = rgb2gray(image_chosen).reshape(320,320,1)
    imaget = np.array(image_gray)


    # data = imaget.
    # Image.fromarray(np.array(im)).save('input.png')

    data = np.array(imaget).astype(np.float64).reshape(-1, 320, 320, 1)

    np.set_printoptions(threshold=np.inf)       
    json_request = '{{ "instances" : {} }}'.format(np.array2string(data, separator=',', formatter={'float':lambda x: "%.1f" % x}))
    resp = requests.post('http://localhost:8501/v1/models/colorization:predict', data=json_request)
    print('response.status_code: {}'.format(resp.status_code))  

    outputBase64 = base64.b64encode(resp.content)  
    # print(resp.json()) 

    # print('response.content: {}'.format(resp.content))

    # outimage = Image.fromarray(resp.content)
    # print(resp)

    I = cv2.normalize(np.array(resp.json()['predictions']).reshape(320,320,3), None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)
    # print(I)
    print(type(I))
    print(I.shape)
    img = Image.fromarray(I , 'RGB')
    img.save('out.png')

    # arr = np.array(resp.json()['predictions'][0])
    # print(arr.shape)
    # im = Image.fromarray(arr.astype("float"))
    # #im.show()  # uncomment to look at the image
    # rawBytes = BytesIO()
    # im.save(rawBytes, "PNG")
    # rawBytes.seek(0)  # return to the start of the file
    # outputBase64 = (base64.b64encode(rawBytes.read()))

    # return jsonify(resp)
    # return resp.json()
    return jsonify({'status':str(outputBase64)})



    # jpeg_bytes = request.json['imageBase64']
    # predict_request = '{"instances" : [{"b64": "%s"}]}' % jpeg_bytes
    # response = requests.post('http://localhost:8501/v1/models/colorization:predict', predict_request)
    # response.raise_for_status()
    # prediction = response.json()['predictions'][0]
    return "Worked Finally!!!"

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5001,debug=True)