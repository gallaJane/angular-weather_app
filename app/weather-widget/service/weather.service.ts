import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
//this is how we import part of rxjs library, cuz it's huge
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORECAST_KEY, FORECAST_ROOT, GOOGLE_KEY, GOOGLE_ROOT } from '../constants/constants';


@Injectable()

export class WeatherService {

    //we create constructor(this is for observable part) where we gonna allow a instance of the jsonp service, to be injected, using dependency injection
    constructor(private jsonp: Jsonp, private http: Http) { }

    //method, with MUST return type in this case :[number, number ] is typical array with 2 elements, when we know exactly where we wanna store elements..for ex. longitude and latitude
    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                //HAPPY PART- geolocation is available, we can use method we need. It has 3 methods... pos=> arow function(anonimus function and this pos is return parametar)
                navigator.geolocation.getCurrentPosition(pos => {
                    // the next piece of data that I wanna make available by the Observable is whatever we put in (pos)
                    observer.next(pos);
                }),
                    // and this one if its not success
                    err => {
                        return Observable.throw(err);
                    }
            });
        } else {

            return Observable.throw("Geolocation is not available");
        }
    }


    //new method  //define parameters and return type (: Observables, which can contain any type of data)
    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        // queryParameters are parts of data that we pass in on the end of url
        const queryParams = "?callback=JSONP_CALLBACK";

        //we wanna return our Observable
        // .jsonp means, we are usin jsonp service to perform getrequest
        return this.jsonp.get(url + queryParams)
            //and now we wanna do something with the data we get back and to do that , we are goin to use .map operator
            //what map operator does is, takes the response data from the call(getRequest) and than transforms it somewhere and than provides it by an Observable
            // Full response from getRequest it will contain Json Object and that JSON Object is the body of response, which will contain our weatherData
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather data - ", err);
                return Observable.throw(err.json());
            });
        //now we are goin to call this in weather component
    }

    getLocationName(lat: number, long: number): Observable<any> {
        const url = GOOGLE_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GOOGLE_KEY;

        return this.http.get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location - ", err);
                return Observable.throw(err);
            });
    }


}