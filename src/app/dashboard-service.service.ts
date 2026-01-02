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
    { id: 'LN001', customerName: 'John Doe', amount: 50000, emi: 2000, status: 'Approved',createdDate:new Date('2025-08-08') },
    { id: 'LN002', customerName: 'Jane Smith', amount: 75000, emi: 3000, status: 'Pending',createdDate:new Date('2025-08-08') },
    { id: 'LN003', customerName: 'Mark Lee', amount: 70000, emi: 2500, status: 'Approved',createdDate:new Date('2025-08-08') },
    { id: 'LN004', customerName: 'Nikita', amount: 20000, emi: 2500, status: 'Closed',createdDate:new Date('2025-08-08') },
    { id: 'LN005', customerName: 'Janavi', amount: 10000, emi: 2500, status: 'Rejected',createdDate:new Date('2025-08-08') },
    { id: 'LN006', customerName: 'Kamal', amount: 60000, emi: 2500, status: 'Approved',createdDate:new Date('2025-08-08') },
    { id: 'LN007', customerName: 'Komal', amount: 60000, emi: 2500, status: 'Approved',createdDate:new Date('2025-08-08') },
    { id: 'LN008', customerName: 'Nilkamal', amount: 60000, emi: 2500, status: 'Approved',createdDate:new Date('2025-08-08') },
    
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
    return this.loans.filter(loan=>loan.status==='Approved').length;
  }
  getClosedLoans():number{
    return this.loans.filter(loan=>loan.status==='Closed').length;
  }
  getRejectedLoans():number{
    return this.loans.filter(loan=>loan.status==='Rejected').length;
  }
  getRecentLoans(limit: number=20) {
  return [...this.loans]
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, limit);
  }
  getCountByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId);
  }
  getActiveByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Approved');
  }
  getClosedByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Closed');
  }
  getRejectedByCustomerId(customerId:string):Loan[]{
    return this.loans.filter(loan=>loan.id===customerId && loan.status==='Rejected');
  }
}
