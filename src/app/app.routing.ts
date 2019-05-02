import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { FullLayoutComponent } from "./layouts/full-layout.component";
import { AuthGuard } from "./shared/guards/auth-guard.service";

export const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "",
    component: FullLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
         canActivateChild: [AuthGuard]
      },
      {
        path: "modules",
        loadChildren: "./modules/modules.module#ModulesModule",
         canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
