import { Injectable } from '@angular/core';

export interface Loan {
  id: string;
  customerName: string;
  amount: number;
  emi: number;
  status: string;
  createdDate:Date;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
   private loans: Loan[] = [
    { id: 'LN001', customerName: 'John Doe', amount: 50000, emi: 2000, status: 'Approved',createdDate:new Date('2024-06-12') },
    { id: 'LN002', customerName: 'Jane Smith', amount: 75000, emi: 3000, status: 'Pending',createdDate:new Date('2024-08-08') },
    { id: 'LN003', customerName: 'Mark Lee', amount: 60000, emi: 2500, status: 'Approved',createdDate:new Date('2024-05-13') },
    { id: 'LN004', customerName: 'Nikita', amount: 60000, emi: 2500, status: 'Closed',createdDate:new Date('2025-06-18') },
    { id: 'LN005', customerName: 'Janavi', amount: 60000, emi: 2500, status: 'Rejected',createdDate:new Date('2025-06-17') },
    { id: 'LN006', customerName: 'Ram', amount: 60000, emi: 2500, status: 'Rejected',createdDate:new Date('2024-06-12') }
  ];

  constructor() { }
  getLoans():Loan[]{
    return this.loans;
  }
  getPendingLoans():number{
    return this.loans.filter(
      loan=>loan.status==='Pending'
    ).length;
  }
  getApprovedLoans():number{
    return this.loans.filter(loan=>loan.status==='Approved').length;
  }
  getClosedLoans():number{
    return this.loans.filter(loan=>loan.status==='Closed').length;
  }
  getRejectedLoans():number{
    return this.loans.filter(loan=>loan.status==='Rejected').length;
  }
  getRecentLoans(limit:number=5){
    return [...this.loans].sort((a,b)=>new Date(b.createdDate).getTime()-new Date(a.createdDate).getTime()).slice(0,limit)
  }
  // getFilterByStatus(status:string){
  //   return this.loans.filter(loan=>loan.status===status)
  // }
}
