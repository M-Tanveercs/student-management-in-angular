import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  modalData: any = {};
  editMode: boolean = false;
  editIndex: number = -1;
text:string='Add'

  constructor() { }

  
     @ViewChild('content') content: any;
     public  ngOnInit() {
this.loadDataFromLocalStorage()
  }


 

  getData(formData: any) {
    if (this.editMode) {
      console.log('edit');
      
      this.students[this.editIndex] = formData;
      this.editMode = false;
     
    } else {
      // Add new student data
      this.students.push(formData);
      
    }

    // Save data to localStorage
    this.saveDataToLocalStorage();

    // Clear form and close modal
    this.modalData = {};
    this.editIndex = -1;
  // location.reload()
  }
openModal(mode: string) {
    // Reset modalData and set mode
   
    this.text = mode === 'add' ? 'Add' : 'Update';
  }

editStudent(index: number) {

 // Set data to the modal for editing
  
  this.modalData = { ...this.students[index] };
  this.editMode = true;
  this.editIndex = index;
 



}




  deleteStudent(index: number) {
    // Delete student data
    this.students.splice(index, 1);

    // Save data to localStorage
    this.saveDataToLocalStorage();
  }

resetFormAndModal() {
  this.modalData = {
    name: '',
    email: '',
    mobile: '',
    age: '',
    class: '',
    address: ''
  };
  this.editMode = false;
  this.editIndex = -1;
  this.loadDataFromLocalStorage(); // Optionally, reload data from localStorage
}


  private saveDataToLocalStorage() {
    // Save data to localStorage
    localStorage.setItem('students', JSON.stringify(this.students));

  }

  private loadDataFromLocalStorage() {
    // Load data from localStorage
    const storedData = localStorage.getItem('students');
    this.students = storedData ? JSON.parse(storedData) : [];
  }
  
}
