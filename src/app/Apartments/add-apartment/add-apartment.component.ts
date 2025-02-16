
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentService } from 'src/app/core/services/apartment.service';


@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartment: Apartment = new Apartment();

  constructor(
    private apartmentService: ApartmentService,
    private router: Router
  ) {}

  createApartment() {
    this.apartmentService.addApartment(this.apartment);
    this.router.navigate(['/apartments']);  // Redirect to apartments list
  }
}
