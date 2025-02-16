// src/app/apartments/apartments.component.ts
import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentService } from 'src/app/core/services/apartment.service';


@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  apartments: Apartment[] = [];  // Array to hold the apartments

  constructor(private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.apartments = this.apartmentService.getApartments();  // Get apartments from the service
  }
}
