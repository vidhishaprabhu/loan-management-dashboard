import { Component } from '@angular/core';
import { DashboardServiceService, Loan } from '../dashboard-service.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [NgFor, NgClass, CommonModule, FormsModule,ButtonModule,InputTextModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loans: Loan[] = [];
  pendingLoans = 0;
  approvedLoans = 0;
  closedLoans = 0;
  rejectedLoans = 0;
  recentLoans: Loan[] = [];
  filterStatus: string = 'All';
  filterLoans: Loan[] = [];
  searchTerm: string = '';
  currentPage = 1;
  itemPerPage = 6;
  totalPage = 0;
  paginationLoan: Loan[] = [];
  sortDirectionAmount = '';
  sortDirectionEmi='';
  
  constructor(private dashboardService: DashboardServiceService) {}

  ngOnInit(): void {
    this.loans = this.dashboardService.getLoans();
    this.pendingLoans = this.dashboardService.getPendingLoans();
    this.approvedLoans = this.dashboardService.getApprovedLoans();
    this.closedLoans = this.dashboardService.getClosedLoans();
    this.rejectedLoans = this.dashboardService.getRejectedLoans();
    this.recentLoans = this.dashboardService.getRecentLoans();
    this.filterLoans = [...this.recentLoans];
    this.currentPage = 1;
    this.updatePagination();
  }
  filterByStatus(status: string) {
    this.filterStatus = status;
    if (this.filterStatus === 'All') {
      this.recentLoans = this.dashboardService.getRecentLoans();
      this.filterLoans = this.recentLoans;
    } else {
      this.recentLoans = this.dashboardService.getRecentLoans();
      this.filterLoans = this.recentLoans.filter(
        (loan) => loan.status === status
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }
  filterBySearch() {
    this.filterLoans = this.recentLoans.filter(
      (loan) =>
        loan.id
          .toString()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        loan.customerName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        loan.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        loan.amount.toString().includes(this.searchTerm.toString()) ||
        loan.emi.toString().includes(this.searchTerm.toString())
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemPerPage;
    const endIndex = startIndex + this.itemPerPage;

    this.paginationLoan = this.filterLoans.slice(startIndex, endIndex);

    this.totalPage = Math.ceil(this.filterLoans.length / this.itemPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }
  
  sortByAmount() {
    this.sortDirectionAmount = this.sortDirectionAmount === 'asc' ? 'desc' : 'asc';
    this.filterLoans.sort((a, b) =>
      this.sortDirectionAmount === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );
    console.log(this.filterLoans.map(l => l.amount));

    this.currentPage = 1;
    this.updatePagination();
  }
  sortByEmi() {
    this.sortDirectionEmi = this.sortDirectionEmi === 'asc' ? 'desc' : 'asc';
    this.filterLoans.sort((a, b) =>
      this.sortDirectionEmi === 'asc' ? a.emi - b.emi : b.emi - a.emi
    );
    console.log(this.filterLoans.map(l => l.emi));

    this.currentPage = 1;
    this.updatePagination();
  }
  
}
