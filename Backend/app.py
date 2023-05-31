import json

import keras
import numpy as np
import tensorflow.compat.v2 as tf
from flask import Flask, jsonify, request, Response
from flask_cors import CORS, cross_origin
import cv2
from flask import send_file

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/": {"origins": ""}}

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    file = request.files['video']
    file.save('uploaded_video.mp4')
    splitVideo()
    stance = stance_analyse()
    shot = shot_execution_analyse()
    leg = leg_movement_analyse()

    avarage = round((float(stance[1])+float(shot[1])+float(leg[1]))/3, 2)

    jsonarry = {
        "stancetype": stance,
        "shottype": shot,
        "legtype": leg,
        "avarage": avarage
    }
    print(avarage)

    # convert the dictionary object to a JSON string
    #json_string = json.dumps(my_dict)
    return jsonarry

@app.route('/image', methods=['GET'])
@cross_origin()
def serve_image():
    response = send_file('frame_0.jpg', mimetype='image/jpeg')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
def serve_image():
    response = send_file('frame_1.jpg', mimetype='image/jpeg')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
def serve_image():
    response = send_file('frame_2.jpg', mimetype='image/jpeg')
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
def splitVideo():
    cap = cv2.VideoCapture('uploaded_video.mp4')

    # Set the frame rate to capture 1 frame per second
    fps = cap.get(cv2.CAP_PROP_FPS)
    interval = int(fps)

    # Set the frame counter
    frame_num = 0

    # Capture 3 frames from the video
    while True:
        # Read a frame from the video
        ret, frame = cap.read()

        # Check if the frame was read successfully
        if not ret:
            break

        # Check if the frame is one of the frames we want to capture
        if frame_num % interval == 0:
            # Save the frame as an image
            cv2.imwrite(f'frame_{frame_num}.jpg', frame)

        # Increment the frame counter
        frame_num += 1

        # Stop capturing frames after we have captured 3 frames
        if frame_num == interval * 3:
            break

        # Release the video capture object and close all windows
    cap.release()
    cv2.destroyAllWindows()

splitVideo()

def stance_analyse():
    image = cv2.imread('frame_0.jpg')
    image1 = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = tf.image.resize(image1, (256, 256))
    imagefinal = np.expand_dims(image / 255, 0)
    model = keras.models.load_model('stanceClassifier.keras.h5')
    prediction = model.predict(imagefinal)

    # stancetype = ""

    if prediction > 0.5:
        stancetype = "Incorrect"
        print(f'Incorrect Stance')
    else:
        print(f'Correct Stance')
        stancetype = "Correct"
    print(prediction)
    prediction_f = prediction[0][0]
    num_float = float(prediction_f)
    num_float2 = 100-(num_float * 100)

    rounded_x = round(num_float2, 2)
    print(rounded_x)

    # Serialize float to JSON
    json_data = json.dumps(rounded_x)

    result = []
    result.append(stancetype)
    result.append(json_data)
    print(result)
    # return stancetype,json_data
    return result

def shot_execution_analyse():
    image1 = cv2.imread('frame_30.jpg')
    image2 = cv2.cvtColor(image1, cv2.COLOR_BGR2RGB)
    image1 = tf.image.resize(image2, (256, 256))
    imagefinal = np.expand_dims(image1 / 255, 0)
    model1 = keras.models.load_model('shotClassifier.keras.h5')
    prediction1 = model1.predict(imagefinal)

    if prediction1 > 0.5:
        print(f'Incorrect Shot Execution')
        shottype = "Incorrect"
    else:
        print(f'Correct Shot Execution')
        shottype = "Correct"

    print(prediction1)
    # Convert ndarray to list
    prediction_f = prediction1[0][0]
    num_float = float(prediction_f)
    num_float2 = 100-(num_float * 100)

    rounded_x = round(num_float2, 2)
    print(rounded_x)

    # Serialize float to JSON
    json_data = json.dumps(rounded_x)

    result1 = []
    result1.append(shottype)
    result1.append(json_data)
    print(result1)
    # return shottype,json_data
    return result1
def leg_movement_analyse():
    image2 = cv2.imread('frame_60.jpg')
    image3 = cv2.cvtColor(image2, cv2.COLOR_BGR2RGB)
    image2 = tf.image.resize(image3, (256, 256))
    imagefinal = np.expand_dims(image2 / 255, 0)
    model2 = keras.models.load_model('legClassifier.keras.h5')
    prediction2 = model2.predict(imagefinal)

    if prediction2 > 0.5:
        print(f'Incorrect Leg Movement')
        legtype = "Incorrect"
    else:
        print(f'Correct Leg Movement')
        legtype = "Correct"


    prediction_f = prediction2[0][0]
    print(prediction2)

    num_float = float(prediction_f)
    num_float2 = 100-(num_float * 100)

    rounded_x = round(num_float2, 2)
    print(rounded_x)

    # Serialize float to JSON
    json_data = json.dumps(rounded_x)
    # return legtype,json_data
    result3 = []
    result3.append(legtype)
    result3.append(json_data)
    print(result3)
    # return shottype,json_data
    return result3


if __name__ == '__main__':
    app.run()
