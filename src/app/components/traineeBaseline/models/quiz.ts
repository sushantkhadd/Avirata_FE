import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number;
    description: string;
    config: QuizConfig;
    questions: Question[];
    constructor(config, res) {
        var data = res;
        this.config = new QuizConfig(config);
        this.questions = [];
        res.forEach(q => {
            this.questions.push(new Question(q));
        });
    }
}
