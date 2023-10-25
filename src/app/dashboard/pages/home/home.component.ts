import { Component, OnDestroy } from '@angular/core';
import { Student } from '../students/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  loading = false;
  counterSuscription: Subscription;
  constructor() {
    this.getStudents();
    this.counterSuscription = this.getCounter().subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Hay 2 alumnos inscriptos');
      },
    });
  }
  async getStudents(): Promise<void> {
    this.loading = true;
    const getStudentsPromise = new Promise((resolve, reject) => {
      const students: Student[] = [
        {
          id: 1,
          name: 'Malena',
          lastname: 'Areco',
          email: 'malenaAreco@gmail.com',
          age: 20,
        },
      ];
      setTimeout(() => {
        reject([students]);
      }, 1000);
    });

    await getStudentsPromise
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    console.log('Se destruyó el home');
    this.counterSuscription.unsubscribe;
  }

  counter = 0
  getCounter(): Observable<Number> {
    return new Observable((Suscriber) => {
      this.counter = 0;
      setInterval(() => {
        this.counter++;
        Suscriber.next(this.counter);

        if (this.counter === 2) {
          Suscriber.complete();
        }
      }, 1000);
    });
  }
}
