import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { Student } from 'src/app/model/Student.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url = 'http://localhost:9000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getStudentLists() {
    return this.http.get<Student[]>(`${this.url}/students`).pipe(
      catchError(this.handelError)
    );
  }
  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (errorRes.error) {
      errorMessage = 'Please enter valid email and passwrod';
    }
    return throwError(errorMessage);
  }
}
