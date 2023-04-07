import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/Student.model';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private studentService: StudentService) { }
  isLoading = false;
  error = null;
  studentList: Student[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudentLists().subscribe((res) => {
      this.studentList = res;
      console.log(this.studentList);
      this.isLoading = false;
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })
  }

}
