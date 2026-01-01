import { Injectable } from '@angular/core';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  outstandingAmount: number;
  status: string; 
  dob: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
    {
    id: 'LN001',
    name: 'John Doe',
    outstandingAmount: 50000,
    status: 'Active',
    email: 'john@example.com',
    phone: '9876543210',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN002',
    name: 'Jane Smith',
    outstandingAmount: 75000,
    status: 'Active',
    email: 'jane@example.com',
    phone: '9876543211',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN003',
    name: 'Mark Lee',
    outstandingAmount: 70000,
    status: 'Active',
    email: 'mark@example.com',
    phone: '9876543212',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN004',
    name: 'Nikita',
    outstandingAmount: 0,
    status: 'Inactive',
    email: 'nikita@example.com',
    phone: '9876543213',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN005',
    name: 'Janavi',
    outstandingAmount: 0,
    status: 'Inactive',
    email: 'janavi@example.com',
    phone: '9876543214',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN006',
    name: 'Kamal',
    outstandingAmount: 60000,
    status: 'Active',
    email: 'kamal@example.com',
    phone: '9876543215',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN007',
    name: 'Komal',
    outstandingAmount: 60000,
    status: 'Active',
    email: 'komal@example.com',
    phone: '9876543216',
    address: '123 Street, City',
    dob: '1990-01-01'
  },
  {
    id: 'LN008',
    name: 'Nilkamal',
    outstandingAmount: 60000,
    status: 'Active',
    email: 'nilkamal@example.com',
    phone: '9876543217',
    address: '123 Street, City',
    dob: '1990-01-01'
  }

  ];
  getCustomers():Customer[]{
    return this.customers;
  }
  // getCustomerById(customerId: string): Customer[]{
  //   return this.customers.filter(customer=>customer.id===customerId);
  // }

  getCustomerById(customerId: string): Customer[] {
    return this.customers.filter(customer => customer.id === customerId);
  }
  
}
