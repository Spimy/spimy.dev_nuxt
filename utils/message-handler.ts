import { MessageConfig, MessageType } from '@/utils/types/message-config';

export class MessageHandler {
  private _messageConfig: MessageConfig;

  constructor() {
    this._messageConfig = reactive({
      show: false,
      message: '',
      type: 'inprogress'
    });
  }

  /**
   * Description
   * @param {string} message
   * @param {number} timeout - in seconds
   * @returns {void}
   */
  showMessage = (message: string, type: MessageType, timeout?: number) => {
    this._messageConfig.message = message;
    this._messageConfig.show = true;
    this._messageConfig.type = type;

    if (timeout) {
      setTimeout(() => {
        this._messageConfig.show = false;
      }, timeout * 1000);
    }
  };

  get messageConfig(): MessageConfig {
    return this._messageConfig;
  }
}
