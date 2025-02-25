import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from 'src/app/core/services/res.service';
import { Residence } from '../../core/models/residence';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {
  residence!: Residence; 
  nextResidenceId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.loadResidence(id);
      } else {
        this.residence = {} as Residence; // Empty object in case of invalid ID
      }
    });
  }

  // loadResidence(id: number) {
  //   this.residenceService.getResidenceById(id).subscribe(
  //     (residence) => {
  //       this.residence = residence;
  //       this.nextResidenceId = residence.id + 1; // Assuming next residence is sequential
  //     },
  //     (error) => {
  //       console.error('Error fetching residence:', error);
  //       this.router.navigate(['/not-found']);
  //     }
  //   );
  // }

  goToNextResidence() {
    if (this.nextResidenceId) {
      this.router.navigate(['/details', this.nextResidenceId]);
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'disponible': return 'status-disponible';
      case 'vendu': return 'status-vendu';
      case 'en construction': return 'status-en-construction';
      default: return '';
    }
  }

  loadResidence(id: number) {
    this.residenceService.getResidenceById(id).subscribe(
      (residence) => {
        this.residence = residence;
        this.nextResidenceId = id + 1; // 🔥 Simply set next ID as current ID + 1
        console.log("Next Residence ID:", this.nextResidenceId);
      },
      (error) => {
        console.error('Error fetching residence:', error);
        this.router.navigate(['/not-found']);
      }
    );
  }
  
  findNextResidenceId(currentId: number) {
    this.residenceService.getAllResidences().subscribe(
      (residences) => {
        const sortedResidences = residences.sort((a, b) => a.id - b.id); // Sort by ID ascending
        const currentIndex = sortedResidences.findIndex(res => res.id === currentId);
        
        if (currentIndex !== -1 && currentIndex < sortedResidences.length - 1) {
          this.nextResidenceId = sortedResidences[currentIndex + 1].id; // Get next available ID
        } else {
          this.nextResidenceId = null; // No next residence
        }
  
        console.log("Next Residence ID:", this.nextResidenceId); // Debugging
      },
      (error) => console.error('Error fetching residences:', error)
    );
  }
  
  

  goBack() {
    this.router.navigate(['/']);
  }
}
