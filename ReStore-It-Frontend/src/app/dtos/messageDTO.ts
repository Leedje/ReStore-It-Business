export class MessageDTO {
  id: string = '';
  chatRoomId: string = '';
  sender: string = 'User Placeholder';
  receiver: string = '';
  content: string = '';
  timeSent: string = ''; //change it to date if it start glitching
}
