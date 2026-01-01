import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServiceService, Loan } from '../dashboard-service.service';
import { Customer, CustomerService } from '../customer.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  imports: [NgFor],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  loans:Loan[]=[];
  customer:Customer[]=[];
  customerId:string='';
  loanId:string='';
  constructor(
  private route:ActivatedRoute,
  private customerService:CustomerService,
  private dashboardService:DashboardServiceService
  ){
    
  }
  ngOnInit():void{
    const customerId=this.route.snapshot.paramMap.get('id');
    if (customerId) {
    this.customer = this.customerService.getCustomerById(customerId);
    this.loans = this.dashboardService.getLoansByCustomerId(customerId);
    }
  }
   
  }
