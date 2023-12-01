import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageService } from '../message.service';

// [x] 10:50 Использовать не дефолтную стратегию обнаружения изменений, т.к. она перерисовывает всё приложение при изменении
// Заменить на OnPush стратегию
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {}


}
