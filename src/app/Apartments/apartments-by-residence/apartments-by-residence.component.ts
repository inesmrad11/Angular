// apartments-by-residence.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentService } from 'src/app/core/services/apartment.service';


@Component({
  selector: 'app-apartments-by-residence',
  templateUrl: './apartments-by-residence.component.html',
  styleUrls: ['./apartments-by-residence.component.css']
})
export class ApartmentsByResidenceComponent implements OnInit {
  apartments: Apartment[] = [];
  residenceId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.residenceId = Number(this.route.snapshot.paramMap.get('residenceId')); // Get the residenceId from the route
    this.apartments = this.apartmentService.getApartmentsByResidence(this.residenceId);
  }
}
