import { Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
export interface SnackBarData {
  message?: string
  icon?: string
}
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent {
  constructor (
    @Inject(MAT_SNACK_BAR_DATA) public data?: SnackBarData,
  ) { }
}
