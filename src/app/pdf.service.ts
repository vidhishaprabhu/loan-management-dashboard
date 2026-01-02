import { Injectable } from '@angular/core';
import { Loan } from './dashboard-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Customer } from './customer.service';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  exportLoansToPDF(loans: Loan[], fileName: string = 'Loan_Report') {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['Loan ID', 'Customer Name', 'Amount', 'EMI', 'Status', 'Created Date']],
    body: loans.map(loan => [
      loan.id,
      loan.customerName,
      loan.amount,
      loan.emi,
      loan.status,
      loan.createdDate.toLocaleDateString()
    ]),
    startY: 20
  });

  doc.setFontSize(16);
  doc.text('Loan Report', 14, 15);

  const date=new Date().getFullYear();
  doc.save(`${fileName}_${date}.pdf`);
}

exportCustomersToPDF(customers: Customer[], fileName: string = 'Customer_Report') {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['Loan ID', 'Customer Name', 'Amount', 'EMI', 'Status', 'Created Date']],
    body: customers.map(customer => [
      customer.id,
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      customer.outstandingAmount,
      customer.status,
      customer.dob
    ]),
    startY: 20
  });

  doc.setFontSize(16);
  doc.text('Loan Report', 14, 15);

  const date=new Date().getFullYear();
  doc.save(`${fileName}_${date}.pdf`);
}

}
