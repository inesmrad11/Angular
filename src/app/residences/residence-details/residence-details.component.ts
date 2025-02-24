import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from '../../core/services/residence.service';
import { Residence } from '../../core/models/residence';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residence: Residence | undefined;
  nextResidence: Residence | undefined;  // To store the next residence

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  ngOnInit() {
    // Initially load the residence based on the route ID
    this.loadResidence();

    // Subscribe to route parameter changes and reload the residence data
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadResidence(id);
    });
  }

  // Get the class for the status of the residence
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'disponible': return 'status-disponible';
      case 'vendu': return 'status-vendu';
      case 'en construction': return 'status-en-construction';
      default: return '';
    }
  }

  // Logic to go back
  goBack() {
    this.router.navigate(['/']);
  }

  // Logic to go to the next residence
  goToNextResidence() {
    if (this.nextResidence) {
      // Ensure that nextResidence is properly set and navigate to the next one
      this.router.navigate([`/details/${this.nextResidence.id}`]);
    }
  }

  // Set the next residence
  setNextResidence(currentId: number) {
    // Get the next residence from the service
    this.nextResidence = this.residenceService.getNextResidence(currentId);
  }

  // Load the residence data
  loadResidence(id?: number) {
    const residenceId = id || Number(this.route.snapshot.paramMap.get('id'));
    this.residence = this.residenceService.getResidenceById(residenceId);

    if (!this.residence) {
      alert("Résidence non trouvée !");
      this.goBack();
    } else {
      this.setNextResidence(residenceId);
    }
  }

    // Navigate to Add Residence page
    goToAddResidence() {
      this.router.navigate(['/add-residence']);
    }
  
    // Navigate to Update Residence page (passing the residence id to update)
    goToUpdateResidence() {
      if (this.residence) {
        this.router.navigate([`/add-residence`, this.residence.id]);
      }
    }
}
