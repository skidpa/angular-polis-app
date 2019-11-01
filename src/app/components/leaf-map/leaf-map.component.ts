import { Component, OnInit } from '@angular/core';
import { LeafServiceService } from '../../services/leaf-service.service';

import leaflet from 'leaflet';

@Component({
  selector: 'app-leaf-map',
  templateUrl: './leaf-map.component.html',
  styleUrls: ['./leaf-map.component.css'],
})
export class LeafMapComponent implements OnInit {
	//map:any
	crime = 'Murder';
    result = "Police shot the victim";
    test:any[] = [];
    crimeList:any[] = [];
    cityArr = [];
    crimeArr = [];
    cordinates;
    markerArr = [];
    mymap = null;
    //mapLayer;
    crimeCity = ''
    cityLat;
    cityLong;
    cityZoom = 7;
    swedenLat = 60.1282;
    swedenLong = 18.6435;
    swedenZoom = 4;
    nrOfCrimes = 0;
    marker;

    constructor(private leafService: LeafServiceService) { }
    
    getCrime(): void {
        this.leafService.getCrime().toPromise()
        .then((data) => {
            let crimeId = 0;
            data.forEach(crimeObj => {
                //console.log(crimeObj['location'].name);
                this.crimeList[crimeId++] = crimeObj;
                //this.cityArr.push(crimeObj['location'].name);
                if(this.cityArr.indexOf(crimeObj['location'].name) < 0){
                    this.cityArr.push(crimeObj['location'].name);
                    //console.log('---- pushed city to arr -----');
                }
            });
         })
        .then(() => {
            console.log('city arr: ' + this.cityArr.length);
            this.mapInit();
        });
   }
   
    searchCityCrime(city): void{
        this.leafService.getCrimeCity(city).toPromise()
            .then((data) => {
                this.cityLat = data['results'][0]['geometry']['lat'];
                this.cityLong = data['results'][0]['geometry']['lng'];
                console.log(this.cityLat + ":" + this.cityLong);
            })
            .then(() => {
                this.clearCrime();
            })
            .then(() => {
                console.log('lat: {1} long {2}', this.cityLat, this.cityLong);
                this.mapUpdate(this.cityLat, this.cityLong, this.cityZoom);
                //this.mapPlaceCrime(city);
                this.searchCrime(this.cityLat, this.cityLong);
                /*if(this.clearCrime()){
                }*/
                //this.displayCrime(city);
            });
    }


    mapInit(): void {
        this.mymap = leaflet.map('mapid').setView([this.swedenLat, this.swedenLong], this.swedenZoom);
        let streetMap =  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
  	        {
		        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                //id: this.mapType,
		        accessToken: 'pk.eyJ1Ijoic2tpZHBhIiwiYSI6ImNrMmQydXhtaDF0MHMzYm9icm51cXIyMWsifQ._F2tibmxmW-JInEcSBWjDg'
            }).addTo(this.mymap);
        
        let satMap=  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
  	        {
		        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.satellite',
                //id: this.mapType,
		        accessToken: 'pk.eyJ1Ijoic2tpZHBhIiwiYSI6ImNrMmQydXhtaDF0MHMzYm9icm51cXIyMWsifQ._F2tibmxmW-JInEcSBWjDg'
            }).addTo(this.mymap);
        
        
        leaflet.control.layers({
            Street: streetMap,
            Satellite: satMap
            }, null, {
                collapsed: false
                }).addTo(this.mymap);
    }

    mapUpdate(lat, long, zoom): void {
        this.mymap.setView([lat, long],zoom);
    }

    mapPlaceCrime(city){
        this.crimeList.forEach(crimeObj => {

            //console.log(crimeObj['location'].name);
            if(crimeObj['location'].name === city){
                console.log('mapplace');
                console.log(crimeObj['summary']);
                console.log(crimeObj['location'].gps);
                let cords = crimeObj['location'].gps.split(',', 2);
                cords[0] = parseFloat(cords[0]);
                cords[1] = parseFloat(cords[1]);
                this.marker = leaflet.marker([cords[0], cords[1]]).addTo(this.mymap);
                this.marker.bindPopup("<b> hej </b>");
                //marker.bindPopup('<b>hej</b');
                this.markerArr.push(this.marker);
            }
        });
    }

    clearCrime(): boolean {
        this.markerArr.forEach(marker => {
            this.mymap.removeLayer(marker);
        });
        return true;
    }

    displayCrime(city): void{
        this.crimeArr = [];
        this.crimeList.forEach(crimeObj => {
            if(crimeObj['location'].name === city){
                this.crimeArr.push(crimeObj);
            }
        })
    }

    findCrimeOccurance(lat, long){
        this.crimeArr.forEach(crimeObj =>{
            
            //if(lat === )
        })
    }

    searchCrime(lat, long){
        let crimeLat;
        let crimeLong;
        let crimeCords;
        this.crimeArr = [];
        this.nrOfCrimes = 0;
        this.crimeList.forEach(crimeObj => {
            crimeCords = crimeObj['location'].gps.split(',', 2);
            crimeLat = parseInt(crimeCords[0]);
            crimeLong = parseInt(crimeCords[1]);

            if(parseInt(lat) === crimeLat && parseInt(long) == crimeLong){
                let marker = leaflet.marker([crimeCords[0], crimeCords[1]]).addTo(this.mymap);
                marker.bindPopup("<b>" + crimeObj['location'].name + "</b>").openPopup();
                this.markerArr.push(marker);
                this.crimeArr.push(crimeObj);
            }
        });

    }


    mapTest(): void {
        //var mymap = leaflet.map('mapid').setView([51.505, -0.09], 13);
        this.mymap = leaflet.map('mapid').setView([this.swedenLat, this.swedenLong], this.swedenZoom);
        /*for (let i= 0; i < 500; i++) {
            let cords = this.crimeList[i].location.gps.split(',', 2);
            cords[0] = parseFloat(cords[0]);
            cords[1] = parseFloat(cords[1]);
            this.crime = this.crimeList[i].type;
            this.result = this.crimeList[i].summary;
   	        let suck = leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
  	        {
		        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		        maxZoom: 18,
		        id: 'mapbox.streets',
		        accessToken: 'pk.eyJ1Ijoic2tpZHBhIiwiYSI6ImNrMmQydXhtaDF0MHMzYm9icm51cXIyMWsifQ._F2tibmxmW-JInEcSBWjDg'
	        }).addTo(this.mymap);

            let marker = leaflet.marker([cords[0], cords[1]]).addTo(this.mymap);

            marker.bindPopup("<b>" + this.crime + "</b><br>"+ this.result);
           
        }*/

         let suck =  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
  	        {
		        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		        maxZoom: 18,
                id: 'mapbox.street',
		        accessToken: 'pk.eyJ1Ijoic2tpZHBhIiwiYSI6ImNrMmQydXhtaDF0MHMzYm9icm51cXIyMWsifQ._F2tibmxmW-JInEcSBWjDg'
	        }).addTo(this.mymap);

           let marker = leaflet.marker([this.swedenLat, this.swedenLong]).addTo(this.mymap);

            marker.bindPopup("<b>" + this.crime + "</b><br>"+ this.result);
           

  	
    }

    testCrime(): void {
         let marker = leaflet.marker([this.cordinates[0], this.cordinates[1]]).addTo(this.mymap);

        marker.bindPopup("<b>" + this.crime + "</b><br>"+ this.result);

    }

   
    ngOnInit() {
        this.getCrime();
        //this.mapInit();
        //this.crimeCity = 'Åkersberga'
        //this.mapInit();
        //this.searchCityCrime(this.crimeCity);

    }

}
