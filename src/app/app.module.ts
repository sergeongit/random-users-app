import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http'
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SpinnerComponent } from './ui-kit/spinner/spinner.component';
import { UsersViewComponent } from './components/users-view/users-view.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    UsersViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
