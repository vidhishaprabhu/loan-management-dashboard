import { Component } from '@angular/core';
import { DashboardServiceService, Loan } from '../dashboard-service.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor,NgClass,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  loans:Loan[]=[];
  pendingLoans=0;
  approvedLoans=0;
  closedLoans=0;
  rejectedLoans=0;
  recentLoans:Loan[]=[];
  filterStatus:string='';
  filterLoans:Loan[]=[];
  constructor(private dashboardService:DashboardServiceService){}

  ngOnInit():void{
    this.loans=this.dashboardService.getLoans();
    this.pendingLoans=this.dashboardService.getPendingLoans();
    this.approvedLoans=this.dashboardService.getApprovedLoans();
    this.closedLoans=this.dashboardService.getClosedLoans();
    this.rejectedLoans=this.dashboardService.getRejectedLoans();
  }
  filterByStatus(status:string){
    this.filterStatus=status;
    if(this.filterStatus === 'All') {
      this.recentLoans = this.dashboardService.getRecentLoans();
  this.filterLoans = this.recentLoans; 
} else {

  this.recentLoans = this.dashboardService.getRecentLoans();
  this.filterLoans=this.recentLoans.filter(loan=>loan.status===status);

}


  }

}
