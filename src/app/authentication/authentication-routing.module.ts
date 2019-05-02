import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LevelSelectionComponent } from "./level-selection/level-selection.component";
import { AuthenticationComponent } from "./authentication.component";

const routes: Routes = [
  {
    path: "",
    component: AuthenticationComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
        data: {
          title: "Login Page"
        }
      },
      {
        path: "level-selection",
        component: LevelSelectionComponent,
        data: {
          title: "Level Page"
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
