# Serverless Section
## Preparation
Install serverless framework and setup AWS credential. See: [Serverless Framework Documentation](https://github.com/nkchan/sls-py-monitor-v2)
## Setup

```
$ pwd -> /home/yourname/sls-py-monitor-v2
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


## Make Identity Pools (Federated Identities) 
Cognito User Pool is created when you executed `sls deploy`,but  [Federated Identities](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) is not created. You need set-up [Identity Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-integrating-user-pools-with-identity-pools.html) Please Setting "Setting Up an Identity Pool with the AWS Management Console" item. 



## Required Notes
this item is used [here](../react-dir/src/config.js.default)

- bucket name(react)
	- project name-bucket-stage

- api gateway
	- `https://xxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod`	

- Cognito 
	- USER_Pool_ID
	- APP_CLIENT_ID
	- IDENTITY_POOL_ID

## Create User
First, we will use AWS CLI to sign up.

```
$ aws cognito-idp sign-up \
  --region YOUR_COGNITO_REGION \
  --client-id YOUR_COGNITO_APP_CLIENT_ID \
  --username admin@example.com \
  --password Passw0rd!

```

Next, the user can  authenticate with the User Pool.

```
$ aws cognito-idp admin-confirm-sign-up \
  --region YOUR_COGNITO_REGION \
  --user-pool-id YOUR_COGNITO_USER_POOL_ID \
  --username admin@example.com
```


### Register Subscriber that recieve SNS Notification
To receive alert, create [subscription](https://docs.aws.amazon.com/sns/latest/dg/SubscribeTopic.html) to SNS topic. 


next,[Front-en part](../react-dir/README.md)



