import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    // [ ] 10:35 У массивов одинаковая ссылка поэтому стратегия обнаружения не заметит изменения и 
    // не перерисует компонент (перерисовавает, т.к. всё приложение целиком перерисовывается)
    // [ ] 12:25 поменять на BehaviorSubject и подписывать в компоненте
    messages: string[] = [];

    add(message: string) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}
