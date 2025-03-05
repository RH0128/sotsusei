import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ChatMessage from "@/components/ui/chatmessage";
import Breadcrumbs from "@/components/ui/breadcrumbs";

const Chat = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const breadcrumbItems = [
    { href: "#", label: "検索結果" },
    { href: "#", label: "チャット" },
  ];

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
            <h2 className="text-lg font-medium">2025年12月25日</h2>
          </div>

          {/* Chat Messages */}
          <div className="space-y-6 pb-10">
            <ChatMessage message="政策活動費についてはわかりました。" />
            <ChatMessage message="それでは、残りの時間については、政治改革全般についてお伺いをさせていただきながら、今後の議論に資する材料を提供させていただきたいなと思っております。" />
            <ChatMessage message="さて、現在、参議院においても政治倫理審査会等が行われている最中でございますが、その中の単語では、いわゆる裏金という表現もあれば、いや、不記載なんだと、こういうような表現もあるわけでございます。" />
            <ChatMessage message="総務省に今日は来ていただいておりますので確認をいたしますが、政治資金規正法における不記載の位置付けはどのようなものであるか、または解説をしてください。" />
            <ChatMessage message="お答えいたします。" />
            <ChatMessage message="今、小泉議員からもお話のありました前国会での法改正、そして今回議席票で可決した法改正によって一定の前進はあったとは思います。" />
            <ChatMessage message="それから、私とも提出した十党の案、政治活動費については完全に廃止というもので、ここは大きな前進だったと思います。" />
            <ChatMessage message="ただ一方で、やっぱり倫理観の今の様々な皆さんのお話を伺っていると、秘書に任せ" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;