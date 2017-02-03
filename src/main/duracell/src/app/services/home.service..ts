import { Injectable } from '@angular/core';

import { Observable }     from 'rxjs/Rx';

import { HttpService }     from 'angular2-nexus-uiux/services';
import { Headers, Http,Response } from '@angular/http';

export interface Offer{
	id:number;
	term:string;
	rate:string;
}

export interface OfferResponse {
  offers: Offer[];
  content: string;

}

@Injectable()
export class OfferService {
	//private offers:Offer[];
	
	constructor(private _http: Http, private _httpService: HttpService) {
	}  
	

	getOffers(): Observable<OfferResponse>{
		
	 //return  this._http.get('http://localhost:7878/offers').map((response: Response) => (<OfferResponse>response.json())).do(data=> console.log(JSON.stringify(data)));
	 return  this._http.get('https://aogcifservice2.cfapps-gcg-gtdc1.citipaas-dev.dyn.nsroot.net/evenOddFinder?number=4').map((response: Response) => (response.json())).do(data=> console.log(JSON.stringify(data)));
	}

	   private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }            

}