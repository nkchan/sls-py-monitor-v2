# react-dir 
## desctiption

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

## Further Improvements
- Re-rendering if you operate add/delete site
- Improve speed

