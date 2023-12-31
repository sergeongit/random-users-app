import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import {
  delay,
  Observable,
} from 'rxjs'
import { finalize } from 'rxjs/operators'
import { LoaderService } from '../services/loader.service'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('req', request)
    this.loadingService.setLoading(true)
    return next.handle(request).pipe(
      delay( 1000),
      finalize(() => this.loadingService.setLoading(false))
    )
  }
}
