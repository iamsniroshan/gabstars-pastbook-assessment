# Pastbook image grid generator

## Prerequisite

Latest Version of docker should be on your system

## How to run the app

1. Clone the repo Navigate to project directory
2. Rename example.env file to .env 
3. run `docker-compose up --build` (this will spin up two docker containers for FE and BE)
4. Now open your browser and visit `http://localhost:3000/`

## Solution overview

There are two separate project for running ExpressJs based backend and CRA based frontend,Docker is used to run BE, FE and MongoDB in containers and docker-compose enable to work them together

## Backend Solution

Backend is responsible for following tasks

1. CRUD operations to MongoDB
2. Fetch and enriched returned images with aspect ratio of each, so we can easily create the Grid in FE

## Frontend Solution

I'm using redux for state management and Thunk as middleware for handling async calls. 

For user identification, since it is overengineering to create an Auth system for this project, I've simply used fingerprint package to identify the user, it can uniquely identify user using details in browser. accuracy is around 60% but this will good enough for the test

FE will fetch the data from BE and generate three type of UIs

1. Photo Gallery - this is a selectable grid view of all the image, user need to select pre defined image count per a grid, you can costomise it by editing `frontend/src/config/index.js` default value is 9
2. Photo Grid - User can drag and drop to rearrange the grid order and save the selection in MongoDB through BE
3. My Grid - this is a static grid which display user's selection and order of the grid selected in previous two steps

### User guide

1. Open the FE and wait till all the images load, since some of images are more than 10MB give it some time to download all of them and cache, make sure you have untick `Dispable cache` in browser inspectors Network tab if you have opened the inspector, otherwise it won't cache images
2. Make your selection by tapping on desired images, you need to select 9 images, and tap on Next button
3. Then in next screen drag and drop images to change the order, or go back to alter the selection
4. Now tap on save to save your selection in the DB, when you reload the app you always go to My Grid, if you need to alter selection or order tap on Edit button and repeate 1st and 2nd steps


