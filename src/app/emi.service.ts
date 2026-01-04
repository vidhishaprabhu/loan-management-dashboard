import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmiService {

  constructor() { }

  calculateEmi(principal:number,annualRate:number,tenure:number):number{
    const monthlyRate = annualRate/12/100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  }
  calculateTotalPayment(emi:number,tenure:number):number{
    return Math.round(emi*tenure);
  }
  generateEmiSchedule(principal:number,annualRate:number,tenure:number,emi:number){
    const schedule=[];
    let outstanding=principal;
    const monthlyRate=annualRate/12/100;
    for(let i=1;i<=tenure;i++){
      const interest=outstanding*monthlyRate;
      const priciplePaid=emi-interest;
      const closingBalance=outstanding-priciplePaid;
      schedule.push({
        month:i,
        openingBalance:Math.round(outstanding),
        emi:Math.round(emi),
        principalPaid:Math.round(priciplePaid),
        interestPaid:Math.round(interest),
        closingBalance:Math.round(closingBalance)
      });
      outstanding=closingBalance;
    }
    return schedule;
  }
}
