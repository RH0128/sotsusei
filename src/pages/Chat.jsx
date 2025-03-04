import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const Chat = () => {
  const [speakerName, setSpeakerName] = useState("");
  const [meetingName, setMeetingName] = useState("all");
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e, page) => {
    e.preventDefault();
    setIsSearching(true);
    // 検索処理の追加
    console.log(speakerName, meetingName, dateRange);
    setIsSearching(false);
  };

  const goToHome = () => {
    navigate("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={goToHome}>
                    ホーム
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    検索結果
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    チャット
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Date Header */}
          <div className="text-center py-4">
            <h2 className="text-lg font-medium">2025年12月25日</h2>
          </div>

          {/* Chat Messages */}
          <div className="space-y-6 pb-10">
            {/* Message 1 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">政策活動費についてはわかりました。</p>
              </Card>
            </div>

            {/* Message 2 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">
                  それでは、残りの時間については、政治改革全般についてお伺いをさせていただきながら、今後の議論に資する材料を提供させていただきたいなと思っております。
                </p>
              </Card>
            </div>

            {/* Message 3 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">
                  さて、現在、参議院においても政治倫理審査会等が行われている最中でございますが、その中の単語では、いわゆる裏金という表現もあれば、いや、不記載なんだと、こういうような表現もあるわけでございます。
                </p>
              </Card>
            </div>

            {/* Message 4 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">
                  総務省に今日は来ていただいておりますので確認をいたしますが、政治資金規正法における不記載の位置付けはどのようなものであるか、または解説をしてください。
                </p>
              </Card>
            </div>

            {/* Message 5 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">お答えいたします。</p>
              </Card>
            </div>

            {/* Message 6 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">
                  今、小泉議員からもお話のありました前国会での法改正、そして今回議席票で可決した法改正によって一定の前進はあったとは思います。
                </p>
              </Card>
            </div>

            {/* Message 7 */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">
                  それから、私とも提出した十党の案、政治活動費については完全に廃止というもので、ここは大きな前進だったと思います。
                </p>
              </Card>
            </div>

            {/* Message 8 - Partial */}
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-gray-200 flex-shrink-0">
                <div className="h-full w-full rounded-full bg-gray-200" />
              </Avatar>
              <Card className="p-4 rounded-2xl bg-gray-100 text-gray-800 max-w-[85%]">
                <p className="text-sm">ただ一方で、やっぱり倫理観の今の様々な皆さんのお話を伺っていると、秘書に任せ</p>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;