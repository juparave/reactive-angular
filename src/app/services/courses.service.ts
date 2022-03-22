import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay }  from 'rxjs/operators';

import { Course } from '../model/course';
import {Lesson} from '../model/lesson';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  constructor(private http: HttpClient) {

  }

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses')
    .pipe(
      map((resp:any) => resp["payload"]),
      // only one request with shareReplay
      shareReplay()
    );
  }

  saveCourse(courseID:string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseID}`, changes)
    .pipe(
      shareReplay()
    );
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: {
        filter: search,
        pageSize: "100"
      }
    })
    .pipe(
      map((res: any) => res["payload"]),
      shareReplay()
    );
  }

}
