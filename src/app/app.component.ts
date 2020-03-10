import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username:any;
  userEmail:any;
  items:any;
  idList = [];
  userObject = [];
  user = {
    name: 'Ahmad',
    email: 'TheAhmadSharif@gmail.com',
    answer: [],
    mark: []
  }
  answer = ["Orange", "Dhaka"];
  
  
  constructor(firestore: AngularFirestore) {
    firestore.collection('quiz').valueChanges().subscribe(object => {

      this.items = object;

      
    });
    
  }

  ngOnInit() {

  }

  getUserValue(question_no:number, option_no:number, useranswer:string) {
      this.idList[question_no] = 'mark-' + question_no.toString() + option_no.toString(); 
      this.userObject[question_no] = useranswer;
      // console.log(this.idList);
      
  }

  omSubmit(event:any, user) {
    event.preventDefault();

   for(var i = 0; i < this.userObject.length; i++) {
    let id = this.idList[i];

    if(this.answer[i] == this.userObject[i]) {
        document.getElementById(id).classList.add("correctMark");
    }
    else {
        document.getElementById(id).classList.add("wrongMark");
    }

   
    

   }

    console.log(this.userObject);



  }

}
