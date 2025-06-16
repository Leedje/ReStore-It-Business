import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  GetUserChats(): Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`/chat/user-chats`, {observe: 'response'})
  }

  GetChatHistory(chatRoomId: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`/chat/history/${chatRoomId}`, { observe: 'response' })
  }

}
