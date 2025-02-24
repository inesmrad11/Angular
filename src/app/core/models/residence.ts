import { Apartment } from 'src/app/core/models/apartment';
export class Residence {
    id!: number;
    name!: string;
    address!: string;
    image!: string;
    status!: string;
    apartments!: Apartment[];
  }