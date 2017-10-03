"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var weather_service_1 = require("../service/weather.service");
var weather_1 = require("../model/weather");
var constants_1 = require("../constants/constants");
var WeatherComponent = (function () {
    // dependency injection 
    function WeatherComponent(service) {
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.currentSpeedUnit = "kph";
        this.currentTempUnit = "fahrenheit";
        this.currentLocation = "";
        this.icons = new Skycons();
        // this is for Loader, is data received or not
        this.dataReceived = false;
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.getCurrentLocation();
    };
    WeatherComponent.prototype.getCurrentLocation = function () {
        var _this = this;
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            // just to save the data in position property
            _this.pos = position;
            //this is where we call getCurrentWeather 
            _this.getCurrentWeather();
            _this.getLocationName();
        }, function (err) { return console.log(err); });
    };
    WeatherComponent.prototype.getCurrentWeather = function () {
        var _this = this;
        //this is where we call getCurrentWeather 
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (weather) {
            //we wanna set the property on our weather data component property to the data we are getting back from the Observable
            //this is what we read from browser Inspect element -Object -> currently->...
            //After this we're gonna display on Template (weather.component.html)
            _this.weatherData.temp = weather["currently"]["temperature"],
                _this.weatherData.summary = weather["currently"]["summary"],
                _this.weatherData.wind = weather["currently"]["windSpeed"],
                _this.weatherData.humidity = weather["currently"]["humidity"],
                _this.weatherData.icon = weather["currently"]["icon"];
            console.log("Weather: ", _this.weatherData);
            //this is where we call the method for weather icon
            _this.setIcon();
            //place where we are curtain that weatherdata is received
            _this.dataReceived = true;
        }, function (err) { return console.error(err); });
    };
    WeatherComponent.prototype.getLocationName = function () {
        var _this = this;
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(function (location) {
            console.log(location); //TODO; REMOVE
            _this.currentLocation = location["results"][1]["formatted_address"];
            console.log("Name: ", _this.currentLocation); //TODO: REMOVE
        });
    };
    // toggle-click event to switch between kph to mph and celsius to fahrenheit....it's called in weather.component.html 
    //new method
    WeatherComponent.prototype.toggleUnits = function () {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    };
    WeatherComponent.prototype.toggleTempUnits = function () {
        if (this.currentTempUnit == "fahrenheit") {
            this.currentTempUnit = "celsius";
        }
        else {
            this.currentTempUnit = "fahrenheit";
        }
    };
    WeatherComponent.prototype.toggleSpeedUnits = function () {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        }
        else {
            this.currentSpeedUnit = "kph";
        }
    };
    //new method for icons
    WeatherComponent.prototype.setIcon = function () {
        this.icons.add("icon", this.weatherData.icon);
        //this will start the animation
        this.icons.play();
    };
    //new method where we gonna decide which weather-colors from constants.ts are gonna apply
    WeatherComponent.prototype.setStyles = function () {
        if (this.weatherData.icon) {
            //matching the color of icon with text under it...egzz.. sunshine-clear
            this.icons.color = constants_1.WEATHER_COLORS[this.weatherData.icon]["color"];
            return constants_1.WEATHER_COLORS[this.weatherData.icon];
        }
        else {
            this.icons.color = constants_1.WEATHER_COLORS["default"]["color"];
            return constants_1.WEATHER_COLORS["default"];
        }
    };
    return WeatherComponent;
}());
WeatherComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'weather-widget',
        templateUrl: 'weather.component.html',
        styleUrls: ['weather.component.css'],
        //this is for services 
        providers: [weather_service_1.WeatherService]
    }),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherComponent);
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map