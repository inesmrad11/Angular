import { Injectable } from '@angular/core';
import { Residence } from '../models/residence';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private residences: Residence[] = [
    { id: 1, name: "El Fel", address: "Borj Cedria", image: "../../assets/images/fel.jpg", status: "Disponible", apartments: [] },
    { id: 2, name: "El Yasmine", address: "Ezzahra", image: "../../assets/images/yasmine.jpg", status: "Disponible", apartments: [] },
    { id: 3, name: "El Arij", address: "Rades", image: "../../assets/images/arij.jpg", status: "Vendu", apartments: [] },
    { id: 4, name: "El Anber", address: "inconnu", image: "../../assets/images/anber.jpg", status: "En Construction", apartments: [] }
  ];
  

  getResidences(): Residence[] {
    return this.residences;
  }

  getResidenceById(id: number): Residence | undefined {
    return this.residences.find(res => res.id === id);
  }

  getNextResidence(currentId: number): Residence | undefined {
    const currentIndex = this.residences.findIndex(res => res.id === currentId);
    if (currentIndex !== -1 && currentIndex < this.residences.length - 1) {
      return this.residences[currentIndex + 1];
    }
    return undefined;  // Return undefined i
  }
  
  addResidence(residence: Residence) {
    const maxId = Math.max(...this.residences.map(res => res.id), 0);
    residence.id = maxId + 1;
    this.residences.push(residence);
  }
  
  updateResidence(updatedResidence: Residence) {
    // Update existing residence
    const index = this.residences.findIndex(res => res.id === updatedResidence.id);
    if (index !== -1) {
      this.residences[index] = updatedResidence;
    }
  }

  deleteResidence(id: number) {
    this.residences = this.residences.filter(res => res.id !== id);
  }

}

