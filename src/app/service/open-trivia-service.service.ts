import { Answer } from './../bo/answer.model';
import { Injectable } from '@angular/core';
import { Difficulty, Question } from '../bo/question.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { OpenTriviaResponse } from '../bo/opentriviaresponse.model';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaServiceService {

  constructor(private httpClient: HttpClient) { }

getQuestions (difficulty:Difficulty) : Observable<Question[]> {
    return this.httpClient.get<OpenTriviaResponse>("https://opentdb.com/api.php",{
      params:{
        "amount" : 10,
        "difficulty":difficulty.toString()
      }
    }).pipe(
      map<OpenTriviaResponse,Question[]>(responseMap =>{
        return responseMap.results as Question[]
        }
      )
    )

    //return  [
    //  {
    //   category: "Entertainment: Japanese Anime & Manga",
    //   type: "multiple",
    //   difficulty: Difficulty.easy,
    //   question: "In \"Fairy Tail\", what is the nickname of Natsu Dragneel?",
    //   correct_answer: "The Salamander",
    //   incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"]
    //  },
    //  {
    //   category: "Entertainment: Video Games",
    //   type: "boolean",
    //   difficulty:  Difficulty.medium,
    //   question: "\"Return to Castle Wolfenstein\" was the only game of the Wolfenstein series where you don\'t play as William \"B.J.\" Blazkowicz",
    //   correct_answer: "False",
    //   incorrect_answers: ["True"]
    //  }
    //]
    
  }
}
