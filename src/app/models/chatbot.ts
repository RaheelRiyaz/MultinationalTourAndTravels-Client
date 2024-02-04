export class BaseClass {
  id!: string;
}
export class ChatQuestion extends BaseClass {
  question!: string;
}

export class ChatAnswer extends BaseClass {
  answer!: string;
}
