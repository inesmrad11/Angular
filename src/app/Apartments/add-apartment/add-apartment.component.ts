import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  apartForm: FormGroup;
  newApart: any; // Remplace par ton modèle d'Appartement

  constructor(private fb: FormBuilder, private router: Router) {
    this.apartForm = this.fb.group({
      apartNum: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      floorNum: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      surface: [null, [Validators.required, Validators.pattern("^[0-9]+$")]],
      terrace: [false],
      surfaceterrace: [{ value: null, disabled: true }, Validators.pattern("^[0-9]+$")],
      category: ['', Validators.required],
      residenceld: [null, [Validators.required, Validators.pattern("^[0-9]+$")]]
    });

    // Activer/Désactiver surfaceterrace en fonction de la valeur de terrace
    this.apartForm.get('terrace')?.valueChanges.subscribe(value => {
      if (value) {
        this.apartForm.get('surfaceterrace')?.enable();
      } else {
        this.apartForm.get('surfaceterrace')?.disable();
        this.apartForm.get('surfaceterrace')?.setValue(null); // Réinitialisation
      }
    });
  }

  onSubmit() {
    if (this.apartForm.valid) {
      this.newApart = this.apartForm.value;
      console.log(this.newApart);
    }
  }

  goBack() {
    this.router.navigate(['/apartments']);
  }
}
