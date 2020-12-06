import csv
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

from bson import ObjectId

from config import client
from src.controller import app
from bson.json_util import dumps
from flask import request, jsonify
import json
import ast
from importlib.machinery import SourceFileLoader
import matplotlib.pyplot as plt

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
@app.route("/api/house/search", methods=['GET'])
def get_all_house():
    args = request.args
    print(args)
    query_params = helper_module.parse_query_params(request.query_string)
    formSearch = {}
    # số phòng ngủ
    if (args.get('numberBedroom') != "" ):
        formSearch['numberBedroom'] = int(args['numberBedroom']);
    # Số phòng tắm
    if (args.get('numberBathroom') != "" ):
        formSearch['numberBathroom'] = int(args['numberBathroom']);
    # Số tầng
    if (args.get('totalFloor') != "" ):
        formSearch['totalFloor'] = int(args['totalFloor']);
    # diện tích
    if (args.get('area') != "" ):
        formSearch['area'] = float(args['area']);
    # độ rộng mặt trước
    if (args.get('frontWidthFrom') != "" ):
        formSearch['frontWidth'] = {"$gt": float(args['frontWidthFrom']) };
    if (args.get('frontWidthTo') != ""):
        formSearch['frontWidth'] =  {"$lt": float(args['frontWidthTo']) };
    # độ rộng đường vào
    if (args.get('inletWidthFrom') != ""):
        formSearch['inletWidth'] = {"$gt": float(args['inletWidthFrom']) };
    if (args.get('inletWidthTo') != ""):
        formSearch['inletWidth'] = {"$lt": float(args['inletWidthTo']) };
    # khoảng cách so với trung tâm
    if (args.get('distanceCenterFrom') != ""):
        formSearch['distanceCenter'] = {"$gt": float(args['distanceCenterFrom']) };
    if (args.get('distanceCenterTo') != ""):
        formSearch['distanceCenter'] = {"$lt": float(args['distanceCenterTo']) };
    # giá nhà
    if (args.get('priceFrom') != ""):
        formSearch['price'] = {"$gt": float(args['priceFrom']) };
    if (args.get('priceTo') != ""):
        formSearch['price'] = {"$lt": float(args['priceTo']) };
    print(formSearch)
    output = [];
    recordsTotal = collection.find(formSearch).count();
    first = 0
    if b'_search' in query_params:
        _search = json.loads(query_params[b'_search'].decode('utf-8'))
        a = _search['first']
        first = int(_search['first'])

    for p in collection.find(formSearch).skip(first).limit(10):
        output.append({ "houseId": str(p["_id"])
                        , "numberBedroom": p["numberBedroom"]
                        , "numberBathroom": p['numberBathroom']
                        , "totalFloor": p["totalFloor"]
                        , "area": p["area"]
                        , "frontWidth": p["frontWidth"]
                        , "inletWidth": p["inletWidth"]
                        , "distanceCenter": float(p["distanceCenter"])
                        , "price": p["price"]
                       });
        print(output)
    return jsonify({"data":output, "recordsTotal":recordsTotal, "first" : first });


@app.route("/api/house/create-house", methods=['POST'])
# them moi nha
def create_house():
    try:
        try:
            body = ast.literal_eval(json.dumps(request.get_json()))
        except:
            # Bad request as request body is not available
            # Add message for debugging purpose
            return "", 400
        record_created = collection.insert(body)
        res = responseData('SUCCESS', 'SUCCESS', '', str(record_created))
        return dumps(res), 200
    except Exception as e:
        # Error while trying to update the resource
        # Add message for debugging purpose
        return e, 500


# gợi ý giá nhà
@app.route("/api/house/suggestion", methods=['GET'])
def suggestion():
    try:
        args = request.args
        print(args)
    except:
        return "", 400
    # thuc hien suggestion
    # read data
    data = []

    with open('dataTest.csv') as f:
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
    predict = reg_rm.predict([[float(args['numberBedroom']),float(args['numberBathroom']),float(args['totalFloor']),
                               float(args['area']),float(args['frontWidth']),float(args['inletWidth']),float(args['distanceCenter'])]])
    print('predict: {}'.format(int(predict)))


    formSearch = {}
    # formSearch['numberBedroom'] = int(args['numberBedroom']);
    # formSearch['numberBathroom'] = int(args['numberBathroom']);
    # formSearch['totalFloor'] = int(args['totalFloor']);
    # formSearch['area'] = float(args['area']);
    # formSearch['frontWidth'] = float(args['frontWidth']);
    # formSearch['inletWidth'] = float(args['inletWidth']);
    # formSearch['distanceCenter'] = {"$gt": float(args['distanceCenter'] ) - 1000, "$lt" : float(args['distanceCenter'] ) + 1000   };
    formSearch['price'] = {"$gt": float(predict) - 200000000, "$lt":  float(predict) + 200000000 };

    outputlst = [];
    for p in collection.find(formSearch).limit(20):
        outputlst.append({ "numberBedroom": p["numberBedroom"]
                        ,"numberBathroom": p['numberBathroom']
                        ,"totalFloor": p["totalFloor"]
                        ,"area":p["area"]
                        ,"frontWidth":p["frontWidth"]
                        ,"inletWidth":p["inletWidth"]
                        ,"distanceCenter": float(p["distanceCenter"])
                        ,"price": p["price"]
                       });
    return jsonify({"data":outputlst, "price": format(int(predict)) });
