import { Pipe, PipeTransform } from '@angular/core';

//decorator
@Pipe ({
    name : 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform{
    //method
    transform(speed: number, unitType: string) {
        //switch statement
        switch(unitType){
            case "mph":
            //this cleans the result...without decimal..this Number is an Object
            const miles = Number(speed * 1.6).toFixed(0);
            return miles + "mph";
            default:
            const kilo = Number(speed).toFixed(0);
            return kilo + "kph";
            
        }
    }
}