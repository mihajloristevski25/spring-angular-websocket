import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PushNotificationComponent} from "../push-notification-component/push-notification.component";
import {WebSocketComponent} from "../web-socket/web-socket.component";


const routes: Routes = [
  { path: 'first', component: WebSocketComponent },
  { path: 'second', component: PushNotificationComponent },
  { path: '', redirectTo: 'first', pathMatch: 'full'},
  { path: '**', redirectTo: 'first', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
