# Birb Watchers! Unite!
## Background
Welcome to Birb Watcher, a personal bird watching log that allows birders to record sightings of birds and store them in the cloud!  
In addition to storing/editing your own dated bird sightings and notes, Birb Watcher allows you to:
- View Bird Taxonomy and Species Summary details sourced from ebird.org from your own sightings or from the main directory
- View the sightings of fellow birders and look at details of their birds

This application was a labor of love for birds and served as a learning experience in building MEN Stack CRUD applications.

I hope you enjoy it! I would also recommend using the [Merlin Bird ID Application](https://merlin.allaboutbirds.org/) (Produced by Cornell Labs with EBird) for serious birding 

Get outside and let the rest of us know what you find!

## Getting Started
[Deployed App - Fly.io](https://birb-watcher.fly.dev)  
- In order to log in and use the app you will need a Google account! Google Oath is used as the sole means of creating a profile in this current iteration.  

[Trello Planning](https://trello.com/b/Y0AByxuH/blue-sky-bud)

## Screenshots
Login Page:  
<img width="719" alt="Screen Shot 2021-11-17 at 7 46 51 PM" src="https://user-images.githubusercontent.com/29576093/142342442-7c594fb2-d5be-40e5-b3fb-acffd6964569.png">


Your Birblog:  
 <img width="716" alt="Screen Shot 2021-11-17 at 7 47 21 PM" src="https://user-images.githubusercontent.com/29576093/142342498-781f07e5-7644-4a77-a31d-009d28e54263.png">


Sighting Details:  
<img width="717" alt="Screen Shot 2021-11-17 at 7 48 21 PM" src="https://user-images.githubusercontent.com/29576093/142342610-3d755797-71c5-4d49-8429-f57322bb9356.png">

Birb Details:  
 <img width="718" alt="Screen Shot 2021-11-17 at 7 48 38 PM" src="https://user-images.githubusercontent.com/29576093/142342638-17e7d72d-269a-4d20-9e62-9f8785097e09.png">


All Watchers:  
  <img width="696" alt="Screen Shot 2021-11-17 at 7 48 58 PM" src="https://user-images.githubusercontent.com/29576093/142342677-d4211155-960a-4262-a2f3-65ad96ce3597.png">


Birb Search:  
  <img width="719" alt="Screen Shot 2021-11-17 at 7 49 15 PM" src="https://user-images.githubusercontent.com/29576093/142342706-ac88c75e-88cf-406b-a386-bc72a7d13acc.png">




## Technologies and Sources
This application is built in Js Node, Express, and MongoDB
Node Packages that made this application possible:
- axios
- cheerio
- tough-cookie
- axios-cookie-jar-support  

Data sourced from [ebird public api](https://documenter.getpostman.com/view/664302/S1ENwy59?version=latest#55bd1b26-6951-4a88-943a-d3a8aa1157dd)  
Summary and images scraped from [ebird public site](https://ebird.org/home)  
Icons from [FontAwesome](fontawesome.com/)

## Next Steps + Future Improvements
- Google Maps API integration for locations
- Trail tracking
- Public Trail Rating
