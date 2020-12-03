import csv
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

from config import client
from src.controller import app
from bson.json_util import dumps
from flask import request, jsonify
import json
import ast
from importlib.machinery import SourceFileLoader


# Import the helpers module
helper_module = SourceFileLoader('*', './src/controller/helpers.py').load_module()

# Select the database
db = client.SuggestionPriceHouse
# Select the collection
collection = db.house

@app.route("/")
def get_initial_response():
    """Welcome message for the API."""
    # Message to the user
    message = {
        'apiVersion': 'v1.0',
        'status': '200',
        'message': 'Welcome to the Flask API'
    }
    # Making the message looks good
    resp = jsonify(message)
    # Returning the object
    return resp



# tim kiem nha

@app.route('/api/house/search', methods=['GET'])
def get_all_house():
    args = request.args
    formSearch = {}
    # if (args.get('name') is not None):
    #     formSearch['name'] = args['name'];
    # if (args.get('age') is not None):
    #     formSearch['age'] = int(args['age']);
    output = [];
    for p in collection.find(formSearch):
        output.append({"priceHouse": str(p["_id"]), "area": p['area'], "numberBedroom": p["numberBedroom"]});
    return jsonify(output);


@app.route("/api/house/create-house", methods=['POST'])
# them moi nha
def create_house():
    try:
        # Create new users
        try:
            body = ast.literal_eval(json.dumps(request.get_json()))
        except:
            # Bad request as request body is not available
            # Add message for debugging purpose
            return "", 400

        record_created = collection.insert(body)

        # Prepare the response
        if isinstance(record_created, list):
            # Return list of Id of the newly created item
            return jsonify([str(v) for v in record_created]), 201
        else:
            # Return Id of the newly created item
            return jsonify(str(record_created)), 201
    except:
        # Error while trying to create the resource
        # Add message for debugging purpose
        return "", 500

# gợi ý giá nhà
@app.route("/suggestion", methods=['POST'])
def suggestion():
    try:
        body = ast.literal_eval(json.dumps(request.get_json()))
        print(body['area'])
    except:
        return  "", 400
     # thuc hien suggestion
            # read data
    data = []

    with open('MOCK_DATA.csv') as f:
        for line in f:
            inner_list = [elt.strip() for elt in line.split(',')]
            # in alternative, if you need to use the file content as numbers
            # inner_list = [int(elt.strip()) for elt in line.split(',')]
            data.append(inner_list)
    print(data)
    data = np.delete(data, 0, axis=0)  # remove row first
    data = data.astype(np.float)
    print('dataset: {}'.format(data))

    features = data[:, :7]
    targets = data[:, 7]
    x_train, x_test, y_train, y_test = train_test_split(features, targets, test_size=0.3, random_state=42)
    #
    # traning
    reg_rm = LinearRegression()
    reg_rm.fit(x_train, y_train)

    # evaluation model
    print('score: {}'.format(reg_rm.score(x_test, y_test)))

    # predict
    predict = reg_rm.predict([[body['area'],3,2,42.02,8.74,3.79,6535.89]])
    print('predict: {}'.format(int(predict)))
    return jsonify(), 201