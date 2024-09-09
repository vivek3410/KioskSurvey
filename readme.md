# KioskSurvey

## Overview

KioskSurvey is a project consisting of a client-side React application and a server-side Node.js application. Follow the instructions below to set up and run both parts of the project locally..

## Prerequisites

- Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.
- MongoDB: Make sure you have MongoDB installed and running locally. You can download it from mongodb.com.

## Setup

1. **Clone the Repository:**
Clone the repository to your local machine using:

   ```bash
   git clone https://github.com/vivek3410/KioskSurvey.git
   cd KioskSurvey
   ```
2. Set Up the Server
   Navigate to the server folder and install the dependencies:
   ```bash
    cd server
    npm install
   ```
3. Configuration
   Create a .env file in the server directory with the following content:
      ```bash
       MONGO_URL=mongodb://localhost:27017/your_database_name
      ```
   Replace your_database_name with the name of your MongoDB database. Ensure that MongoDB is running on the default port (27017).
4. Running the Server
   Start the server using:
   ```bash
   npm start
   ```
   The server will be running on http://localhost:5000 (or another port if configured differently).
5. Set Up the Client
   Navigate to the client folder and install the dependencies:
    ```bash
    cd ../client
    npm install
   ```
   ### Running the Client
   Start the client application using:
   ```bash
    npm start
   ```
   The client will be running on http://localhost:3000.
6. Dump Data from MongoDB Server to Local DB
To dump data from the remote MongoDB server to your local MongoDB instance for testing purposes, follow these steps:
   1. Navigate to the server folder:
       ```bash
       cd ./server
      ```
   2. Run the following script to dump the data from the staging MongoDB server:
      ```bash
       npm run db:dump
      ```
### Running the Client
Start the client application using:
```bash
 npm start
```
The client will be running on http://localhost:3000.
