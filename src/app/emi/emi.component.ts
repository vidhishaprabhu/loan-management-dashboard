import { Component } from '@angular/core';
import { EmiService } from '../emi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-emi',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './emi.component.html',
  styleUrl: './emi.component.css'
})
export class EmiComponent {
  constructor(private emiService:EmiService){}

  emi:number=0;
  principal:number=0;
  annualRate:number=0;
  tenure:number=0;

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
}
