import { Injectable } from '@angular/core';

export interface Loan {
  id: string;
  customerName: string;
  amount: number;
  outstandingAmount: number;
  emi: number;
  status: 'Pending' | 'Active' | 'Rejected' | 'Closed' | 'Overdue';
  emiDate:Date;
}

export interface EmiHistory {
  month: number;
  emiAmount: number;
  balance: number;
  date: Date;
  status: string;
  emiHistory?: EmiHistory[];
}



@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
   private loans: Loan[] = [
    { id: 'LN001', customerName: 'John Doe', amount: 50000,outstandingAmount: 20000, emi: 2000, status: 'Active',emiDate:new Date('2026-08-08') },
    { id: 'LN001', customerName: 'John Doe', amount: 80000,outstandingAmount: 30000, emi: 2000, status: 'Active',emiDate:new Date('2026-08-09') },
    { id: 'LN002', customerName: 'Jane Smith', amount: 75000, outstandingAmount: 40000,emi: 3000, status: 'Pending',emiDate:new Date('2026-08-08') },
    { id: 'LN003', customerName: 'Mark Lee', amount: 70000, outstandingAmount: 50000,emi: 2500, status: 'Active',emiDate:new Date('2026-08-08') },
    { id: 'LN004', customerName: 'Nikita', amount: 20000, outstandingAmount: 10000,emi: 2500, status: 'Closed',emiDate:new Date('2026-08-08') },
    { id: 'LN005', customerName: 'Janavi', amount: 10000,outstandingAmount: 5000, emi: 2500, status: 'Rejected',emiDate:new Date('2026-08-08') },
    { id: 'LN006', customerName: 'Kamal', amount: 60000,outstandingAmount: 50000, emi: 2500, status: 'Active',emiDate:new Date('2026-08-08') },
    { id: 'LN007', customerName: 'Komal', amount: 60000, outstandingAmount: 50000,emi: 2500, status: 'Active',emiDate:new Date('2025-08-08') },
    { id: 'LN008', customerName: 'Nilkamal', amount: 60000,outstandingAmount:0, emi: 2500, status: 'Active',emiDate:new Date('2026-08-08') },
  ];

  constructor() { }
  getLoans():Loan[]{
    return this.loans;
  }
  getLoansByCustomerId(customerId: string): Loan[] {
  return this.loans.filter(loan => loan.id === customerId);
  }

  getPendingLoans():number{
    return this.loans.filter(
      loan=>loan.status==='Pending'
    ).length;
  }
  getApprovedLoans():number{
    return this.loans.filter(loan=>loan.status==='Active').length;
  }
  getClosedLoans():number{
    return this.loans.filter(loan=>loan.status==='Closed').length;
  }
  getRejectedLoans():number{
    return this.loans.filter(loan=>loan.status==='Rejected').length;
  }
  getRecentLoans(limit: number=20) {
  return [...this.loans]
    .sort((a, b) => new Date(b.emiDate).getTime() - new Date(a.emiDate).getTime())
    .slice(0, limit);
  }
  getCountByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId);
  }
  getActiveByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Active');
  }
  getClosedByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Closed');
  }
  getRejectedByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Rejected');
  }
  getOutstandingByCustomerId(customerId:string):number{
    return this.loans.filter(loan=>loan.id===customerId && loan.amount>0).reduce((sum,loan)=>sum+loan.amount,0);
  }
  getLoanStatuses(loan:Loan){
    if(loan.outstandingAmount===0){
      return 'Closed';
    }
    if(loan.status==='Rejected'){
      return 'Rejected';
    }
    if(loan.emiDate<new Date() && loan.outstandingAmount>0){
      return 'Overdue';
    }
    return 'Active';
  }
}
