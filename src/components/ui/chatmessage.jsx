import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

// アイコン画像をインポート
import Icon0 from "/img/Icon/Icon1.png";
import Icon1 from "/img/Icon/Icon2.png";
import Icon2 from "/img/Icon/Icon3.png";
import Icon3 from "/img/Icon/Icon4.png";
import Icon4 from "/img/Icon/Icon5.png";
import Icon5 from "/img/Icon/Icon6.png";
import Icon6 from "/img/Icon/Icon7.png";

// スピーカーに対応するアイコンをマッピング
const orderIcons = {
  0: Icon0,
  1: Icon1,
  2: Icon2,
  3: Icon3,
  4: Icon4,
  5: Icon5,
  6: Icon6,
};

const ChatMessage = ({
  speaker,
  message,
  showSpeaker,
  showAvatar,
  isSameSpeaker,
  isLeftAligned,
  speechOrder,
}) => {
  // メッセージの内容に「拍手」が含まれるときに絵文字の👏に差し替え、文頭のスペースを削除
  const processedMessage = message
    .replace(/拍手/g, "👏👏👏👏👏👏")
    .replace(/。」/g, "」")
    .replace(/。/g, "‼️")
    .trimStart(); // 文頭のスペースを削除

  // スピーチオーダーに対応するアイコンを取得
  const orderIcon = orderIcons[speechOrder] || Icon0; // デフォルトアイコンを設定

  // speechOrder をコンソールに出力して確認
  console.log("speechOrder:", speechOrder);

  return (
    <div
      className={`flex ${isLeftAligned ? "justify-start" : "justify-end"} gap-${
        isSameSpeaker ? "1" : "3"
      }`}
    >
      {showAvatar && isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <img
            src={orderIcon}
            alt={`Order ${speechOrder} icon`}
            className="h-full w-full rounded-full"
          />
        </Avatar>
      )}
      <div
        className={`flex flex-col flex-auto ${
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
          className={cn(
            "p-4 rounded-2xl max-w-[75%] text-left",
            isLeftAligned
              ? "bg-[hsl(262,100%,50%)] text-[hsl(262,5%,90%)]" // 左揃え時のスタイル
              : "bg-gray-100 text-gray-800" // 右揃え時のスタイル
          )}
        >
          <p className="text-sm">{processedMessage}</p>
        </Card>
      </div>
      {showAvatar && !isLeftAligned && (
        <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
          <img
            src={orderIcon}
            alt={`Order ${speechOrder} icon`}
            className="h-full w-full rounded-full"
          />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
