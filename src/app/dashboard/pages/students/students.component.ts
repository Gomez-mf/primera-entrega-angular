import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Observable, Subscriber, filter, map, of, pipe, tap } from 'rxjs';
import { Student } from './models';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Observable<Student[]>;

  constructor(private studentsService: StudentsService) {
    this.students = this.studentsService
      .getStudents()
      .pipe(map((students) => students.filter((student) => student.age > 20)));
    this.studentsService.loadStudents();
  }
}
