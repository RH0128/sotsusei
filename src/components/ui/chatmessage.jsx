import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const ChatMessage = ({
  speaker,
  message,
  showSpeaker,
  showAvatar,
  isSameSpeaker,
  isLeftAligned,
}) => {
  return (
    <div
      className={`flex ${isLeftAligned ? "justify-start" : "justify-end"} gap-${
        isSameSpeaker ? "1" : "3"
      }`}
    >
      {showAvatar && isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <div className="h-full w-full rounded-full bg-gray-200" />
        </Avatar>
      )}
      <div
        className={`flex flex-col ${
          isLeftAligned ? "items-start" : "items-end"
        } ${!showAvatar ? (isLeftAligned ? "ml-13" : "mr-13") : ""}`}
      >
        {showSpeaker && (
          <span
            className={`text-xs font-semibold mb-1 ${
              isLeftAligned ? "text-left" : "text-right"
            }`}
          >
            {speaker}
          </span>
        )}
        <Card
          className={`p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%] ${
            isLeftAligned ? "text-left" : "text-right"
          }`}
        >
          <p className="text-sm">{message}</p>
        </Card>
      </div>
      {showAvatar && !isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <div className="h-full w-full rounded-full bg-gray-200" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
