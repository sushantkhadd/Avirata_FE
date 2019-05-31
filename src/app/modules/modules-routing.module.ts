import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Module0Component } from "./module0/module0.component";
import { Module1Component } from "./module1/module1.component";
import { Module12Component } from "./module1/module1-2.component";
import { Module16Component } from "./module1/module1-6.component";
import { Module17Component } from "./module1/module1-7.component";
import { Module13Component } from "./module1/module1-3.component";
import { Module15Component } from "./module1/module1-5.component";
import { Module111Component } from "./module1/module1-11.component";
import { Module14Component } from "./module1/module1-4.component";
import { Module18Component } from "./module1/module1-8.component";
import { Module19Component } from "./module1/module1-9.component";
import { Module110Component } from "./module1/module1-10.component";
import { Module2Component } from "./module2/module2.component";
import { Module22Component } from "./module2/module2-2.component";
import { Module23Component } from "./module2/module2-3.component";
import { Module25Component } from "./module2/module2-5.component";
import { Module24Component } from "./module2/module2-4.component";
import { Module29Component } from "./module2/module2-9.component";
import { Module26Component } from "./module2/module2-6.component";
import { Module28Component } from "./module2/module2-8.component";
import { Module217Component } from "src/app/modules/module2/module2-17.component";
import { Module112Component } from "./module1/module1-12.component";
import { Module27Component } from "./module2/module2-7.component";
import { Module210Component } from "./module2/module2-10.component";
import { Module211Component } from "./module2/module2-11.component";
import { Module212Component } from "./module2/module2-12.component";
import { Module213Component } from "./module2/module2-13.component";
import { Module214Component } from "./module2/module2-14.component";
import { Module215Component } from "./module2/module2-15.component";
import { Module216Component } from "./module2/module2-16.component";
import { Module3Component } from "./module3/module3.component";
import { Module32Component } from "./module3/module3-2.component";
import { Module33Component } from "./module3/module3-3.component";
import { Module34Component } from "./module3/module3-4.component";
import { Module35Component } from "./module3/module3-5.component";
import { Module36Component } from "./module3/module3-6.component";
import { Module37Component } from "./module3/module3-7.component";
import { Module38Component } from "./module3/module3-8.component";
import { Module39Component } from "./module3/module3-9.component";
import { Module310Component } from "./module3/module3-10.component";
import { Module311Component } from "./module3/module3-11.component";
import { Module312Component } from "./module3/module3-12.component";
import { Module313Component } from "./module3/module3-13.component";
import { Module314Component } from "./module3/module3-14.component";
import { Module315Component } from "./module3/module3-15.component";
import { Module316Component } from "./module3/module3-16.component";
import { Module317Component } from "./module3/module3-17.component";
import { Module318Component } from "./module3/module3-18.component";
import { Module4Component } from "./module4/module4.component";
import { Module42Component } from "./module4/module4-2.component";
import { Module43Component } from "./module4/module4-3.component";
import { Module44Component } from "./module4/module4-4.component";
import { Module45Component } from "./module4/module4-5.component";
import { Module46Component } from "./module4/module4-6.component";
import { Module47Component } from "./module4/module4-7.component";
import { Module48Component } from "./module4/module4-8.component";
import { Module49Component } from "./module4/module4-9.component";
import { Module410Component } from "./module4/module4-10.component";
import { Module411Component } from "./module4/module4-11.component";
import { Module412Component } from "./module4/module4-12.component";
import { Module413Component } from "./module4/module4-13.component";
import { Module414Component } from "./module4/module4-14.component";
import { Module5Component } from "./module5/module5.component";
import { Module52Component } from "./module5/module5-2.component";
import { Module53Component } from "./module5/module5-3.component";
import { Module54Component } from "./module5/module5-4.component";
import { Module55Component } from "./module5/module5-5.component";
import { Module56Component } from "./module5/module5-6.component";
import { Module57Component } from "./module5/module5-7.component";
import { Module58Component } from "./module5/module5-8.component";
import { Module59Component } from "./module5/module5-9.component";
import { Module510Component } from "./module5/module5-10.component";
import { Module511Component } from "./module5/module5-11.component";
import { Module512Component } from "./module5/module5-12.component";
import { Module513Component } from "./module5/module5-13.component";
import { Module514Component } from "./module5/module5-14.component";
import { Module515Component } from "./module5/module5-15.component";

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
      },
      {
        path: "Module1",
        component: Module1Component
      },
      {
        path: "module1/Module1.2",
        component: Module12Component
      },
      {
        path: "module1/Module1.3",
        component: Module13Component
      },
      {
        path: "module1/Module1.4",
        component: Module14Component
      },
      {
        path: "module1/Module1.5",
        component: Module15Component
      },
      {
        path: "module1/Module1.6",
        component: Module16Component
      },
      {
        path: "module1/Module1.7",
        component: Module17Component
      },
      {
        path: "module1/Module1.8",
        component: Module18Component
      },
      {
        path: "module1/Module1.9",
        component: Module19Component
      },
      {
        path: "module1/Module1.10",
        component: Module110Component
      },
      {
        path: "module1/Module1.11",
        component: Module111Component
      },
      {
        path: "module1/Module1.12",
        component: Module112Component
      },
      {
        path: "module2",
        component: Module2Component
      },
      {
        path: "module2/Module2.2",
        component: Module22Component
      },
      {
        path: "module2/Module2.3",
        component: Module23Component
      },
      {
        path: "module2/Module2.4",
        component: Module24Component
      },
      {
        path: "module2/Module2.5",
        component: Module25Component
      },
      {
        path: "module2/Module2.6",
        component: Module26Component
      },
      {
        path: "module2/Module2.7",
        component: Module27Component
      },
      {
        path: "module2/Module2.8",
        component: Module28Component
      },
      {
        path: "module2/Module2.9",
        component: Module29Component
      },
      {
        path: "module2/Module2.10",
        component: Module210Component
      },
      {
        path: "module2/Module2.11",
        component: Module211Component
      },
      {
        path: "module2/Module2.12",
        component: Module212Component
      },
      {
        path: "module2/Module2.13",
        component: Module213Component
      },
      {
        path: "module2/Module2.14",
        component: Module214Component
      },
      {
        path: "module2/Module2.15",
        component: Module215Component
      },
      {
        path: "module2/Module2.16",
        component: Module216Component
      },
      {
        path: "module2/Module2.17",
        component: Module217Component
      },
      {
        path: "module3",
        component: Module3Component
      },
      {
        path: "module3/Module3.2",
        component: Module32Component
      },
      {
        path: "module3/Module3.3",
        component: Module33Component
      },
      {
        path: "module3/Module3.4",
        component: Module34Component
      },
      {
        path: "module3/Module3.5",
        component: Module35Component
      },
      {
        path: "module3/Module3.6",
        component: Module36Component
      },
      {
        path: "module3/Module3.7",
        component: Module37Component
      },
      {
        path: "module3/Module3.8",
        component: Module38Component
      },
      {
        path: "module3/Module3.9",
        component: Module39Component
      },
      {
        path: "module3/Module3.10",
        component: Module310Component
      },
      {
        path: "module3/Module3.11",
        component: Module311Component
      },
      {
        path: "module3/Module3.12",
        component: Module312Component
      },
      {
        path: "module3/Module3.13",
        component: Module313Component
      },
      {
        path: "module3/Module3.14",
        component: Module314Component
      },
      {
        path: "module3/Module3.15",
        component: Module315Component
      },
      {
        path: "module3/Module3.16",
        component: Module316Component
      },
      {
        path: "module3/Module3.17",
        component: Module317Component
      },
      {
        path: "module3/Module3.18",
        component: Module318Component
      },
      {
        path: "module4",
        component: Module4Component
      },
      {
        path: "module4/Module4.2",
        component: Module42Component
      },
      {
        path: "module4/Module4.3",
        component: Module43Component
      },
      {
        path: "module4/Module4.4",
        component: Module44Component
      },
      {
        path: "module4/Module4.5",
        component: Module45Component
      },
      {
        path: "module4/Module4.6",
        component: Module46Component
      },
      {
        path: "module4/Module4.7",
        component: Module47Component
      },
      {
        path: "module4/Module4.8",
        component: Module48Component
      },
      {
        path: "module4/Module4.9",
        component: Module49Component
      },
      {
        path: "module4/Module4.10",
        component: Module410Component
      },
      {
        path: "module4/Module4.11",
        component: Module411Component
      },
      {
        path: "module4/Module4.12",
        component: Module412Component
      },
      {
        path: "module4/Module4.13",
        component: Module413Component
      },
      {
        path: "module4/Module4.14",
        component: Module414Component
      },
      {
        path: "module5",
        component: Module5Component
      },
      {
        path: "module5/Module5.2",
        component: Module52Component
      },
      {
        path: "module5/Module5.3",
        component: Module53Component
      },
      {
        path: "module5/Module5.4",
        component: Module54Component
      },
      {
        path: "module5/Module5.5",
        component: Module55Component
      },{
        path: "module5/Module5.6",
        component: Module56Component
      },
      {
        path: "module5/Module5.7",
        component: Module57Component
      },
      {
        path: "module5/Module5.8",
        component: Module58Component
      },
      {
        path: "module5/Module5.9",
        component: Module59Component
      },{
        path: "module5/Module5.10",
        component: Module510Component
      },
      {
        path: "module5/Module5.11",
        component: Module511Component
      },
      {
        path: "module5/Module5.12",
        component: Module512Component
      },
      {
        path: "module5/Module5.13",
        component: Module513Component
      },{
        path: "module5/Module5.14",
        component: Module514Component
      },
      {
        path: "module5/Module5.15",
        component: Module515Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
