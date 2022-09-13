import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import {Component} from "@angular/core";

@Component({
  selector: 'web-socket-component',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent {
  title = 'Web Socket Component';
  description = 'Angular-Spring Demo';

  greetings: string[] = [];
  disabled = true;
  name: string | undefined;
  private stompClient: any;

  constructor() {
  }

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

      _this.stompClient.subscribe('/topic/getMessage', function (hello: any) {
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

  sendName() {
    this.stompClient.send(
      '/app/sendMessage',
      {},
      JSON.stringify({'name': this.name})
    );
  }

  showGreeting(message: string) {
    this.greetings.push(message);

    console.log(message)
  }
}
