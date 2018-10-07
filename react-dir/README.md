# react-dir 

## setup

```
$ pwd -> /home/yourname/sls-py-monitor-v2/react-dir
$ npm install
$ npm build  
```

### S3 Bucket configure
#### Bucket Policy

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::sls-py-webmonitor-bucket-dev/*"
        }
    ]
}
```

#### CORS

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

### writing config.js 
#### Rename

```
$ mv config.js.default config.js
```

#### Rewrite
```
export default {
  s3: {
    REGION: "ap-northeast-1",
    BUCKET: "zzzzz"
  },
  apiGateway: {
    REGION: "ap-northeast-1",
    URL: "https://xxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-northeast-1",
    USER_POOL_ID: "aaaaaaaaa",
    APP_CLIENT_ID: "ccccccccccccccccccc",
    IDENTITY_POOL_ID: "ap-northeast-1:zzzzzzz-zzzzz-zzzz-zzzz-zzzzzz"
  }
};
```

## Deploy

```
$ aws s3 sync build/ s3://YOUR_S3_DEPLOY_BUCKET_NAME 

```

if you deploy again when change config 

```
$ aws s3 sync build/ s3://YOUR_S3_DEPLOY_BUCKET_NAME --delete

```


## Further Improvements
- Re-rendering if you operate add/delete site
- Improve speed

