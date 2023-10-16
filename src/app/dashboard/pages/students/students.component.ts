import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Subscriber } from 'rxjs';
import { Student } from './models';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  studentName = '';

  students: Student[] = [
    {
      id: 1,
      name: 'Malena',
      lastname: 'Areco',
      email: 'malenaAreco@gmail.com',
    },
    {
      id: 2,
      name: 'Cecilia',
      lastname: 'Almaraz',
      email: 'cecilia.almaraz@gmail.com',
    },
    {
      id: 3,
      name: 'Karina',
      lastname: 'Candia',
      email: 'candia.katina.98@gmail.com',
    },
    {
      id: 4,
      name: 'Eliana',
      lastname: 'Meza',
      email: 'mezaEliana88@gmail.com',
    },
  ];
  constructor(private matDialog: MatDialog) {}

  openStudentsDialog(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          console.log('valor', v);
          if (!!v) {
            this.students = [
              ...this.students,
              {
                ...v,
                id: new Date().getTime(),
              },
            ];
          }
        },
      });
  }
  onEditStudent(Student: Student): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: Student,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            const newStudent = [...this.students];

            const indextToEdit = newStudent.findIndex(
              (s) => s.id === Student.id
            );

            newStudent[indextToEdit] = { ...newStudent[indextToEdit], ...v };

            this.students = [...newStudent];
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    this.students = this.students.filter((s) => s.id !== studentId);
  }
}
