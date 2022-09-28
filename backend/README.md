
## Unit Tests

There are 7 tests in the backend directories, performing the following:       
 
 - Trying to add a new valid user to the table
 - Trying to add an existing user to the table
 - Trying to add a user to the table with missing details
 - Trying to log in with correct credentials
 - Trying to log in with incorrect credentials
 - Trying to log in with missing credentials
 - Trying to delete the test user

## Running Tests
To run the tests, access key pairs to the AWS account is needed. I am happy to send a set of them after requesting.   
Once the credentials are added to the .aws folder, follow the steps below:   

- Clone the project

```bash
  git clone https://github.com/Szfinx5/Login-Page-React-Lambda.git
```

- Go to the project directory

```bash
  cd backend
```

- Install dependencies

```bash
  npm install
```

- Create a .ENV file in the frontend directory and add

```bash
  JWT_SECRET=cromwell
```

- Start the test

```bash
  npm run test
```


## Diagram
This is the diagram of the serverless backend:

![Diagram](https://github.com/Szfinx5/Login-Page-React-Lambda/blob/main/img/diagrambe.JPG)








## Tech Stack

For the backend, I have used the following tech:
- Node.js
- bcryptjs
- jsonwebtoken
- API Gateway
- Monolitic lambda function
- DynamoDB





## API Reference

The API endpoint is: https://t1rs7h1mc5.execute-api.eu-west-1.amazonaws.com/prod    
It is protected by an API key (suppied below)

#### Register a new user

```http
  POST /user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV |

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Login

```http
  POST /user/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV |

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Verify the token and Get the user details

```http
  POST /user/verify
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV |

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user` | `string` | **Required** |
| `token` | `string` | **Required** |

#### Delete a user
This endpoint is disabled as the function is not implemented in the frontend

```http
  DELETE /user/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. NLTDNyfByD5rr9EdmpA5Ua1TkTGB8FRb1FNgGCGV |
| `email` | `string` | **Required** |

