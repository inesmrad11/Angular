import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResidenceService } from '../core/services/residence.service';
import { Residence } from '../core/models/residence';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  residences: Residence[] = [];  // Dynamic list of residences
  searchAddress: string = "";
  filteredResidences: Residence[] = [];  // Filtered list based on search criteria
  favorites: Residence[] = [];  // List of favorite residences

  constructor(
    private router: Router,
    private residenceService: ResidenceService,
    private commonService: CommonService  // To access the current language
  ) {}

  ngOnInit(): void {
    this.residences = this.residenceService.getResidences();  // Load the list of residences from the service
    this.filteredResidences = this.residences;  // Initialize filtered list
  }

  // Show location details of a residence
  showLocation(residence: Residence) {
    if (residence.address === "inconnu") {
      alert("L'adresse de cette résidence est inconnue.");
    } else {
      alert(`Adresse: ${residence.address}`);
    }
  }

  // Add to favorites list
  likeResidence(residence: Residence) {
    if (!this.favorites.includes(residence)) {
      this.favorites.push(residence);
    }
  }

  // Filter residences based on address input
  onSearchInput() {
    this.filteredResidences = this.filterResidences();
  }

  // Filtering logic for residences by address
  filterResidences() {
    return this.residences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }

  // Navigate to residence details page
  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  countSameAddresses(address: string): number {
    return this.commonService.getSameValueOf(this.residences, 'address', address);
  }
}
