import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AddEditDoctorComponent } from '../add-edit-doctor/add-edit-doctor.component';
import { DataService } from '../data.service';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';
import { AddEditDoctorService } from '../add-edit-doctor/add-edit-doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorsComponent implements OnInit {
  @ViewChild('addEditDoctorObj')
  public addEditDoctorObj: AddEditDoctorComponent;
  @ViewChild('specializationObj')
  public specializationObj: DropDownListComponent;
  @ViewChild('specialistItemObj')
  public specialistItemObj: any;
  public doctorsData: any;
  public activeDoctorData: { [key: string]: Object };
  public filteredDoctors: { [key: string]: Object }[];
  public specializationData: Object[];
  public fields: Object = { text: 'Text', value: 'Id' };
  public selectedDepartmentId: string;
  public tooltipObj: Tooltip;

  constructor(public dataService: DataService, private router: Router, public doctorService: AddEditDoctorService) {
    // this.doctorsData = this.filteredDoctors = this.dataService.getDoctorsData();
    this.getDoctorData();
    this.specializationData = this.dataService.specialistData;
  }

  ngOnInit() {
    this.dataService.updateActiveItem('doctors');
    this.tooltipObj = new Tooltip({
      height: '30px',
      width: '76px',
      position: 'RightTop',
      offsetX: -10,
      showTipPointer: false,
      target: '.availability',
      beforeOpen: (args: TooltipEventArgs) => {
        args.element.querySelector('.e-tip-content').textContent =
          args.target.classList[1].charAt(0).toUpperCase() + args.target.classList[1].slice(1);
      }
    });
    this.tooltipObj.appendTo(this.specialistItemObj.nativeElement);
  }

  getColor(args: { [key: string]: string }) {
    return args.Color;
  }

  getDoctorData() {
    return this.doctorService.getDoctorsData().subscribe((result: any) => {
      this.doctorsData = this.filteredDoctors = result;
      console.log(result,'*******************88')
      this.activeDoctorData = this.doctorsData[0];
    }, (error) => {
      console.log(error);
    })
  }

  onSpecializationChange(args?: any) {
    let filteredData: { [key: string]: Object }[];
    if (args && args.value) {
      this.selectedDepartmentId = args ? args.itemData.DepartmentId : this.selectedDepartmentId;
      filteredData = this.doctorsData.filter((item: any) => item.DepartmentId == this.selectedDepartmentId);
    } else {
      this.selectedDepartmentId = null;
      filteredData = this.doctorsData;
    }
    this.filteredDoctors = filteredData;
  }

  onSpecialistClick(args: any) {
    this.tooltipObj.close();
    const specialistId: string = args.currentTarget.querySelector('.specialist-item')['id'].split('_')[1];
    const filteredData: Object[] = this.doctorsData.filter((item: any) => item.Id === parseInt(specialistId as string, 10));
    this.dataService.setActiveDoctorData(<{ [key: string]: Object }>filteredData[0]);
    this.router.navigateByUrl('/doctor-details/' + specialistId);
  }

  onAddDoctor() {
    this.addEditDoctorObj.onAddDoctor();
  }

  updateDoctors() {
    this.doctorsData = this.getDoctorData();
    if (this.selectedDepartmentId) {
      this.filteredDoctors = this.doctorsData.filter((item: any) => item.DepartmentId === this.selectedDepartmentId);
    }
  }

  getEducation(text: Object) {
    return (<string>text).toUpperCase();
  }
}
