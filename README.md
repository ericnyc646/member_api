# member_api

This project is based on the following technologies
  - NodeJS
  - AWS Serverless Architecture
  - Jest Testing Framework
  
 Running the application:
 ```sh
 $ npm run start
 ```
 
Running Automated tests:
```sh
$ npm run test
```
This will kick off the test and provide results in the terminal.  See file:  jest_test_results.txt

Sample below:
```sh
PS C:\Users\eric\source\repos\member_api> npm run test
PASS src/repositories/member.repository.spec.js
PASS src/utils/response.util.spec.js
PASS src/utils/request.util.spec.js
PASS src/dynamodb.factory.spec.js

Test Suites: 4 passed, 4 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        5.311s
Ran all test suites.
```

### Docker Dev Environment
Docker and LocalStack were used to create the testing environment locally for testing

Note:  Docker should be installed locally in order to create the environment.  Section below configures your environment.

To create this environmnet:
```sh
docker run --name 'dynamodb_localstack' -d -p 8000:8000 -p 8080:8080 -e SERVICES=dynamodb:8000 -e DATA_DIR='/tmp/localstack/data' localstack/localstack
```

To start docker container:
```sh
docker start dynamodb_localstack
```

To stop docker container:
```sh
docker stop dynamodb_localstack
```
