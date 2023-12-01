import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    public messages = new BehaviorSubject<string[]>([]);

    add(message: string) {
        this.messages.next([...this.messages.getValue(), message]);
    }

    clear() {
        this.messages.next([]);
    }
}
