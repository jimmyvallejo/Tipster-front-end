# Tipster-React-Project

# https://tipster-app.netlify.app/



-- Project made using React, Express and MongoDb

-- I built this project as a final MERN stack project for my coding bootcamp.

--I learned about essential functionality of React such as context, prop drilling, state, useffect, and properly structuring components to be reusable.

--In this project I incorporated extra features such as a weather API courtesy of openweathermap which takes your current location from your browsers built in location feature and returns weather information based on your latitude and longitude.

-- Other APIs I incorporated were the google maps API and the stripe API for a mock payment feature. Map functionality works by the user inputting an address on the client. This address gets saved to the "tip" object in my database as "location". When a axios.get is ran on all tips the location is extracted and sent to the google maps api which returns it as latitude and longitude values. These values are saved in state and transferred to the on screen map in the "tip component which is reused for every tip.

--The like and comment features were also features I wanted to add which I solved by adding references to the "id" of the owner of the comment or like in the schema of a post.

-- Overall I am very pleased with the core functionality of the app, I was able to add most of the features I wanted to implement in a one week time limit.

Project made by Jimmy Vallejo
