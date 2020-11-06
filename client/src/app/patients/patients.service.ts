import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PatientService {
    public serverUrl: 'localhost:3000';

    constructor(private http: HttpClient) { }

    getPatientsData() {
        return this.http.get(this.serverUrl + '/patient');
    }
}