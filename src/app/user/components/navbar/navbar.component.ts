import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private service: BaseService, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.chatQuestions();
  }
  questions: any[] = [];
  showLoader: boolean = false;
  initialQuestions: any[] = [];
  answers: any;
  isChatboxOpen = true;
  isExpanded = false;
  @ViewChild('chatbox') chatBox!: any;
  toggleTheme(e: any): void {
    const event = e.target.classList;
    const HTML = document.querySelector('html');

    if (event.contains('fa-moon')) {
      event.replace('fa-moon', 'fa-sun');
      HTML?.classList.add('dark');
    } else {
      event.replace('fa-sun', 'fa-moon');
      HTML?.classList.remove('dark');
    }
  }
  // "w-full md:block md:w-auto"
  // "w-full md:block md:w-auto hidden"
  hideNavbar(btn: HTMLElement, nav: HTMLElement): void {
    // nav.classList.add('hidden');
    // this.isExpanded = false;
    // btn.setAttribute('aria-expanded', 'false');
  }

  toggleChatbox(chatContainer: any) {
    chatContainer.classList.toggle('hidden');
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  chatQuestions(): void {
    this.service.Fetch<any>('ChatBot/active-questions').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const qns = response.result;
          this.updateQuestions(qns);
        }
      },
      error: (err: Error) => {},
    });
  }

  updateQuestions(qns: any): void {
    qns.forEach((q: any) => {
      this.insertQuestion(q);
    });
  }

  insertQuestion(q: any) {
   
    const div = this.renderer.createElement('div');
    const p = this.renderer.createElement('p');
    const text = this.renderer.createText(q.question);
    this.renderer.appendChild(p, text);
    this.renderer.addClass(p, 'bg-gray-200');
    this.renderer.addClass(p, 'text-gray-700');
    this.renderer.addClass(p, 'rounded-lg');
    this.renderer.addClass(p, 'py-2');
    this.renderer.addClass(p, 'px-2');
    this.renderer.addClass(p, 'm-2');
    this.renderer.addClass(p, 'inline-block');
    this.renderer.addClass(p, 'cursor-pointer');
    this.renderer.listen(p, 'click', () => this.getAnswer(q.id, q.question));
    this.renderer.appendChild(div, p);
    this.renderer.appendChild(this.chatBox.nativeElement, div);
  }
  getAnswer(id: string, text: string): void {
    this.showLoader = true;
    this.service.Fetch<any>(`ChatBot/answer/${id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const ans = response.result;
          ans.forEach((a: any) => {
            this.insertAnswer(a);
          });
          setTimeout(() => {
            this.showLoader = false;
            this.chatQuestions();
          }, (1000 * ans.length) / 2);
        }
      },
      error: (err: Error) => {},
    });
  }

  insertAnswer(a: any): void {
    const div = this.renderer.createElement('div');
    const p = this.renderer.createElement('p');
    const text = this.renderer.createText(a.answer);
    this.renderer.appendChild(p, text);
    this.renderer.addClass(p, 'bg-blue-500');
    this.renderer.addClass(p, 'text-white');
    this.renderer.addClass(p, 'rounded-lg');
    this.renderer.addClass(p, 'py-2');
    this.renderer.addClass(p, 'px-4');
    this.renderer.addClass(p, 'mb-2');
    this.renderer.addClass(p, 'inline-block');
    this.renderer.addClass(p, 'max-w-44');
    this.renderer.addClass(p, 'text-wrap');
    this.renderer.addClass(p, 'cursor-pointer');
    this.renderer.addClass(div, 'text-right');
    this.renderer.appendChild(div, p);
    setTimeout(() => {
      this.renderer.appendChild(this.chatBox.nativeElement, div);
    }, 1000);
  }
}
