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
  title = 'quiz-app';
  username:any;
  userEmail:any;
  mark: any;
  userObject = [];
  user = {
    name: 'Ahmad',
    email: 'TheAhmadSharif@gmail.com',
    answer: [],
    mark: []
  }
  answer = ["Orange", "Dhaka"];
  
  items;
  constructor(firestore: AngularFirestore) {
    firestore.collection('quiz').valueChanges().subscribe(object => {

      this.items = object;
      
      console.log(object);

      
    });
    
  }

  ngOnInit() {
    // document.getElementById(id).innerHTML = 'hi';
 }

  getUserValue(question_no, option_no, useranswer) {

    if(this.answer[question_no] == useranswer) {
      this.user.mark[question_no] = 'correctMark';
    }
    else {
      this.user.mark[question_no] = 'wrongMark';
    }

      this.userObject[question_no] = useranswer;
      console.log(question_no, option_no, useranswer, this.userObject);

      let id = 'mark' + question_no.toString() + option_no.toString(); 

      console.log(id);

      this.ngOnInit();

      
  }

  omSubmit(event:any, user) {
    event.preventDefault();



  }

}
