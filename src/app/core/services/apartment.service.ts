// src/app/core/services/apartment.service.ts
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment';  // Import the Apartment model

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apartments: Apartment[] = [
    {
      apartNum: 101,
      floorNum: 1,
      surface: 50,
      terrace: true,
      surfaceterrace: 10,
      category: 'Studio',
      residenceld: 1
    },
    {
      apartNum: 102,
      floorNum: 1,
      surface: 60,
      terrace: false,
      surfaceterrace: 0,
      category: '1-Bedroom',
      residenceld: 1
    },
    {
      apartNum: 103,
      floorNum: 1,
      surface: 65,
      terrace: true,
      surfaceterrace: 15,
      category: '1-Bedroom',
      residenceld: 1
    },
    {
      apartNum: 201,
      floorNum: 2,
      surface: 75,
      terrace: true,
      surfaceterrace: 20,
      category: '2-Bedroom',
      residenceld: 2
    },
    {
      apartNum: 202,
      floorNum: 2,
      surface: 80,
      terrace: false,
      surfaceterrace: 0,
      category: '2-Bedroom',
      residenceld: 2
    },
    {
      apartNum: 203,
      floorNum: 2,
      surface: 85,
      terrace: true,
      surfaceterrace: 25,
      category: 'Penthouse',
      residenceld: 2
    },
    {
      apartNum: 301,
      floorNum: 3,
      surface: 95,
      terrace: false,
      surfaceterrace: 0,
      category: '3-Bedroom',
      residenceld: 3
    },
    {
      apartNum: 302,
      floorNum: 3,
      surface: 110,
      terrace: true,
      surfaceterrace: 30,
      category: 'Luxury Suite',
      residenceld: 3
    },
    {
      apartNum: 303,
      floorNum: 3,
      surface: 120,
      terrace: true,
      surfaceterrace: 35,
      category: 'Penthouse',
      residenceld: 4
    }
  ];
  

  constructor() { }

  // Method to get all apartments
  getApartments(): Apartment[] {
    return this.apartments;
  }

  // Method to get apartments by residence ID
  getApartmentsByResidence(residenceId: number): Apartment[] {
    return this.apartments.filter(apartment => apartment.residenceld === residenceId);
  }

  // Method to add a new apartment
  addApartment(apartment: Apartment): void {
    this.apartments.push(apartment);
  }

  
}
