import { Component } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent {
  title = 'Push Notification Component';
  description = 'Angular-Spring Demo';

  greetings: string[] = [];
  disabled = true;
  name: string | undefined;
  private stompClient: any;

  constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/stomp-endpoint');
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/getMessage',function (hello: any) {
        _this.showGreeting(JSON.parse(hello.body).message);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  // sendName() {
  //   this.stompClient.send(
  //     '/app/sendMessage',
  //     {},
  //     JSON.stringify({ 'name': this.name })
  //   );
  // }

  showGreeting(message: string) {
    this.greetings.push(message);

    console.log(message)
  }
}
