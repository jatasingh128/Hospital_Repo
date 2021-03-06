import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AddEditDoctorService {
    public doctorData: { [key: string]: Object }[];
    constructor(private http: HttpClient) { }
    private _doctorUrl = 'http://localhost:3000/api/doctor';

    getDoctorsData() {
        console.log("get api")
        return this.http.get(this._doctorUrl);
    }

    addDoctorData(doctorData) {
        console.log(doctorData, '@@@@@@@@@@@@')
        return this.http.post(this._doctorUrl, doctorData);
    }

    deleteDoctor(id: any) {
        return this.http.delete<any>(this._doctorUrl + '/' + id);
    }

    editDoctorData(data: any) {
        return this.http.put<any>(this._doctorUrl + '/' + data._id, data);
    }

}