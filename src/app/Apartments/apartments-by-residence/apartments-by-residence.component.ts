// apartments-by-residence.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentService } from 'src/app/core/services/apartment.service';
import { CommonService } from 'src/app/core/services/common.service';

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
    private commonService: CommonService,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    this.apartments = [
      // { apartNum: 101, floorNum: 1, surface: 50, terrace: true, surfaceterrace: 20, category: 'Luxury', ResidenceId: 1 },
      // { apartNum: 102, floorNum: 1, surface: 55, terrace: false, surfaceterrace: 0, category: 'Standard', ResidenceId: 1 }
    ];
  }

  countSameSurface(surface: number): number {
    return this.commonService.getSameValueOf(this.apartments, 'surface', surface);
  }
}
