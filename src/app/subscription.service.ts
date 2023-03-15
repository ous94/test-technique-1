import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }

  getPriceArray(){
   return [
    {
      "subscription_plans": [

        {
          "duration_amonths":12,
          "price_usd_per_gb":2
        },
        {
          "duration_amonths":6,
          "price_usd_per_gb":2.5
        },
        {
          "duration_amonths":3,
          "price_usd_per_gb":3
        },
      ]

    }
   ]
  }
  
}
