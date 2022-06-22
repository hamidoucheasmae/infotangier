import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubsribersComponent } from './subsribers/subsribers.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: AllPostComponent, canActivate: [AuthGuard]},
  {path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard]},
  {path: 'subscribers', component: SubsribersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
