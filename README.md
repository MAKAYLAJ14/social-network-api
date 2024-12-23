# social-network-api
Module 17 Challenge

## About Task
Here we build a API test task for a social network. 
There are routes for doing the following functions
creating users, updating users, and deleting users. 
creating and deleting thoughts and reactions,adding and deleting friends.
No front end  interface provided for this app, all routes have been tested by Thunderclient.

## Technologies Used
1. MongoDB
2. Mongoose
3. Javascript
4. Nodemon
5. Thunderclient 
6. Express

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```