import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { MediaMatcher } from '@angular/cdk/layout'

import { GlobalErrorHandler } from './services/globar-error.handler'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
  ],
  providers: [
    MediaMatcher,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
  ],
  exports: [
  ],
})
export class CoreModule {}
