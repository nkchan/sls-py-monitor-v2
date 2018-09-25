# Serverless Section
## Preparation
Install serverless framework and setup AWS credential. See: [Serverless Framework Documentation](https://github.com/nkchan/sls-py-monitor-v2)
## Setup

```
$ pwd /home/yourname/sls-py-monitor-v2
$ cd sls-dir
$ sh requirements.sh
$ sls deploy
```

## Deploy Aplication

```
~/haw-itn/sls-py-monitor-v2/sls-dir$ sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (8.78 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
......................................
Serverless: Stack update finished...
Service Information
service: sls-py-webmonitor
stage: dev
region: ap-northeast-1
stack: sls-py-webmonitor-dev
api keys:
  None
endpoints:
  POST - https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/sites/register
  POST - https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/sites/remove
  GET - https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/get_site
functions:
  register: sls-py-webmonitor-dev-register
  remove: sls-py-webmonitor-dev-remove
  check_sites: sls-py-webmonitor-dev-check_sites
  sns: sls-py-webmonitor-dev-sns
  get_site: sls-py-webmonitor-dev-get_site
```

### Regist Subscriber
To receive alert, create subscription to SNS topic. This app will create SNS topic named serverless-web-monitor.
