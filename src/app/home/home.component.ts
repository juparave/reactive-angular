import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourseService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.services';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$?: Observable<Course[]>;

  advancedCourses$?: Observable<Course[]>;


  constructor(
    private coursesService: CourseService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.reloadCourses();

  }

  reloadCourses() {

    const courses$ = this.coursesService.loadAllCourses().pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
      catchError(err => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    );

    // new observable now with loadingService attached
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    courses$.subscribe(val => console.log(val));

    // use new observable
    this.beginnerCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );

    // use new observable
    this.advancedCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  }

}




