import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ResidenceService } from '../core/services/residence.service';
import { ResidenceService } from '../core/services/res.service';
import { Residence } from '../core/models/residence';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  listResidences: Residence[] = [];
  // Dynamic list of residences
  searchAddress: string = "";
  filteredResidences: Residence[] = [];  // Filtered list based on search criteria
  favorites: Residence[] = [];  // List of favorite residences

  constructor(
    private router: Router,
    private commonService: CommonService,
    private residenceService: ResidenceService
  ) {}

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe((data) => {
      this.listResidences = data;
      this.filteredResidences = [...data]; // Initialiser la liste filtrée avec toutes les résidences
    });
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
    this.filteredResidences = this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }
  

  // Filtering logic for residences by address
  filterResidences() {
    return this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }

  // Navigate to residence details page
  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  countSameAddresses(address: string): number {
    return this.commonService.getSameValueOf(this.listResidences, 'address', address);
  }

  deleteResidence(id: number): void {
    console.log('Attempting to delete residence with id:', id);  
    this.residenceService.deleteResidence(id).subscribe({
      next: () => {
        console.log('Residence deleted successfully');  
        this.listResidences = this.listResidences.filter((res) => res.id !== id);
      },
      error: (err) => {
        console.error('Error deleting residence:', err);  
      }
    });
  }

}
