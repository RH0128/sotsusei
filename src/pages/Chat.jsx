import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import ChatMessage from "@/components/ui/chatmessage";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SpeechContext } from "@/context/speechContext";

const Chat = () => {
  const navigate = useNavigate();
  const { speechData, selectedIndex } = useContext(SpeechContext);

  const goToHome = () => {
    navigate("/");
  };

  const handleBreadcrumbClick = (href) => {
    navigate(href);
  };

  const breadcrumbItems = [
    { href: "/search-result", label: "検索結果" },
    { href: "/chat", label: "チャット" },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Selected index:", selectedIndex); // デバッグ用ログ
    console.log("Speech data:", speechData); // デバッグ用ログ

    if (!speechData[selectedIndex]) {
      console.error("Invalid index or speechData is empty");
      return;
    }

    const record = speechData[selectedIndex];
    if (!record.speechRecord) {
      console.error("Speech record is empty");
      return;
    }

    let isLeftSide = false; // 初期状態（最初のスピーカーは右側）
    let currentSpeaker = null;

    const formattedMessages = record.speechRecord.flatMap((speech, idx) => {
      console.log(currentSpeaker, speech.speaker);
      if (currentSpeaker !== null && currentSpeaker !== speech.speaker) {
        isLeftSide = !isLeftSide;
      }
      console.log(isLeftSide);
      currentSpeaker = speech.speaker;

      return speech.speech
        .split("。")
        .filter((sentence) => sentence.trim() !== "")
        .map((sentence, sentenceIdx) => {
          return {
            id: `${speech.speechID}-${sentenceIdx}`,
            speaker: speech.speaker,
            message: sentence + "。",
            speechOrder: speech.speechOrder,
            isLeftAligned: isLeftSide, // 発言者が切り替わった場合に左右を切り替える
          };
        });
    });

    setMessages(formattedMessages);
  }, [speechData, selectedIndex]);

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumbs
            items={breadcrumbItems}
            onHomeClick={goToHome}
            onBreadcrumbClick={handleBreadcrumbClick}
          />
        </div>
      </header>
      
      <div className="flex flex-1 flex-col gap-4 pt-0">
        {/* Date Header */}
        <div className="text-center py-4">
          <h2 className="text-lg font-medium">
            {speechData[selectedIndex]?.date}
          </h2>
          <h3 className="text-md font-medium">
            {speechData[selectedIndex]?.nameOfHouse}
          </h3>
        </div>

        {/* Chat Messages */}
        <div className="space-y-6 pb-10 px-4">
          {messages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              該当するメッセージがありませんでした
            </div>
          ) : (
            messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                speaker={msg.speaker}
                message={msg.message}
                showSpeaker={
                  index === 0 || messages[index - 1].speaker !== msg.speaker
                }
                showAvatar={
                  index === 0 || messages[index - 1].speaker !== msg.speaker
                }
                isSameSpeaker={
                  index > 0 && messages[index - 1].speaker === msg.speaker
                }
                isLeftAligned={msg.isLeftAligned}
                speechOrder={msg.speechOrder} // speechOrder を渡す
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
