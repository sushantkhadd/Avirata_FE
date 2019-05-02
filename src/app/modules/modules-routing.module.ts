import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Module0Component } from "./module0/module0.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Modules"
    },
    children: [
      {
        path: "baseline",
        component: Module0Component
        //canActivate: ['CanAlwaysDeActivateGuard']
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
