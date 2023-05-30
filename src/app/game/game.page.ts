import { Difficulty, Question } from './../bo/question.model';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../bo/answer.model';
import { OpenTriviaServiceService } from '../service/open-trivia-service.service';
import { QuestionAnswers } from '../bo/questionanswers.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GamePage implements OnInit {
  pseudo?: string;
  difficulty?: Difficulty;
  index = 0
  listQuestionsAndAnswers : QuestionAnswers[] = []
  questions: Question[] = []
  listAnswers : Answer[] = []
  score = 0
  gameBegin = false
  formGame = new FormControl<Answer | null>(null,Validators.required);
  questionReplied= false;
  isEndToastOpen = false;

  constructor(
    private  _location: Location,
    private service : OpenTriviaServiceService,
    private route : ActivatedRoute){}

  ngOnInit() {

    if(this.route.snapshot.paramMap.get('pseudo')&& this.route.snapshot.paramMap.get('difficulty')){
      this.pseudo = this.route.snapshot.paramMap.get('pseudo')!
      console.log(this.route.snapshot.paramMap.get('difficulty'))
      this.difficulty = this.route.snapshot.paramMap.get('difficulty')! as Difficulty
    }else      
      this._location.back()

    this.service.getQuestions(Difficulty.easy).subscribe(
      listQuestions => {
        this.questions = listQuestions
        this.questions.forEach(q => {
          this.listQuestionsAndAnswers.push( {
            question : q,
            answers: this.getAnswers(q)
          })
        })
      } 
    );


  }
  nextQuestion(){
    this.index++
    this.questionReplied = false
    this.formGame.setValue(null)
  }
  restart(){
    this.index = 0
    this.score = 0
    this.questionReplied = false
    this.formGame.setValue(null)
  }
  getColor(answer:Answer){
    if(this.questionReplied && answer.valid)
     return "success"
    else if(this.questionReplied)
      return "danger"
    else
      return "medium"
  }
  validateResponse(answer:Answer){
    if(answer.valid) {
      this.score++
      if(this.index +1 == this.questions.length)
        this.isEndToastOpen = true;

    }
    this.formGame.setValue(answer)
    this.questionReplied = true;
    console.log("Vous avez répondu" + this.formGame.value)
    console.log("index :" + this.index)
    console.log("indexQA :" + this.questions.length)

  }
  getQuestion():Question{
    return this.questions[this.index]
  }
  getAnswers(question: Question):  Answer[]{
    const correctOne : Answer = {
      answer : question.correct_answer,
      valid: true
    };
    const listWrong : Answer[]=question.incorrect_answers.map<Answer>(
      incorrectAnswer =>{
        return {
          answer: incorrectAnswer,
          valid: false
        }
      } 
    ); 
    return shuffle(listWrong.concat(correctOne))
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