# {{"price": format(int(predict))}, "data":outputlst}

@app.route("/api/house/delete-house/<id>", methods=['DELETE'])
# xoa nha da ton tai
def delete_house(id):
    collection = db.house
    try:
        # Get the value which needs to be updated
        # Get the value which needs to be updated
        delete_house = collection.delete_one({"_id": ObjectId(id)})
        if delete_house.deleted_count > 0:
            res = responseData('SUCCESS', 'SUCCESS', '', "OK")
            return dumps(res)
        else:
            # Resource Not found
            return "", 404
    except Exception as e:
        # Error while trying to update the resource
        # Add message for debugging purpose
        return e, 500


# api get one
@app.route("/api/house/<id>", methods=['GET'])
def findOneHouse(id):
    try:
        collection = db.house
        house = collection.find_one({"_id": ObjectId(id)})
        return dumps({"data": house})
    except Exception as e:
        return e, 500


@app.route("/api/house/update-one-house/<id>", methods=['POST'])
def updateMovie(id):
    collection = db.house
    try:
        # Get the value which needs to be updated
        try:
            body = ast.literal_eval(json.dumps(request.get_json()))
        except:
            # Bad request as the request body is not available
            # Add message for debugging purpose
            return "", 400
        # Updating the user
        # records_updated = collection.update_one({"_id": ObjectId(id)}, { "$set": body })
        # Delete the house
        deleted_house = collection.delete_one({"_id": ObjectId(id)})
        # Check if resource is updated
        if deleted_house.deleted_count > 0:
            # Prepare the response as resource is updated successfully
            record_created = collection.insert(body)
            res = responseData('SUCCESS', 'SUCCESS', '', record_created)
            return dumps(res)
        else:
            # Bad request as the resource is not available to update
            # Add message for debugging purpose
            return "", 404
    except Exception as e:
        # Error while trying to update the resource
        # Add message for debugging purpose
        return e, 500


def responseData(type, code, message, data):
    return {
        "type": type,
        "code": code,
        "message": message,
        "data": data
    }

# api get one
@app.route("/api/house/get-statistic-data", methods=['GET'])
def getStaticData():

    outPrice = []
    outBed = []
    outBath = []
    dataArea = []
    dataFloor = []
    dataFrontWidth = []
    dataInletWidth = []
    dataDistanceCenter = []
    for p in collection.find({"price": {"$lt": 2000000000 }}):
        outPrice.append(p["price"]);
        outBed.append(p["numberBedroom"]);
        outBath.append(p["numberBathroom"]);
        dataArea.append(p["area"]);
        dataFloor.append(p["totalFloor"]);
        dataFrontWidth.append(p["frontWidth"]);
        dataInletWidth.append(p["inletWidth"]);
        dataDistanceCenter.append(p["distanceCenter"]);

    #lay theo số phòng ngủ
    #
    # outBed = []
    # for i in range(10):
    #     i = i+ 1;
    #     data = collection.find({"numberBedroom": i}).count();
    #     outBed.append(data)
    # #lấy theo số phòng tắm
    # outBath = []
    # for i in range(10):
    #     i = i + 1;
    #     data = collection.find({"numberBathroom": i}).count();
    #     outBath.append(data)
    # #lấy theo diện tích
    # dataArea =[]
    # for i in range(10):
    #     indexGt = i*20;
    #     indexLt = i*20 + 20;
    #     data = collection.find({"area": {"$gt": indexGt, "$lt": indexLt }}).count();
    #     dataArea.append(data)
    # #Lấy theo số tầng
    # dataFloor =[]
    # for i in range(8):
    #     i = i + 1;
    #     data = collection.find({"totalFloor": i}).count();
    #     dataFloor.append(data)
    # #lây theo độ rộng mặt tiền
    # dataFrontWidth = []
    # for i in range(5):
    #     indexGt = i*4;
    #     indexLt = i*4 + 4;
    #     data = collection.find({"frontWidth": {"$gt": indexGt, "$lt": indexLt }}).count();
    #     dataFrontWidth.append(data)
    # #Lấy theo độ rộng đường vào
    # dataInletWidth = []
    # for i in range(10):
    #     i = i + 1;
    #     data = collection.find({"inletWidth": i}).count();
    #     dataInletWidth.append(data)
    #
    # #lấy theo khoảng cách so với trung tâm
    # dataDistanceCenter = []
    # for i in range(10):
    #     indexGt = i * 2000;
    #     indexLt = i * 2000 + 2000;
    #     data = collection.find({"distanceCenter": {"$gt": indexGt, "$lt": indexLt }}).count();
    #     dataDistanceCenter.append(data)
    #

    return jsonify({    "dataBed": outBed
                       ,"dataBath": outBath
                       ,"dataFloor": dataFloor
                       ,"dataArea": dataArea
                       ,"dataFrontWidth": dataFrontWidth
                       ,"dataInletWidth": dataInletWidth
                       ,"dataDistanceCenter": dataDistanceCenter
                        ,"dataPrice": outPrice
                        });