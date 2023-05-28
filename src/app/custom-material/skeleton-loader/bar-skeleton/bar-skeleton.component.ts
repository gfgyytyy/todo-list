import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-bar-skeleton',
  templateUrl: './bar-skeleton.component.html',
  styleUrls: ['./bar-skeleton.component.css'],
})
export class BarSkeletonComponent {
  @Input() rowCount = 0
  @Input() width: string | number = '70px'
  @Input() height: string | number = '10px'

  get dataRow () {
    const row: number[] = []
    for (let i = 0; i < this.rowCount; i += 1) {
      row.push(i)
    }
    return row
  }

  get displayedColumns () {
    return this.dataRow.map(e => e.toString())
  }
}
