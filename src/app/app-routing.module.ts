import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth.guard";

// Components

import { HomeComponent } from "./components/home/home.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { MenuComponent } from "./components/menu/menu.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'registro',
    component: SignupComponent
  },
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
