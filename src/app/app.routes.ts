import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { LoansComponent } from './loans/loans.component';
import { ReportsComponent } from './reports/reports.component';
import { EmiComponent } from './emi/emi.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

export const routes: Routes = [
  {
    path:'',component:DashboardComponent
  },
  {
    path:'customer',component:CustomerComponent
  },
  {
    path:'customer/:id',component:CustomerDetailsComponent

  },
  {
    path:'loans',component:LoansComponent
  },
  {
    path:'reports',component:ReportsComponent
  },
  {
    path:'emi',component:EmiComponent
  }
];
