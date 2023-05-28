import { NgModule } from "@angular/core";
import { LocalDatePipe } from "./date/local-date.pipe";

@NgModule({
  declarations: [
    LocalDatePipe
  ],
  exports: [
    LocalDatePipe,
  ],
})
export class PipesModule { }