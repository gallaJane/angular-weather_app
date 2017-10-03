import { Component } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';



@Component({

    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    //ovo je za services 
    providers: [WeatherService]
})

export class WeatherComponent {
    //somewhere to save the position
    pos: Position;
    weatherData= new Weather(null, null, null, null, null);

    // dependency injection 
    constructor(private service: WeatherService) {
        this.service.getCurrentLocation()
            //this subscribe will only run when up ↑ (getCurrentLocation) is completed
            .subscribe(position => {
                // just to save the data in position property
                this.pos = position
                //this is where we call getCurrentWeather 
                this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
                    // for Observables, if we want anything to happen, we need to subscribe to it
                    .subscribe(weather => console.log(weather),
                    err => console.error(err));
            },
            err => console.log(err));

    }
}