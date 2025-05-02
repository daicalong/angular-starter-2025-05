import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnInit, Signal, signal } from '@angular/core';
import { delay, firstValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  loading = signal(false);
  userApi = signal<UserApi | undefined>(undefined);
  computedUser: Signal<UserUi | undefined> = computed(() => {
    const user = this.userApi();
    if (user) {
      const res: UserUi = {
        id: user.id,
        name: user.name,
        birthday: user.birthday,
        age: this.getAge(user.birthday)
      }
      return res;
    }
    return undefined;
  });

  ngOnInit(): void {
    this.getData(1);
  }

  getAge(birthday: Date | undefined): number {
    if (!birthday) return NaN;
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    return age;
  }

  getData(id: number): void {
    this.loading.set(true);
    this.mockHttpServiceGet(id).subscribe({
      next: res => {
        this.userApi.set(res);
        this.loading.set(false)
      },
      error: () => Error('Error')
    })
  }

  mockHttpServiceGet(id: number): Observable<UserApi> {
    const users: UserApi[] = [
      {
        id: 1,
        name: 'John Nolan',
        birthday: new Date('1975-03-21'),
      },
      {
        id: 2,
        name: 'Alicia Savage',
        birthday: new Date('1978-01-11'),
      }
    ];

    const obs = of(users.find(u => u.id === id) || users[0]);

    return obs.pipe(
      delay(1000)
    )
  }
}

interface UserApi {
  id: number,
  name: string,
  birthday: Date,
}

interface UserUi extends UserApi {
  age: number,
}
