import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements  OnInit, OnDestroy {
  @Input() title = 'Error'

  message = ''
  hidden = true;

  constructor(
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.messageService.message$
      .subscribe(text => {
        this.hidden = false
        this.message = text;
      })
  }

  ngOnDestroy(): void {
  }

}
