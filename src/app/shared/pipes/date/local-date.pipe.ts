import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

export const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'
@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  transform (value?: Date | string | null, args: string = DEFAULT_FORMAT): string {
    if (!value) {
      return ''
    }
    return moment(value).format(args)
  }
}
