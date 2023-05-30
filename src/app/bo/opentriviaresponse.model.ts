import { Question } from "./question.model"

export interface OpenTriviaResponse{
    response_code:number
    results: Question[]
}