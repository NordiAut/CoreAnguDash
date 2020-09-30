import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Server } from '../Shared/server';
import { ServerMessage } from '../Shared/server-message';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  // color: string;
  // buttonText: string;
  // serverStatus: string;
  // isLoading: boolean;

   @Input() serverInput: Server;
  // @Output() serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
   // this.setServerStatus(this.serverInput.isOnline);
  }


  // setServerStatus(isOnline: boolean): void {
  //   if (isOnline) {
  //     this.serverInput.isOnline = true;
  //     this.serverStatus = 'Online';
  //     this.color = '#66BB6A',
  //     this.buttonText = 'Shut Down';
  //   } else {
  //     this.serverInput.isOnline = false;
  //     this.serverStatus = 'Offline';
  //     this.color = '#FF6B6B';
  //     this.buttonText = 'Start';
  //   }
  // }


  // makeLoading(): void  {
  //   this.color = '#FFCA28';
  //   this.buttonText = 'Pending...';
  //   this.isLoading = true;
  //   this.serverStatus = 'Loading';
  // }

  // sendServerAction(isOnline: boolean): void  {
  //   console.log('sendServerAction called!');
  //   this.makeLoading();
  //   const payload = this.buildPayload(isOnline);
  //   this.serverAction.emit(payload);
  // }

  // buildPayload(isOnline: boolean): ServerMessage {
  //   if (isOnline) {
  //     return {
  //       id: this.serverInput.id,
  //       payload: 'deactivate'
  //     };
  //   } else {
  //     return {
  //       id: this.serverInput.id,
  //       payload: 'activate'
  //     };
  //   }
  // }


}
