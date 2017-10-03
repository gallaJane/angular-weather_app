import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;



@Component({

    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    //this is for services 
    providers: [WeatherService]
})
//inserting OnInit
export class WeatherComponent implements OnInit {
    //somewhere to save the position
    pos: Position;
    weatherData= new Weather(null, null, null, null, null);
    currentSpeedUnit ="kph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    icons = new Skycons();
    // this is for Loader, is data received or not
    dataReceived = false;

    // dependency injection 
    constructor(private service: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
         this.service.getCurrentLocation()
            //this subscribe will only run when up ↑ (getCurrentLocation) is completed
            .subscribe(position => {
                // just to save the data in position property
                this.pos = position;
                //this is where we call getCurrentWeather 
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.log(err));
    }

    getCurrentWeather(){
         //this is where we call getCurrentWeather 
                this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
                    // for Observables, if we want anything to happen, we need to subscribe to it
                    .subscribe(weather => {
                     //we wanna set the property on our weather data component property to the data we are getting back from the Observable
                     //this is what we read from browser Inspect element -Object -> currently->...
                     //After this we're gonna display on Template (weather.component.html)
                        this.weatherData.temp = weather["currently"]["temperature"],
                        this.weatherData.summary = weather["currently"]["summary"],
                        this.weatherData.wind = weather["currently"]["windSpeed"],
                        this.weatherData.humidity = weather["currently"]["humidity"],
                        this.weatherData.icon = weather ["currently"]["icon"]
                        console.log("Weather: ", this.weatherData);
                        //this is where we call the method for weather icon
                        this.setIcon();
                        //place where we are curtain that weatherdata is received
                        this.dataReceived = true;
                    },
                    err => console.error(err));
    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
        .subscribe(location => {
            console.log(location); //TODO; REMOVE
            this.currentLocation = location ["results"][1]["formatted_address"]
            console.log("Name: ", this.currentLocation); //TODO: REMOVE
        });

    }

    // toggle-click event to switch between kph to mph and celsius to fahrenheit....it's called in weather.component.html 
    //new method
   toggleUnits() {
       this.toggleTempUnits();
       this.toggleSpeedUnits();
   } 

   toggleTempUnits(){
        if(this.currentTempUnit == "fahrenheit"){
            this.currentTempUnit = "celsius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
   }
   toggleSpeedUnits(){
        if(this.currentSpeedUnit == "kph"){
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
   }

   //new method for icons
   setIcon(){
       this.icons.add("icon", this.weatherData.icon);
       //this will start the animation
       this.icons.play(); 
   }


   //new method where we gonna decide which weather-colors from constants.ts are gonna apply
   setStyles(): Object {
        if(this.weatherData.icon) {
            //matching the color of icon with text under it...egzz.. sunshine-clear
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"]
            return WEATHER_COLORS[this.weatherData.icon]
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS ["default"];
        }
   }
}