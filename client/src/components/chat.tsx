"use client";

import { useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CornerDownLeft } from "lucide-react";
import { Message, useAssistant } from "ai/react";

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, setMessages } = useAssistant({
    api: "/api/chat",
  });

  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ]);
  }, []);

  return (
    <div className="relative flex h-[calc(100vh-6rem)] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-3 justify-center">
      <div className="grow overflow-auto crollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50">
        {messages.map((m: Message) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <strong>{`${m.role.charAt(0).toUpperCase() + m.role.slice(1)}: `}</strong>
            {m.role !== "data" && m.content}
            <br />
            <br />
          </div>
        ))}
      </div>

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}
      <div className="w-full">
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          onSubmit={submitMessage}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            value={input}
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            onChange={handleInputChange}
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
