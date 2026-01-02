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
}
