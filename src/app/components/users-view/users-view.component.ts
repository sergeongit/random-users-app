import {
  Component,
  inject,
  OnInit,
} from '@angular/core'
import { User } from '../../interfaces/user.interface'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements  OnInit {
  title = 'rest-api'
  loadedResponse: User[] | undefined

  // mock data
  private user: User = {
    'id': 2,
    'name': 'Bubba',
    'username': 'Bans',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496',
      },
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets',
    },
  }

  userService = inject(UserService)

  ngOnInit() {
    this.onGetUsers()
    //this.onUpdateUser()
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe({
        next: (response) => {
          console.table(response)
          this.loadedResponse = response
        },
        error: (error) => console.log('GET Users ERR:', error),
        complete: () => console.table('read data COMPLETE'),
      },
    )
  }

  onGetUser(): void {
    this.userService.getUser().subscribe(v => console.log('GET 1 User', v))
  }

  // if CORS policy error occurred, you need to change name of localhost in
  // C:\Windows\System32\drivers\etc\hosts
  // line: #	127.0.0.1       [ENTER your API without brackets  (jsonplaceholder.typicode.com)]/localhost
  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe({
        next: (response) => console.log('CREATED User:', response),
        error: (error) => console.log('CREATED User ERR:', error),
        complete: () => console.log('User create COMPLETE'),
      },
    )
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
        complete: () => console.log('User update COMPLETE'),
      },
    )
  }

  onDeleteUser(): void {
    this.userService.deleteUser(this.user.id).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
        complete: () => console.log('User delete COMPLETE'),
      },
    )
  }
}
