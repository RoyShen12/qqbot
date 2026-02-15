export interface MessageContext {
  senderId: string;
  senderName?: string;
  messageId: string;
  isGroupChat: boolean;
  groupOpenid?: string;
  referencedMessageId?: string;
}

export function generatePerMessagePrompt(ctx: MessageContext): string {
  const targetAddress = ctx.isGroupChat ? `group:${ctx.groupOpenid}` : ctx.senderId;
  const nowMs = Date.now();

  let prompt = `【当前消息上下文】
用户: ${ctx.senderName || "未知"} (${ctx.senderId}) | ${ctx.isGroupChat ? "群聊" : "私聊"}
消息ID: ${ctx.messageId}
提醒目标地址: ${targetAddress}
当前时间戳(ms): ${nowMs}`;

  if (ctx.isGroupChat && ctx.groupOpenid) {
    prompt += `\n群组ID: ${ctx.groupOpenid}`;
  }

  if (ctx.referencedMessageId) {
    prompt += `\n引用消息ID: ${ctx.referencedMessageId}`;
  }

  prompt += `\n你可以设置定时提醒(qqbot-cron)和发送图片(qqbot-media)，详见 available_skills。`;

  return prompt;
}
