/*
 * Angular 2 decorators and services
 */
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {OfferService,Offer} from '../services/offer.service';
import {OfferResponse} from '../services/offer.service';
import {  SessionService } from 'angular2-nexus-uiux/services';

import { AppConfigService } from 'angular2-nexus-uiux/services';

/*
 * App Component
 * Top Level Component
 */
@Component({
  templateUrl: 'offer.component.html',
  providers:[SessionService]
})

export class OfferComponent implements OnInit{
   private offers : Offer[];
   private message: string;
		constructor(private _offerService: OfferService) {
       
       
  	}	
     ngOnInit(): void {
            console.log("inside ng init");
             this._offerService.getOffers()
                .subscribe(
                  resp =>{
                    this.message=resp["content"];
                    this.offers = resp["offers"];
                    console.log(this.message+" "+ JSON.stringify(resp)+" ");
                })
     }          

}