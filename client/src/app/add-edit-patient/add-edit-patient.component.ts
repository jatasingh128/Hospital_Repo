import { Component, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DialogComponent, BeforeOpenEventArgs } from '@syncfusion/ej2-angular-popups';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, MaskedTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DataService } from '../data.service';
import { AddEditPatientService } from './add-edit-patient.component.service'

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditPatientComponent {
  @Output() refreshEvent = new EventEmitter<string>();
  @ViewChild('newPatientObj')
  public newPatientObj: DialogComponent;
  public animationSettings: Object = { effect: 'None' };
  public title = 'New Patient';
  public selectedGender = 'Male';
  public dobValue: Date = new Date(1996, 0, 31);
  public dialogState: string;
  public bloodGroupData: Object[];
  public fields: Object = { text: 'Text', value: 'Value' };
  // public patientsData: { [key: string]: Object }[];
  public activePatientData: { [key: string]: Object; };
  public hospitalData: { [key: string]: Object }[];
  public doctorsData: { [key: string]: Object }[];
  public patientsData: any;
  constructor(private dataService: DataService, private patientService: AddEditPatientService) {
    this.bloodGroupData = this.dataService.bloodGroupData;
    // this.patientsData = this.dataService.getPatientsData();
    // this.patientsData = this.patientService.getPatientsData();
    this.getPatientData();
    this.hospitalData = this.dataService.getHospitalData();
    this.doctorsData = this.dataService.getDoctorsData();
    this.activePatientData = this.dataService.getActivePatientData();
  }

  getPatientData(){
    this.patientService.getPatientsData().subscribe((response) => {
      this.patientsData = response;
      this.patientsData.map((x,i)=>x["Id"]=i+1);
      this.dataService.setPatientsData(this.patientsData);
      this.refreshEvent.emit();
    }, (error) => {
      console.log('Patient get api error is ', error)
    });
  }

  onAddPatient() {
    this.dialogState = 'new';
    this.title = 'New Patient';
    this.newPatientObj.show();
  }

  onCancelClick() {
    this.resetFormFields();
    this.newPatientObj.hide();
  }

  addPatinet(newPatientObj) {
    console.log("dataaaaaaa", newPatientObj)
    this.patientService.addPatientData(newPatientObj).subscribe(response => {
      console.log("Response is", response);
    }, (error) => {
      console.log('error is ', error)
    })
  }

  onSaveClick() {
    const formElementContainer: HTMLElement = document.querySelector('.new-patient-dialog #new-patient-form');
    if (formElementContainer && formElementContainer.classList.contains('e-formvalidator') &&
      !((formElementContainer as EJ2Instance).ej2_instances[0] as FormValidator).validate()) {
      return;
    }
    const obj: { [key: string]: Object; } = this.dialogState === 'new' ? {} : this.activePatientData;
    const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-patient-dialog .e-field'));
    for (const curElement of formelement) {
      let columnName: string = curElement.querySelector('input').name;
      const isDropElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isDropElement || isDatePickElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          obj[columnName] = instance.value;
        } else if (columnName === 'DOB' && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DatePicker;
          obj[columnName] = instance.value;
        } else if (columnName === 'Gender') {
          obj[columnName] = this.selectedGender;
        } else {
          obj[columnName] = curElement.querySelector('input').value;
        }
      }
    }
    // vvvvvvvvvv this.patientsData = this.dataService.getPatientsData();
    if (this.dialogState === 'new') {
      // obj['Id'] = Math.max.apply(Math, this.patientsData.map((data) => data.Id)) + 1;
      obj['NewPatientClass'] = 'new-patient';
      this.addPatinet(obj);
    } else {
      console.log("old data")
      this.activePatientData = obj;
      this.dataService.setActivePatientData(this.activePatientData);
    }
    const activityObj: { [key: string]: Object } = {
      Name: this.dialogState === 'new' ? 'Added New Patient' : 'Updated Patient',
      Message: `${obj['Name']} for ${obj['Symptoms']}`,
      Time: '10 mins ago',
      Type: 'patient',
      ActivityTime: new Date()
    };
    this.dataService.addActivityData(activityObj);
    this.getPatientData();
    this.resetFormFields();
    this.newPatientObj.hide();
  }

  resetFormFields(): void {
    const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-patient-dialog .e-field'));
    this.dataService.destroyErrorElement(document.querySelector('#new-patient-form'), formelement);
    for (const curElement of formelement) {
      let columnName: string = curElement.querySelector('input').name;
      const isDropElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isDropElement || isDatePickElement) {
        if (columnName === '' && isDropElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          instance.value = instance.dataSource[0];
        } else if (columnName === 'DOB' && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DatePicker;
          instance.value = new Date();
        } else if (columnName === 'Gender') {
          curElement.querySelectorAll('input')[0].checked = true;
        } else {
          curElement.querySelector('input').value = '';
        }
      }
    }
  }

  onGenderChange(args: any) {
    this.selectedGender = args.target.value;
  }

  showDetails() {
    this.dialogState = 'edit';
    this.title = 'Edit Patient';
    this.newPatientObj.show();
    this.activePatientData = this.dataService.getActivePatientData();
    const obj: { [key: string]: Object; } = this.activePatientData;
    const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.new-patient-dialog .e-field'));
    for (const curElement of formelement) {
      let columnName: string = curElement.querySelector('input').name;
      const isCustomElement: boolean = curElement.classList.contains('e-ddl');
      const isDatePickElement: boolean = curElement.classList.contains('e-date-wrapper');
      if (!isNullOrUndefined(columnName) || isCustomElement || isDatePickElement) {
        if (columnName === '' && isCustomElement) {
          columnName = curElement.querySelector('select').name;
          const instance: DropDownList = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DropDownList;
          instance.value = <string>obj[columnName];
          instance.dataBind();
        } else if (columnName === 'DOB' && isDatePickElement) {
          const instance: DatePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as DatePicker;
          instance.value = <Date>obj[columnName] || null;
        } else if (columnName === 'Gender') {
          if (obj[columnName] === 'Male') {
            curElement.querySelectorAll('input')[0].checked = true;
          } else {
            curElement.querySelectorAll('input')[1].checked = true;
          }
        } else {
          curElement.querySelector('input').value = <string>obj[columnName];
        }
      }
    }
  }

  onBeforeOpen(args: BeforeOpenEventArgs) {
    const formElement: HTMLFormElement = args.element.querySelector('#new-patient-form');
    if (formElement && formElement.ej2_instances) {
      return;
    }
    const customFn: (args: { [key: string]: HTMLElement }) => boolean = (e: { [key: string]: HTMLElement }) => {
      const argsLength = ((e.element as EJ2Instance).ej2_instances[0] as MaskedTextBoxComponent).value.length;
      if (argsLength !== 0) {
        return argsLength >= 10;
      } else {
        return false;
      }
    };
    const rules: { [key: string]: Object } = {};
    rules['Name'] = { required: [true, 'Enter valid name'] };
    rules['DOB'] = { required: true, date: [true, 'Select valid DOB'] };
    rules['Mobile'] = { required: [customFn, 'Enter valid mobile number'] };
    rules['Email'] = { required: [true, 'Enter valid email'], email: [true, 'Email address is invalid'] };
    this.dataService.renderFormValidator(formElement, rules, this.newPatientObj.element);
  }
}
