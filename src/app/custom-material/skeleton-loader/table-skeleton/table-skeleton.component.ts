import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-table-skeleton',
  templateUrl: './table-skeleton.component.html',
  styleUrls: ['./table-skeleton.component.css'],
})
export class TableSkeletonComponent {
  @Input() rowCount = 0
  @Input() columnCount = 0

  get dataRow () {
    return new Array(this.rowCount).fill(0).map((_, index) => index + 1)
  }

  get displayedColumns () {
    return new Array(this.columnCount).fill(0).map((_, index) => index.toString())
  }
}
