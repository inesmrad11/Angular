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
  imagePath: string = ''; // To store the image path
  imageTouched = false;  // To track if the image input was touched

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

  // Handle image file selection
  onImageSelect(event: any): void {
    this.imageTouched = true; // Mark as touched once an image is selected
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Store only the file path (reader.result is a DataURL)
        this.imagePath = e.target.result;
        // Optionally, you can also save just the file name/path here if you're uploading to a server later
        this.residence.image = this.imagePath;  // Assign to the model
      };
      reader.readAsDataURL(file);  // Convert the image file to a Data URL
    }
  }

  // Save or update residence
  saveResidence() {
    if (this.residence.id) {
      // Update existing residence
      this.residenceService.updateResidence(this.residence);
    } else {
      // Add new residence
      this.residenceService.addResidence(this.residence);
    }

    this.router.navigate(['/']); // Navigate to home or other appropriate page
  }

  // Go back to the previous page
  goBack() {
    this.router.navigate(['/']);
  }
}
