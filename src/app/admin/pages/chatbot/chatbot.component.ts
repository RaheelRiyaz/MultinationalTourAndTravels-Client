import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import {
  AnswerRequest,
  ChatAnswer,
  ChatQuestion,
  ChatQuestionRequest,
} from '../../../models/chatbot';
import { ToastSwal } from '../../../utilis/swal';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  constructor(private service: BaseService) {}
  questions: ChatQuestion[] = [];
  questionId: string = '';
  selectedQuestionId: string = '';
  answers: ChatAnswer[] = [];
  answerRequest: AnswerRequest = new AnswerRequest();
  chatQuestionRequest: ChatQuestionRequest = new ChatQuestionRequest();
  ngOnInit() {
    initFlowbite();
    this.getQuestions();
  }

  getQuestions(): void {
    this.service.Fetch<ChatQuestion>('chatbot/all-questions').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.questions = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteQuestion(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service
          .Delete<number>(`chatbot/question-answers/${id}`)
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                ToastSwal.fireSwal(response.message);
                this.getQuestions();
              } else ToastSwal.fireSwal(response.message, false);
            },
            error: (err: Error) => {
              ToastSwal.fireSwal(err.message, false);
            },
          });
      }
    });
  }

  showAnswers(id: string) {
    if (this.selectedQuestionId === id) this.selectedQuestionId = '';
    else this.selectedQuestionId = id;

    if (this.selectedQuestionId) this.questionAnswers(id);
  }

  questionAnswers(id: string): void {
    this.service.Fetch<ChatAnswer>(`chatbot/answer/${id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.answers = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  toggleStatus(id: string): void {
    this.service.Update<any, number>({ id }, 'chatbot/status').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getQuestions();
        } else ToastSwal.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  addQuestion(): void {
    this.service
      .Post<ChatQuestionRequest, ChatAnswer>(
        this.chatQuestionRequest,
        'chatbot/chat-question'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getQuestions();
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  addAnswer(): void {
    this.answerRequest.questionId = this.questionId;
    this.service
      .Post<AnswerRequest, ChatAnswer>(this.answerRequest, 'chatbot/answer')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
