import { PreferencesPlugin } from './../../../node_modules/@capacitor/preferences/dist/esm/definitions.d';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RequiredValidator } from '@angular/forms';
import { MinLengthValidator } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OpenTriviaServiceService } from '../service/open-trivia-service.service';
import { Difficulty, Question } from '../bo/question.model';
import { Answer } from '../bo/answer.model';
import { QuestionAnswers } from '../bo/questionanswers.model';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,ReactiveFormsModule],
})
export class HomePage implements OnInit{
  
  formBegin = new FormGroup(
    {
      pseudo: new FormControl("",[
        Validators.required,
        Validators.minLength(3,)
      ]),
      memorize: new FormControl(false),
     selectedDifficulty: new FormControl("easy",Validators.required)
    }
  )
  constructor(private service : OpenTriviaServiceService,private router :Router) {}

  validateStart(){
    let pseudo = this.formBegin.get("pseudo")!.value!
    let memorize = this.formBegin.get("memorize")!.value!
    let difficulty= this.formBegin.get("selectedDifficulty")!.value!

    console.log("pseudo" + this.formBegin.get("pseudo")!.value)
    console.log("memorize" + this.formBegin.get("memorize")!.value)
    if(memorize)
      Preferences.set({
        key:'pseudo',
        value :pseudo,
      }).then(_=>
        Preferences.set({
          key:'memorize',
          value :String(memorize),
        }
      ))
      .then(_=>
        Preferences.set({
          key:'difficulty',
          value :difficulty,
        }
      )).then(_=>{
        console.log("selectedDiff" + this.formBegin.get("selectedDifficulty")!.value)
        this.router.navigate(['/game',
        this.formBegin.get("pseudo")!.value,
        this.formBegin.get("selectedDifficulty")!.value]);
      })
      

  }
  
  
  ngOnInit() {
    Preferences.get({
      key:'pseudo'
    }).then( getResult =>{
      if(getResult)
        this.formBegin.get("pseudo")?.setValue(getResult.value!)
    }).then(_=>Preferences.get({
      key:'memorize'
    }).then( getResult =>{
      if(getResult){
        this.formBegin.get("memorize")?.setValue(Boolean(getResult.value!))
      }
    })).then(_=>
      Preferences.get({
        key:'difficulty'
      }).then( getResult =>{
        if(getResult){
          this.formBegin.get("selectedDifficulty")?.setValue(getResult.value!)
          this.router.navigate(['/game',
          this.formBegin.get("pseudo")!.value,
          this.formBegin.get("selectedDifficulty")!.value]);
        }
      })
    )
  }
  
}


export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};