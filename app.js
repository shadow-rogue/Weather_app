const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey = "5182a94ae64bd1468074ee319f300dd1";

    const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query +"&units=metric&appid=" +apikey;
    
    https.get(url,function(response){
        console.log(response.statusCode);

    response.on("data", function(data){

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const wdes = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write("<p>The weather in " + query +" is " + wdes +"<p>");
        res.write("<h1> The temperature in " + query +" is " +temp +" degrees</h1>");
        res.write("<img src = " +imageURL +" >")
        res.send();
    })
})
    
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})