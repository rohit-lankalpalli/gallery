import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'view-post',loadComponent: () => import('./pages/view-post/view-post.component').then(mod => mod.ViewPostComponent)},
  {path:'**',loadComponent: () => import('./pages/dashboard/dashboard.component').then(mod => mod.DashboardComponent)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
