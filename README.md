# sls-py-monitor-v2
this repository is 'Serverless Webmonitor'.

Lambda function send http request every 5min(default). If the response changed, send alert message to AWS SNS. Manage monitoring website in web page provided by API Gateway, Lambda and DynamoDB.

Management screen used authentication by Cognito.

It is tow part composition. First, Front-end is used React in S3.Second,Back-end is used API Gateway,Lambda and DynamoDB. 
