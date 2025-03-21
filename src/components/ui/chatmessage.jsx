import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const ChatMessage = ({
  speaker,
  message,
  showSpeaker,
  showAvatar,
  isSameSpeaker,
}) => {
  return (
    <div className={`flex gap-${isSameSpeaker ? "1" : "3"}`}>
      {showAvatar && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <div className="h-full w-full rounded-full bg-gray-200" />
        </Avatar>
      )}
      <div
        className={`flex flex-col items-start ${!showAvatar ? "ml-13" : ""}`}
      >
        {showSpeaker && (
          <span className="text-xs font-semibold mb-1">{speaker}</span>
        )}
        <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%] text-left">
          <p className="text-sm">{message}</p>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
