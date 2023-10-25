import { Inject, Injectable } from '@angular/core';
import { Student } from './models';
import { apiUrl, apiUrlConfig } from 'src/app/config/url.token';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(@Inject(apiUrl) private url: apiUrlConfig) {
    console.log('LA URL INYECTADA ES :', url);
  }

  private students: Student[] = [
    {
      id: 1,
      name: 'Malena',
      lastname: 'Areco',
      email: 'malenaAreco@gmail.com',
      age: 19,
    },
    {
      id: 2,
      name: 'Cecilia',
      lastname: 'Almaraz',
      email: 'cecilia.almaraz@gmail.com',
      age: 21,
    },
    {
      id: 3,
      name: 'Karina',
      lastname: 'Candia',
      email: 'candia.katina.98@gmail.com',
      age: 23,
    },
    {
      id: 4,
      name: 'Eliana',
      lastname: 'Meza',
      email: 'mezaEliana88@gmail.com',
      age: 20,
    },
  ];

  private students$ = new BehaviorSubject<Student[]>([]);

  private studentsObservable$ = this.students$.asObservable();

  loadStudents(): void {
    this.students$.next(this.students);
  }

  getStudents(): Observable<Student[]> {
    return this.studentsObservable$;
  }
}
