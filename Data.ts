import { Utility } from "./Utility";

type QuestionId = string;
type UserId = string;
type ChannelId = string;
export type QuestionType = "MULTI_CHOICE" | "TRUE_FALSE";
    
interface Answer {
    text: string;
    correct: boolean;
}

export class Question {
    id: string;
    answers: Array<Answer>;

    constructor(public questionType: QuestionType, public text: string) {
        this.id = Utility.generateUid(8);
        this.answers = new Array();
    }
}

export class Data {
     questions = new Map<QuestionId, Question>();
     users = new Map<UserId, Question>(); // Used to track which question the user is creating
     channels = new Map<ChannelId, Array<Question>>();
}