import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenceDetailsComponent } from './residences/residence-details/residence-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResidencesComponent } from './residences/residences.component';
import { AddResidenceComponent } from './residences/add-residence/add-residence.component';
import { ApartmentsComponent } from './Apartments/apartments/apartments.component';
import { ApartmentsByResidenceComponent } from './Apartments/apartments-by-residence/apartments-by-residence.component';
import { AddApartmentComponent } from './Apartments/add-apartment/add-apartment.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  { path: 'residences', component: ResidencesComponent },
  {path:'details/:id',component:ResidenceDetailsComponent},
  {path:'add-residence', component: AddResidenceComponent },
  {path:'add-residence/:id', component: AddResidenceComponent },
  {path:'apartments', component: ApartmentsComponent },
  {path:'apartments-by-residence/:residenceId', component: ApartmentsByResidenceComponent },
  {path:'create-apartment', component: AddApartmentComponent },
  {path:'**', component: NotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
