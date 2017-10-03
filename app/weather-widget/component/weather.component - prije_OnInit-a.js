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
var WeatherComponent = (function () {
    // dependency injection 
    function WeatherComponent(service) {
        var _this = this;
        this.service = service;
        this.weatherData = new weather_1.Weather(null, null, null, null, null);
        this.service.getCurrentLocation()
            .subscribe(function (position) {
            // just to save the data in position property
            _this.pos = position;
            //this is where we call getCurrentWeather 
            _this.service.getCurrentWeather(_this.pos.coords.latitude, _this.pos.coords.longitude)
                .subscribe(function (weather) { return console.log(weather); }, function (err) { return console.error(err); });
        }, function (err) { return console.log(err); });
    }
    return WeatherComponent;
}());
WeatherComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'weather-widget',
        templateUrl: 'weather.component.html',
        styleUrls: ['weather.component.css'],
        //ovo je za services 
        providers: [weather_service_1.WeatherService]
    }),
    __metadata("design:paramtypes", [weather_service_1.WeatherService])
], WeatherComponent);
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component - prije_OnInit-a.js.map