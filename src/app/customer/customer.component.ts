import { Component } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-customer',
  imports: [NgFor],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  constructor(private customerService:CustomerService,
    private router:Router,
    private excelService:ExcelService,
    private pdfService:PdfService
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
  exportToExcel():void{
    this.excelService.exportCustomerToExcel(this.customers,'customers_details');
  }
  exportToPDF():void{
    this.pdfService.exportCustomersToPDF(this.customers,'customers_details');
    
  }

}
