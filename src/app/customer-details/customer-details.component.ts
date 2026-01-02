import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServiceService, Loan } from '../dashboard-service.service';
import { Customer, CustomerService } from '../customer.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ExcelService } from '../excel.service';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-customer-details',
  imports: [NgFor,NgClass],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  loans:Loan[]=[];
  customer:Customer[]=[];
  customerId:string='';
  loanId:string='';
  count:number=0;
  activeCount:number=0;
  closedCount:number=0;
  rejectedCount:number=0;
  outstanding:number=0;
  constructor(
  private route:ActivatedRoute,
  private customerService:CustomerService,
  private dashboardService:DashboardServiceService,
  private excelService:ExcelService,
  private pdfService:PdfService
  ){
    
  }
  ngOnInit():void{
    const customerId=this.route.snapshot.paramMap.get('id');
    if (customerId) {
    this.customer = this.customerService.getCustomerById(customerId);
    this.loans = this.dashboardService.getLoansByCustomerId(customerId);
    this.count=this.dashboardService.getCountByCustomerId(customerId).length;
    this.activeCount=this.dashboardService.getActiveByCustomerId(customerId).length;
    this.closedCount=this.dashboardService.getClosedByCustomerId(customerId).length;
    this.rejectedCount=this.dashboardService.getRejectedByCustomerId(customerId).length;
    this.outstanding=this.dashboardService.getOutstandingByCustomerId(customerId);
    }
  }
   
  }
