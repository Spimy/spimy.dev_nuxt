export type MessageType = 'success' | 'error' | 'inprogress';

export interface MessageConfig {
  show: boolean;
  message: string;
  type: MessageType;
}
