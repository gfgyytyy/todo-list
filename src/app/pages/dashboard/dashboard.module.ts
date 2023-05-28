import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from 'src/app/shared/shared.module'
import { DashboardComponent } from './dashboard.component'
import { DashboradRoutingModule } from './dashboard-routing.module'
import { ComponentsModule } from 'src/app/components/components.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    DashboradRoutingModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
