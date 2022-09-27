<div align="center">
    <img src="./img/account-login-128.png" alt="logo" width="150"/>

<h1 align="center">Register-Login page with Serverless backend </h1>
</div>
    

This web application  allows a user to register, login and view their details.
The frontend pages were written in React which interacts with a restful API to perform the Registration, Login and Fetch user data
from a DynamoDB table.

## Demo

The site can be accessed here:
https://cromwell-test.netlify.app/

## Front end
- **Registration page**  
The registration page accepts the users name, email address and password (and confirm
password).   
On submission this page will send a POST request to /user/register   
- **Login page**  
The login page takes an email address and password then send a POST
request to /user/login
- **Profile page**
The landing page will be a shown once the user has registered or logged in.
This page can request the users details by sending a POST request with the JWT token and the email address.
- **Homepage**
A homepage with content and welcome message, including navigation.

## Backend
The backend was written in Node.js. To build it, I have taken advantage of the serverless model provided by AWS, 
including API gateway, Lambda and DynamoDB.

## Tech stack and details
Please check out the subfilders for detailed description of the application:       
- Frontend: https://github.com/Szfinx5/Login-Page-React-Lambda/tree/main/frontend        
- Backend: https://github.com/Szfinx5/Login-Page-React-Lambda/tree/main/backend
