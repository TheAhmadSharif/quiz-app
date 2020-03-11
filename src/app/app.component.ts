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
  isSubmitted: boolean;
  correctAnswerPosition = [];
  items:any;
  idList = [];
  userObject = [];
  user = {
    name: 'Ahmad',
    email: 'ahmad@gmail.com',
  }
  answer = ["Orange", "Dhaka"];
  publishscore: boolean;
  score: number = 0;
  
  
  constructor(public firestore: AngularFirestore) {
    firestore.collection('quiz').valueChanges().subscribe(object => {
      this.items = object;


      for(var i = 0; i < this.items.length; i++) {

            for(var j = 0; j < this.items[0].option.length; j++) {
                if(this.items[i].option[j] == this.answer[i]) {
                    this.correctAnswerPosition[i] = 'mark-' + i.toString() + j.toString();
                }
            }

      }


    });
    
  }

  ngOnInit() {
      this.score = 0;
      this.user.name = null;
      this.user.email = null;
      this.isSubmitted = true;
  }

  getUserValue(question_no:number, option_no:number, useranswer:string) {
      this.idList[question_no] = 'mark-' + question_no.toString() + option_no.toString(); 
      this.userObject[question_no] = useranswer;
      
  }

  omSubmit(event:any, user) {
    event.preventDefault();

    this.publishscore = true;
    this.correctAnswerPosition;
    this.score = 0;


   for(var i = 0; i < this.userObject.length; i++) {
    let id = this.idList[i];
    let correctid = this.correctAnswerPosition[i];

    if(this.answer[i] == this.userObject[i]) {
        document.getElementById(id).classList.add("correctMark");
        this.score = this.score + 1;
    }
    else {
        document.getElementById(correctid).classList.add("correctMark");
        document.getElementById(id).classList.add("wrongMark");
    }
   }
    var email = user.email;



    if(this.userObject.length > 0 && email && user.name) {
          this.firestore.collection('quiz_answer').doc(email).set({
            username: user.name,
            email: user.email,
            score: this.score
        })
        .then(function() {
          
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      this.isSubmitted = false;

      
    }

     

  }

  refreshPage() {
    location.reload();

  }

}
