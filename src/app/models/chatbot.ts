export class BaseClass {
  id!: string;
}
export class ChatQuestion extends BaseClass {
  question!: string;
  show!: boolean;
}

export class ChatAnswer extends BaseClass {
  answer!: string;
  show!: boolean;
}

export class ChatQuestionRequest {
  question!: string;
}

export class AnswerRequest {
  questionId!: string;
  answer!: string;
}
