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
    const formattedMessages = record.speech
      .split("。")
      .filter((sentence) => sentence.trim() !== "")
      .map((sentence, idx) => ({
        id: `${record.id}-${idx}`,
        speaker: record.speaker,
        message: sentence + "。",
      }));
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Date Header */}
          <div className="text-center py-4">
            <h2 className="text-lg font-medium">
              {speechData[selectedIndex]?.date}
            </h2>
            <h3 className="text-md font-medium">
              {speechData[selectedIndex]?.speaker}
            </h3>
          </div>

          {/* Chat Messages */}
          <div className="space-y-6 pb-10">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={`${msg.speaker}: ${msg.message}`}
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;
