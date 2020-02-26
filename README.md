# Book My Show Clone - movie ticket booking

Backend API's for movie ticket booking system using Node js, Express, MongoDB & Ejs.

**1. API to post details of a movie.**

Request method: POST

Request URI: http://localhost:9090/movies

Request body (example):

`{ "movieName":"1917", "nested": [{ "hallName": "GVK Mall", "showTimings": ["10:30", "9:30"], "availableSeats": [[1, 2], [1, 2, 3, 4]]}, { "hallName": "PVR Mall", "showTimings": ["11:30", "5:30"], "availableSeats": [[1], [1, 2, 3, 4]]} }`


**2. API to reserve tickets for given seats in a given screen for a movie**

Request method: POST

Request URI: http://localhost:9090/movies/movieName/hallName/showTimings/seatNo

Request body (example):

`{ "movieName":"1917", "hallName": "GVK Mall", "showTimings": "10:30", "seatNo": "2" }`


**3. API to get the available seats for a given movie in a screen**

Request method: GET

Request URI: http://localhost:9090/movies/movieName/hallName/

Response body (example):

`{ "movieName":"1917", "hallName": "GVK Mall"}`
`{ availableSeats: [1, 2] }`
