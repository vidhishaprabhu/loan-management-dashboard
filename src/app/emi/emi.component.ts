import { Component } from '@angular/core';
import { EmiService } from '../emi.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-emi',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor],
  templateUrl: './emi.component.html',
  styleUrl: './emi.component.css'
})
export class EmiComponent {
  constructor(private emiService:EmiService){}

  emi:number=0;
  principal:number=0;
  annualRate:number=0;
  tenure:number=0;
  totalPayment:number=0;
  emiSchedule:any[]=[];
  ngOnInit():void{
    

  }
  calculateEmi():void{
    this.emi=this.emiService.calculateEmi(this.principal,this.annualRate,this.tenure);
  }
onPrincipalChange(event: Event) {
  this.principal = +(event.target as HTMLInputElement).value;
}
  onRateChange(event: Event) {
  this.annualRate = +(event.target as HTMLInputElement).value;
}

onTenureChange(event: Event) {
  this.tenure = +(event.target as HTMLInputElement).value;
}
reset(){
  this.principal=0;
  this.annualRate=0;
  this.tenure=0;
  this.emi=0;
}
resetTotalAmountPayable(){
  this.totalPayment=0;
}
totalAmountPayable(){
  this.totalPayment = this.emiService.calculateTotalPayment(this.emi,this.tenure);
}
generateSchedule(){
  this.emiSchedule=this.emiService.generateEmiSchedule(this.principal,this.annualRate,this.tenure,this.emi);
  console.log(this.principal,this.annualRate,this.tenure,this.emi);
}
}
