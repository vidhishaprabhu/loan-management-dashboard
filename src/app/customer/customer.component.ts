import { Component } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [NgFor],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  constructor(private customerService:CustomerService,
    private router:Router,
  ){
  }
  customers:Customer[]=[];
  customerId:string='';
  loanId:string='';

  ngOnInit():void{
    this.customers=this.customerService.getCustomers();
    // this.customerId=this.customerService.getCustomerById(this.customerId);
  }
  viewCustomerDetails(customerId:string):void{
    this.router.navigate(['/customer',customerId]);
  }

}
