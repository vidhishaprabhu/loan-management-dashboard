import { Injectable } from '@angular/core';
import { Loan } from './dashboard-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportLoansToExcel(loans: Loan[], fileName: string): void {
    // Map the loan objects to a format suitable for Excel
    const exportData = loans.map(loan => ({
      'Loan ID': loan.id,
      'Customer Name': loan.customerName,
      'Loan Amount': loan.amount,
      'EMI': loan.emi,
      'Status': loan.status,
      'Created Date': loan.createdDate.toLocaleDateString()
    }));

    // Convert JSON to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Loans': worksheet },
      SheetNames: ['Loans']
    };

    // Write workbook to buffer
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Save as file
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const date=new Date().getDate();
    saveAs(blob, `${fileName}_${date}.xlsx`);
  }


}
