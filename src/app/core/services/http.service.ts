import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { catchError, map, Observable } from 'rxjs'

export const userLocalStorageKey = 'currentUser'

export interface BaseResponse {
  status: string
  message?: string
}
export interface PageInfoRequest {
  pageNumber: number
  pageLimit: number
  beforeCursor?: string
  afterCursor?: string
}
export interface PageInfoResponse extends BaseResponse {
  page_info: {
    total: number
    page: number
    limit: number
    before_cursor: string | null
    after_cursor: string | null
  }
}

export interface Pagination<T> {
  total: number
  data: T[]
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor (
    private httpClient: HttpClient,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
  ) {}

  get<T extends BaseResponse> (
    url: string,
    options?: any,
  ): Observable<T> {
    const headers = this.addAuthorizationHeader(options?.header)
    return this.httpClient.get<T>(
      this.getUri(url),
      {
        params: options ? options.params : undefined,
        headers,
        observe: 'body',
        responseType: 'json',
      },
    )
      .pipe(
        map(response => {
          return this.handleResponse(response)
        }),
        catchError((error) => {
          throw error.error
        }),
      )
  }

  getArrayBuffer (
    url: string,
    options?: any,
  ): Observable<ArrayBuffer> {
    const headers = this.addAuthorizationHeader(options?.header)
    return this.httpClient.get(
      this.getUri(url),
      {
        params: options ? options.params : undefined,
        headers,
        observe: 'body',
        responseType: 'arraybuffer',
      },
    )
      .pipe(
        catchError((error) => {
          throw error.error
        }),
      )
  }

  post<T extends BaseResponse> (
    url: string,
    body: any | null,
    options?: any,
  ): Observable<T> {
    const headers = this.addAuthorizationHeader(options?.header)
    return this.httpClient.post<T>(
      this.getUri(url),
      body,
      {
        headers,
        observe: 'body',
        responseType: 'json',
      },
    )
      .pipe(
        map(response => {
          return this.handleResponse(response)
        }),
        catchError((error) => {
          throw error.error
        }),
      )
  }

  postMultipart<T extends BaseResponse> (
    url: string,
    formData: FormData,
    options?: any,
  ): Observable<T> {
    const headers = this.addAuthorizationHeader(options?.header)
    headers.set('Content-Type', 'multipart/form-data')
    return this.httpClient.post<T>(
      this.getUri(url),
      formData,
      {
        headers,
        observe: 'body',
        responseType: 'json',
      },
    )
      .pipe(
        map(response => {
          return this.handleResponse(response)
        }),
        catchError((error) => {
          throw error.error
        }),
      )
  }

  patch<T extends BaseResponse> (
    url: string,
    body: any | null,
    options?: any,
  ): Observable<T> {
    const headers = this.addAuthorizationHeader(options?.header)
    return this.httpClient.patch<T>(
      this.getUri(url),
      body,
      {
        headers,
        observe: 'body',
        responseType: 'json',
      },
    )
      .pipe(
        map(response => {
          return this.handleResponse(response)
        }),
        catchError((error) => {
          throw error.error
        }),
      )
  }

  handleResponse<T extends BaseResponse> (response: T):T {
    if (response.status.toLowerCase() !== 'success') {
      throw new Error(`${response.status}: ${response.message}`)
    }
    return response
  }

  getPageInfoParams (query: PageInfoRequest) {
    let params = new HttpParams()
    params = params.set('page', query.pageNumber)
    params = params.set('limit', query.pageLimit)
    if (query.beforeCursor) params = params.set('before_cursor', query.beforeCursor)
    if (query.afterCursor) params = params.set('after_cursor', query.afterCursor)
    return params
  }

  private getUri (requestPath: string): string {
    let url = ''
    let path = requestPath
    if (url.endsWith('/')) {
      url = url.substr(0, url.length - 1)
    }
    if (path.startsWith('/')) {
      path = path.substr(1, path.length)
    }
    return `${url}/${path}`
  }

  private addAuthorizationHeader (headers: HttpHeaders): HttpHeaders {
    if (headers === undefined) {
      headers = new HttpHeaders()
    }
    // TODO token
    headers.set('Authorization', '')
    return headers
  }
}
