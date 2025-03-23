import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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

  const breadcrumbItems = [
    { href: "#", label: "検索結果" },
    { href: "#", label: "チャット" },
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

    const formattedMessages = record.speechRecord.flatMap((speech, idx) => {
     //前発言者を常に保存しておいて、次の発言者と比較。ただし1人目は前発言者がいないので、その場合は前発言者を保存しない


      return speech.speech
        .split("。")
        .filter((sentence) => sentence.trim() !== "")
        .map((sentence, sentenceIdx) => ({
          id: `${speech.id}-${sentenceIdx}`,
          speaker: speech.speaker,
          message: sentence + "。",
          speechOrder: speech.speechOrder,
        }));
    });
    setMessages(formattedMessages);
  }, [speechData, selectedIndex]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs items={breadcrumbItems} onHomeClick={goToHome} />
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
          <div className="space-y-6 pb-10">
            {messages.map((msg, index) => (
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
                isLeftAligned={msg.speechOrder % 2 !== 0} // speechOrder が奇数の場合は左揃え、偶数の場合は右揃え
                speechOrder={msg.speechOrder} // speechOrder を渡す
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;
