import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ChatMessage from "@/components/ui/chatmessage";
import Breadcrumbs from "@/components/ui/breadcrumbs";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { speaker, date } = location.state || { speaker: "", date: "" };

  const goToHome = () => {
    navigate("/");
  };

  const breadcrumbItems = [
    { href: "#", label: "検索結果" },
    { href: "#", label: "チャット" },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const formattedDate = new Date(date).toISOString();
        const response = await fetch(
          `/api/meeting?speaker=${encodeURIComponent(
            speaker
          )}&from=${formattedDate}&until=${formattedDate}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedMessages = data.flatMap((record) => {
          const sentences = record.speech
            .split("。")
            .filter((sentence) => sentence.trim() !== "");
          return sentences.map((sentence, index) => ({
            id: `${record.id}-${index}`,
            speaker: record.speaker,
            message: sentence + "。",
          }));
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (speaker && date) {
      fetchMessages();
    }
  }, [speaker, date]);

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
            <h2 className="text-lg font-medium">{date}</h2>
            <h3 className="text-md font-medium">{speaker}</h3>
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
