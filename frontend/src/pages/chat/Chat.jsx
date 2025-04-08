import { useState, useRef } from "react";
import { ChatInput } from "../../components/custom/chatinput";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from '../../components/custom/use-scroll-to-bottom';
import { Overview } from "../../components/custom/overview";
import { Header } from "../../components/custom/header";
import { v4 as uuidv4 } from 'uuid';
import { useSendMessageMutation } from '../../redux/features/dish/salusApi'

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messageHandlerRef = useRef(null);

  const [sendMessage] = useSendMessageMutation(); 

  const cleanupMessageHandler = () => {
    if (messageHandlerRef.current && socket) {
      socket.removeEventListener("message", messageHandlerRef.current);
      messageHandlerRef.current = null;
    }
  };
async function handleSubmit(text) {
  if (!text) return;

  const traceId = uuidv4();
  setMessages(prev => [...prev, { content: text, role: "user", id: traceId }]);
  setIsLoading(true);
  setQuestion("");

  try {
    const res = await sendMessage(text).unwrap();

    const content = res?.response || "Không có phản hồi.";

    setMessages(prev => [
      ...prev,
      {
        content,
        role: "assistant",
        id: uuidv4()
      }
    ]);
  } catch (err) {
    console.error("API error:", err);
    setMessages(prev => [
      ...prev,
      { content: "🚫 Đã xảy ra lỗi khi xử lý câu hỏi", role: "assistant", id: uuidv4() }
    ]);
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header />
      <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4" ref={messagesContainerRef}>
        {messages.length === 0 && <Overview />}
        {messages.map((message, index) => (
          <PreviewMessage key={index} message={message} />
        ))}
        {isLoading && <ThinkingMessage />}
        <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
      </div>
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Chat;
