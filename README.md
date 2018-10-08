# sls-py-monitor-v2
this repository is 'Serverless Webmonitor'.

It is confirm normal operation of server.

Lambda function send http request every 5min(default). If the response changed, send alert message to AWS SNS. Manage monitoring website in web page provided by API Gateway, Lambda and DynamoDB.

Management screen used authentication by Cognito.

It is tow part composition. First, Back-end part that is used API Gateway,Lambda and DynamoDB. Second, Front-end part that is used React in S3.

Back-end part is `sls-dir`. Front-end part is `react-dir`. Please setup Back-end part, next Front-end part. 


## Structure chart
![構成図](https://github.com/nkchan/sls-py-monitor-v2/blob/master/image/structure-chart.jpg)

## Preparation
This repository explain in the state your home directory.

```
$ pwd -> /home/yourname 
$ git clone https://github.com/nkchan/sls-py-monitor-v2
$ cd sls-py-monitor-v2
```

## Back-end part
This part is used [Severless Framework](https://serverless.com/) to realize Back-end. For details, click [here](/sls-dir/README.md).
## Front-end part
This par is used [React](https://reactjs.org/) in front-end. For details, click [here](/react-dir/README.md)

## Change Config if you use a custom domain
First, you watch [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html), Second, change [sls-dir/hander.py L14](https://github.com/nkchan/sls-py-monitor-v2/blob/master/sls-dir/handler.py#L14) variable 'cors_url'
