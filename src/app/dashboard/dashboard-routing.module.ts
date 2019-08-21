import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { FaqComponent } from "src/app/dashboard/faq/faq.component";
import { NoticeScreenComponent } from "./notice-screen/notice-screen.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    data: {
      title: "Dashboard"
    }
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'notice_screen',
    component: NoticeScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
