import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const ChatMessage = ({ speaker, message }) => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
        <div className="h-full w-full rounded-full bg-gray-200" />
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs font-semibold mb-1">{speaker}</span>{" "}
        {/* テキストサイズを12pxに変更 */}
        <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%] text-left">
          <p className="text-sm">{message}</p>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
