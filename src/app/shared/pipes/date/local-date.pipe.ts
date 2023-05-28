import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  transform (value: Date | string | null, args: string = 'YYYY-MM-DD HH:mm:ss'): string {
    if (!value) {
      return ''
    }
    return moment(value).format(args)
  }
}
