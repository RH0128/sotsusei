import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

// アイコン画像をインポート
import Icon1 from "/img/Icon/Icon1.png";
import Icon2 from "/img/Icon/Icon2.png";
import Icon3 from "/img/Icon/Icon3.png";
import Icon4 from "/img/Icon/Icon4.png";
import Icon5 from "/img/Icon/Icon5.png";
import Icon6 from "/img/Icon/Icon6.png";
import Icon7 from "/img/Icon/Icon7.png";

// スピーカーに対応するアイコンをマッピング
const speakerIcons = {
  "Speaker 1": Icon1,
  "Speaker 2": Icon2,
  "Speaker 3": Icon3,
  "Speaker 4": Icon4,
  "Speaker 5": Icon5,
  "Speaker 6": Icon6,
  "Speaker 7": Icon7,
};

const ChatMessage = ({
  speaker,
  message,
  showSpeaker,
  showAvatar,
  isSameSpeaker,
  isLeftAligned,
}) => {
  // メッセージの内容に「拍手」が含まれるときに絵文字の👏に差し替え、文頭のスペースを削除
  const processedMessage = message
    .replace(/拍手/g, "👏👏👏👏👏👏")
    .replace(/。/g, "‼️")
    .trimStart(); // 文頭のスペースを削除

  // スピーカーに対応するアイコンを取得
  const speakerIcon = speakerIcons[speaker] || Icon1; // デフォルトアイコンを設定

  return (
    <div
      className={`flex ${isLeftAligned ? "justify-start" : "justify-end"} gap-${
        isSameSpeaker ? "1" : "3"
      }`}
    >
      {showAvatar && isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <img
            src={speakerIcon}
            alt={`${speaker} icon`}
            className="h-full w-full rounded-full"
          />
        </Avatar>
      )}
      <div
        className={`flex flex-col ${
          isLeftAligned ? "items-start" : "items-end"
        } ${!showAvatar ? (isLeftAligned ? "ml-13" : "mr-13") : ""}`}
      >
        {showSpeaker && (
          <span
            className={`text-xs font-semibold mb-1 text-slate-800 ${
              isLeftAligned ? "text-left" : "text-right"
            }`}
          >
            {speaker}
          </span>
        )}
        <Card
          className={`p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%] text-left`}
        >
          <p className="text-sm">{processedMessage}</p>
        </Card>
      </div>
      {showAvatar && !isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <img
            src={speakerIcon}
            alt={`${speaker} icon`}
            className="h-full w-full rounded-full"
          />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
