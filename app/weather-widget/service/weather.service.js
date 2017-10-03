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
var http_1 = require("@angular/http");
var observable_1 = require("rxjs/observable");
//this is how we import part of rxjs library, cuz it's huge
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var constants_1 = require("../constants/constants");
var WeatherService = (function () {
    //we create constructor(this is for observable part) where we gonna allow a instance of the jsonp service, to be injected, using dependency injection
    function WeatherService(jsonp, http) {
        this.jsonp = jsonp;
        this.http = http;
    }
    //method, with MUST return type in this case :[number, number ] is typical array with 2 elements, when we know exactly where we wanna store elements..for ex. longitude and latitude
    WeatherService.prototype.getCurrentLocation = function () {
        if (navigator.geolocation) {
            return observable_1.Observable.create(function (observer) {
                //HAPPY PART- geolocation is available, we can use method we need. It has 3 methods... pos=> arow function(anonimus function and this pos is return parametar)
                navigator.geolocation.getCurrentPosition(function (pos) {
                    // the next piece of data that I wanna make available by the Observable is whatever we put in (pos)
                    observer.next(pos);
                }),
                    // and this one if its not success
                    function (err) {
                        return observable_1.Observable.throw(err);
                    };
            });
        }
        else {
            return observable_1.Observable.throw("Geolocation is not available");
        }
    };
    //new method  //define parameters and return type (: Observables, which can contain any type of data)
    WeatherService.prototype.getCurrentWeather = function (lat, long) {
        var url = constants_1.FORECAST_ROOT + constants_1.FORECAST_KEY + "/" + lat + "," + long;
        // queryParameters are parts of data that we pass in on the end of url
        var queryParams = "?callback=JSONP_CALLBACK";
        //we wanna return our Observable
        // .jsonp means, we are usin jsonp service to perform getrequest
        return this.jsonp.get(url + queryParams)
            .map(function (data) { return data.json(); })
            .catch(function (err) {
            console.error("Unable to get weather data - ", err);
            return observable_1.Observable.throw(err.json());
        });
        //now we are goin to call this in weather component
    };
    WeatherService.prototype.getLocationName = function (lat, long) {
        var url = constants_1.GOOGLE_ROOT;
        var queryParams = "?latlng=" + lat + "," + long + "&key=" + constants_1.GOOGLE_KEY;
        return this.http.get(url + queryParams)
            .map(function (loc) { return loc.json(); })
            .catch(function (err) {
            console.error("Unable to get location - ", err);
            return observable_1.Observable.throw(err);
        });
    };
    return WeatherService;
}());
WeatherService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Jsonp, http_1.Http])
], WeatherService);
exports.WeatherService = WeatherService;
//# sourceMappingURL=weather.service.js.map