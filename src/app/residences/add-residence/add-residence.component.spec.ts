import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResidenceService } from '../../core/services/residence.service';
import { Residence } from '../../core/models/residence';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residence: Residence = { id: 0, name: '', address: '', image: '', status: '' }; // Default empty residence

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private residenceService: ResidenceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.residence = this.residenceService.getResidenceById(Number(id)) || this.residence;
    }
  }

  saveResidence() {
    if (this.residence.id) {
      // Update existing residence
      this.residenceService.updateResidence(this.residence);
    } else {
      // Add new residence
      this.residenceService.addResidence(this.residence);
    }
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
