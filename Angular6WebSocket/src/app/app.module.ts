import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PushNotificationComponent} from "./push-notification-component/push-notification.component";
import {CoreRoutingModule} from "./core/core-routing.module";
import {WebSocketComponent} from "./web-socket/web-socket.component";

@NgModule({
  declarations: [
    AppComponent,
    PushNotificationComponent,
    WebSocketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
