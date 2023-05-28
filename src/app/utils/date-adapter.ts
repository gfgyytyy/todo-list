import { Injectable } from '@angular/core'
import { NativeDateAdapter } from '@angular/material/core'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class CustomDateAdapter extends NativeDateAdapter {
  override parse (value: any): Date | null {
    const date = moment(value)
    if (date.isValid()) {
      // TODO handle custom date format
      return date.toDate()
    } else {
      return null
    }
  }

  override format (date: Date | null, displayFormat: any): string {
    let format = displayFormat.format
    if (format === undefined) {
      format = 'YYYY-MM-DD'
    }
    return moment(date).format(format)
  }
}
