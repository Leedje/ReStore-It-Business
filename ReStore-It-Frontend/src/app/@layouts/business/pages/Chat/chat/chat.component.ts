import { Component, OnInit } from '@angular/core';
import { webSocketUrl } from '../../../../../app.config';
import { MessageDTO } from '../../../../../dtos/messageDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../../services/chatService/chat.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  //extract username from Jwtclaims => its the subject.
  chatTitle: string = '';
  message = new MessageDTO();

  private chatRoomId: string = '';
  socket!: WebSocket;

  //currentUser == message.sellerName
  currentUser: any

  public messages: MessageDTO[] = []

  constructor(private chatService: ChatService, private urlRoute: ActivatedRoute, private sessionManagement: SessionManagementService) {
  }

  ngOnInit(): void {

    this.chatRoomId = this.urlRoute.snapshot.paramMap.get('chatRoomId') || '';
    this.socket = new WebSocket(`${webSocketUrl}/${this.chatRoomId}`);

    this.socket.onmessage = (event) => {
      const message: MessageDTO = JSON.parse(event.data);
      this.messages.push(message);
    };

    this.chatService.GetChatHistory(this.chatRoomId).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.messages = response.body;
      }
      else {
        // show 404 page
        console.error("No chat ID found in route.")
      }
    },
      (error) => {
        console.error(error)
      });
  }

  sendMessage(): void {
    this.message = {
      id: '',
      chatRoomId: this.chatRoomId,
      sender: this.sessionManagement.getUsernameFromSession() || '',
      receiver: '',
      content: this.message.content,
      timeSent: ''
    };

    this.socket.send(JSON.stringify(this.message));
    this.message.content = '';
  }

  goBack(): void{
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
      console.log("WebSocket Connection Closed.");
    }
  }

}

