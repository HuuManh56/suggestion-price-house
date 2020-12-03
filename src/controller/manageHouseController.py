from bson import ObjectId

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
@app.route("/api/house/search", methods=['GET'])
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


@app.route("/create-house", methods=['POST'])
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

@app.route("/delete-house/<id>", methods=['DELETE'])
#xoa nha da ton tai
def delete_house():
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

#api get one
@app.route("/get-one-house/<id>", methods=['GET'])
def findOneHouse(id):
    try:
        collection = db.house
        house = collection.find_one({"_id": ObjectId(id)})
        return  dumps({"data": house})
    except Exception as e:
        return e, 500

@app.route("/update-one-house/<id>", methods=['POST'])
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
        if deleted_house.deleted_count > 0 :
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