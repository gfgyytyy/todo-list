import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { CustomMaterialModule } from './custom-material/custom-material.module'
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router'
import { PendingChangesGuard } from './core/guards/deactivate.guard'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { CustomDateAdapter } from './utils/date-adapter'
import { ComponentsModule } from './components/components.module'
import { PipesModule } from './shared/pipes/pipes.module';
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    PipesModule,
    CustomMaterialModule,
    AppRoutingModule,
    ScrollingModule,
    RouterModule,
    ComponentsModule
  ],
  providers: [
    PendingChangesGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
