import { Question } from "./question.model"
import { Answer } from "./answer.model"


export interface QuestionAnswers{
    question: Question
    answers: Answer[]

}