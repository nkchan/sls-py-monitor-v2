from urllib.parse import parse_qs
from uuid import uuid1
import requirements
import lib.dynamo as dynamo
import lib.backend as backend
from jinja2 import Environment, FileSystemLoader
from decimal import Decimal
import boto3
import json
import os 

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ["SITE_TABLE_NAME"])
cors_url = "http://"+os.environ['SITE_URL'];

def register(event, context):
    """
    /registerにpostされたnameとurlをDBに登録し
    /にリダイレクトする
    """
    print(event)
    body = json.loads(event["body"])
    # siteの定義
    site = {
        "id": str(uuid1()),
        "name": body['name'],
        "url": body['url'],
        "code": backend.probe(body['url'])
    }

    dynamo.put_site(site)

    response = {
        "statusCode": 302,
        "headers": {
            'Location': './',
            "Access-Control-Allow-Origin": cors_url,
            "Access-Control-Allow-Credentials": True,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
         },
        "body":""
    }
    print(response)
    return response


def remove(event, context):
    """
    /removeにpostされたidをremove_site()に渡し
    /にリダイレクトする
    """
    body = json.loads(event["body"])

    dynamo.remove_site(body["id"])

    response = {
        "statusCode": 302,
        "headers": {
            'Location': './',
            "Access-Control-Allow-Origin": cors_url,
            "Access-Control-Allow-Credentials": True,
            'Content-Type': 'application/json'
        },
        "body":""
    }

    return response

def get_site(event, context):
    data = table.scan()
    json_str = json.dumps(data["Items"],default=decimal_default_proc)
    print(cors_url)
    response = {
       "statusCode":200,
        "headers": {
            "Access-Control-Allow-Origin": cors_url,
			"Access-Control-Allow-Credentials": True,
			'Content-Type': 'application/json'
        },
       "body" : json_str 
    }	

    return response

def decimal_default_proc(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

