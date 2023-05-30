export interface Question{
    category : string ;
    type: string;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[]

}

export enum Difficulty{
    easy="easy",
    medium = "medium",
    hard="hard"
}