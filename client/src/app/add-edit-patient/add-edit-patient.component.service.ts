import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })

export class AddEditPatientService{
    public patientsData: { [key: string]: Object }[];
    constructor(private http: HttpClient) { }
    private _patientUrl='http://localhost:3000/api/patient';
    getPatientsData(){
        return this.http.get(this._patientUrl)       
    }

    addPatientData(patientData:any){
      return this.http.post<any>(this._patientUrl,patientData);
    }
}