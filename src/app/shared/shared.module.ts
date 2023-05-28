import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CustomMaterialModule } from '../custom-material/custom-material.module'
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [],
  exports: [
    CustomMaterialModule,
    PipesModule,
  ],
})
export class SharedModule { }
