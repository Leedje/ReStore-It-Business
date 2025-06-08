import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../../../../services/chatService/chat.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat-list',
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit{

  // Create a ChatRoomDTO
  chats: any[] = []
  constructor(private router: Router, private chatService: ChatService){}

  ngOnInit(): void {
    this.chatService.GetUserChats().subscribe((response: HttpResponse<any>) => {
      this.chats = response.body
    })
  }

  navigateToChatRoom(chatRoomId: string): void{
    this.router.navigate(['/business/chats', chatRoomId]);
  }
}
