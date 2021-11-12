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
[Deployed App - Heroku](https://birb-watcher.herokuapp.com)  
- In order to log in and use the app you will need a Google account! Google Oath is used as the sole means of creating a profile in this current iteration.  

[Trello Planning](https://trello.com/b/Y0AByxuH/blue-sky-bud)

## Screenshots
Login Page:  
<img width="337" alt="Screen Shot 2021-11-11 at 10 39 20 PM" src="https://user-images.githubusercontent.com/29576093/141415847-7ed173cb-a0ae-4445-9364-d0d7c96a48be.png">  

Your Birblog:  
<img width="422" alt="Screen Shot 2021-11-11 at 10 41 04 PM" src="https://user-images.githubusercontent.com/29576093/141416003-af3e1bb2-00fe-4424-a326-37d6c3af1224.png">  

Sighting Details:  
<img width="459" alt="Screen Shot 2021-11-11 at 10 42 24 PM" src="https://user-images.githubusercontent.com/29576093/141416130-e5a40eaf-fff3-46ad-b0a2-58741eec8d28.png">  

Birb Details:  
<img width="590" alt="Screen Shot 2021-11-11 at 10 44 09 PM" src="https://user-images.githubusercontent.com/29576093/141416293-8d2a1f4d-5bab-4340-b205-ce37a2229090.png">  

All Watchers:  
<img width="438" alt="Screen Shot 2021-11-11 at 10 44 37 PM" src="https://user-images.githubusercontent.com/29576093/141416331-7f981707-b797-41f2-9a63-6f7392858256.png">  

Birb Search:  
<img width="319" alt="Screen Shot 2021-11-11 at 10 45 09 PM" src="https://user-images.githubusercontent.com/29576093/141416373-25a8d655-0f18-4ada-a7f6-f053244bdc6d.png">


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
