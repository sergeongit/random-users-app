import {
  inject,
  Injectable,
} from '@angular/core'
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http'
import {
  Observable,
  of,
} from 'rxjs'
import {
  map,
  catchError,
} from 'rxjs/operators'
import { User } from '../interfaces/user.interface'
import { environmentDev } from '../../environment.dev'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environmentDev.apiUrl
  //readonly myTestParams = ['testparam1', 'testparam2']
  readonly defaultImg = 'https://robohash.org'

  private http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    // let HeaderForApi = new HttpHeaders({'mheader': 'headerval'})
    // const myParams = { ['testList']: this.myTestParams }
    // let testParams = new HttpParams({fromObject: myParams})
    // let testParams = new HttpParams({fromString: 'testList=test1&testList=test2'})
    return this.http.get<User[]>(`${this.apiUrl}/users`) // { headers: HeaderForApi, params: testParams }
               .pipe(
                 map(users => users.map(user => ({
                   ...user,
                   name: user.name.toUpperCase(),
                   avatar: `${this.defaultImg}/${user.username.toLowerCase()}`,
                 }))),
                 catchError((err: any) => {
                   return of (err)
                 })
               )
  }

  // getUsers(): Observable<HttpEvent<User[]>> {
  //   return this.http.get<User[]>(`${this.apiUrl}/users`, { observe: 'events', reportProgress: true })
  // }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`)
  }
}
