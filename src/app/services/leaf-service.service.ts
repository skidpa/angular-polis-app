import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeafServiceService {
    polisenApi = 'https://polisen.se/api/events';
    reverseUrl = 'https://api.opencagedata.com/geocode/v1/json?q=';
    city = 'växjö';
    apiKey = '&key=2ccaca2ea1554aeb998f376f4c558340';

    //let cityUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city +" &key=8099a9a9a04b4b54b486153adc12edff";

    constructor(private http:HttpClient) { }

    public getCrimeCity(city){
        this.city = city;
        return this.http.get(this.reverseUrl + this.city + this.apiKey)
    }

    public getCrime(){

        return this.http.get<any[]>(this.polisenApi);
    }
}
