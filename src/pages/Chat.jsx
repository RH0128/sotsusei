import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ChatMessage from "@/components/ui/chatmessage";
import Breadcrumbs from "@/components/ui/breadcrumbs";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meeting, date } = location.state || { meeting: '', date: '' };

  const goToHome = () => {
    navigate("/");
  };

  const breadcrumbItems = [
    { href: "#", label: "検索結果" },
    { href: "#", label: "チャット" },
  ];

  // ダミーデータ
  const [messages, setMessages] = useState([
    { id: 1, speaker: "議員A", message: "発言内容1" },
    { id: 2, speaker: "議員B", message: "発言内容2" },
    { id: 3, speaker: "議員C", message: "テストです。句点があったらチャットを分割したい。" },
  ]);

  // 実際のデータを取得する場合は、useEffectを使用してAPIリクエストを行う
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://kokkai.ndl.go.jp/api/meeting?record_id=${meeting}&date=${date}`);
        const data = await response.json();
        const formattedMessages = data.records.flatMap(record => {
          const sentences = record.speech.split('。').filter(sentence => sentence.trim() !== '');
          return sentences.map((sentence, index) => ({
            id: `${record.id}-${index}`,
            speaker: record.speaker,
            message: sentence + '。'
          }));
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (meeting && date) {
      fetchMessages();
    }
  }, [meeting, date]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
            <h3 className="text-md font-medium">{meeting}</h3>
          </div>

          {/* Chat Messages */}
          <div className="space-y-6 pb-10">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={`${msg.speaker}: ${msg.message}`} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;