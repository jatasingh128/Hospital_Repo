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
        console.log("get api")
        return this.http.get(this._patientUrl)       
    }

    addPatientData(patientData:any){
        console.log("post api")
      return this.http.post<any>(this._patientUrl,patientData);
    }
}