import { Component } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';
import { PdfService } from '../pdf.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule],
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
  filteredCustomers:Customer[]=[];
  allCustomers:Customer[]=[];
  paginateCustomers:Customer[]=[];
  customerId:string='';
  loanId:string='';
  searchTerm: string = '';
  currentPage = 1;
  itemPerPage = 6;
  totalPage = 0;

  ngOnInit():void{
    this.allCustomers=this.customerService.getCustomers();
    // this.customerId=this.customerService.getCustomerById(this.customerId);
    this.customers = [...this.allCustomers];
    this.updatePagination();
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
  filterBySearch() {
    this.customers= this.customers.filter(
      (customer) =>
        customer.id
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        customer.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        customer.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.outstandingAmount.toString().includes(this.searchTerm.toString()) ||
        customer.email.includes(this.searchTerm.toString())
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  resetSearch(){
    this.searchTerm='';
    this.customers=[...this.allCustomers];
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemPerPage;
    const endIndex = startIndex + this.itemPerPage;

    this.paginateCustomers = this.customers.slice(startIndex, endIndex);

    this.totalPage = Math.ceil(this.customers.length / this.itemPerPage);
  }
  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

}
