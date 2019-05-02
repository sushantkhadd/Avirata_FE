import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { Module0Component } from './module0/module0.component';
import { Module0Service } from './module0/module0.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), ModulesRoutingModule],
  declarations: [Module0Component],
  providers: [Module0Service]
})
export class ModulesModule {}
