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

  items:any;
  idList = [];
  userObject = [];
  user = {
    name: '',
    email: '',
  }
  answer = ["Orange", "Dhaka"];
  publishscore: boolean;
  score: number = 0;
  
  
  constructor(public firestore: AngularFirestore) {
    firestore.collection('quiz').valueChanges().subscribe(object => {

      this.items = object;

      
    });
    
  }

  ngOnInit() {

  }

  getUserValue(question_no:number, option_no:number, useranswer:string) {
      this.idList[question_no] = 'mark-' + question_no.toString() + option_no.toString(); 
      this.userObject[question_no] = useranswer;
      
  }

  omSubmit(event:any, user) {
    this.publishscore = true;
    event.preventDefault();
    var element = document.getElementById("mark-*");

   for(var i = 0; i < this.userObject.length; i++) {
    let id = this.idList[i];

    if(this.answer[i] == this.userObject[i]) {
        document.getElementById(id).classList.add("correctMark");
        this.score = this.score + 1;
    }
    else {
        document.getElementById(id).classList.add("wrongMark");
    }
   }
    var email = user.email;

    console.log(user, this.score);

     this.firestore.collection('quiz_answer').doc(email).set({
        username: user.name,
        email: user.email,
        score: this.score
     })

  }

  refreshPage() {
    location.reload();

  }

}
