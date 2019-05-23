import { Option } from './option';

export class Question {
    id: number;
    name: string;
    options: Option[];
    answered: boolean;
    ans: any;

    constructor(data: any) {
        data = data || {};
        console.log("In Question.ts=", data);
        this.id = data.questionid;
        this.name = data.question;
        this.ans = data.answer;
        if (this.ans == null)
            this.answered = false;
        else
            this.answered = true;

        this.options = [];
        
        data.options.forEach((o) => {
            if(o.value != '' && o.value != null && o.value != undefined){
                this.options.push(new Option(o, this.ans));           
            }
        });

    }
}
