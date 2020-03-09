import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  answer:any;
  
  items;
  constructor(firestore: AngularFirestore) {
    firestore.collection('quiz').valueChanges().subscribe(object => {

      this.items = object;
      
      console.log(object);

      
    });
    
  }

  omSubmit(event:any, user) {
    event.preventDefault();

    console.log(user);
    var answer = ["Orange", "Dhaka"];

    this.user.mark = [];

    


  }

}
