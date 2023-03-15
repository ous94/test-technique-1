import { Component } from '@angular/core';
import {FormGroup,Validators,FormBuilder } from '@angular/forms';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testTechnique1';
  subscription!: FormGroup;
  payment!: FormGroup;
  confirmation!: FormGroup;
  subscription_step = false;
  payment_step = false;
  confirmation_step = false;
  step = 1;
  totalPrice!: number ;
  pricesArray: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private subscriptionService: SubscriptionService) { }
  ngOnInit() {
    this.pricesArray = this.subscriptionService.getPriceArray()[0].subscription_plans;

        this.subscription = this.formBuilder.group({
            duration: [this.pricesArray[0], Validators.required],
            amount: ['5', Validators.required],
            upfront: ['false',Validators.required]
        });
        this.payment = this.formBuilder.group({
            credit_card_number: ['', Validators.required],
            credit_card_expiration_date: ['', Validators.required],
            credit_card_security_code: ['',Validators.required]
        });
        this.confirmation = this.formBuilder.group({
            email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,100}$'), Validators.required,]],            
            terms_and_conditions: [false,Validators.required]
        });
  }
  get subscriptionControls() { return this.subscription.controls; }
  get paymentControls() { return this.payment.controls; }
  get confirmationcontrols() { return this.confirmation.controls; }
  next(){
    if(this.step==1){
          this.subscription_step = true;
          if (this.subscription.invalid) { 
            return 
          }else{
            if(this.subscription.value.duration["duration_amonths"] ==3){
              this.totalPrice  =this.subscription.value.duration["duration_amonths"]
            }
            if(this.subscription.value.duration["duration_amonths"]  ==6){
              this.totalPrice  = Number(this.subscription.value.amount * 6 )/ Number(this.subscription.value.duration["price_usd_per_gb"]) ;
            }
            if(this.subscription.value.duration["duration_amonths"]  ==12){
             this.totalPrice  = Number(this.subscription.value.amount * 12 )/ Number(this.subscription.value.duration["price_usd_per_gb"]) ;

            }
            if(this.subscription.value.upfront =='true'){
              this.totalPrice  = Number( this.totalPrice ) - Number( this.totalPrice /10) ;
            }      
            this.step++

          }
        
         
    }
    else if(this.step==2){
        this.payment_step = true;
        if (this.payment.invalid) { return }
            this.step++;
        return
    }

  }
  previous(){
    this.step--
    if(this.step==1){
      this.subscription_step = false;
    }
    if(this.step==2){
      this.confirmation_step = false;
    }
  }
  submit(){
    if(this.step==3){
      this.confirmation_step = true;
      if (this.confirmation.invalid) { return }
    }
  }
}