import React, { useState } from 'react';
import '../App.css';
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SearchForm from "@/components/ui/searchform";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";

function App() {
  const [speakerName, setSpeakerName] = useState("");
  const [meetingName, setMeetingName] = useState("all");
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      history.push('/search-result'); // 検索結果ページへの遷移
    }, 1000); // ダミーの非同期処理
  };

  const goToHome = () => {
    navigate("/");
  };

  const breadcrumbItems = [
    { href: "#", label: "ホーム" },
  ];
gir
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
          <SearchForm
            speakerName={speakerName}
            setSpeakerName={setSpeakerName}
            meetingName={meetingName}
            setMeetingName={setMeetingName}
            dateRange={dateRange}
            setDateRange={setDateRange}
            isSearching={isSearching}
            handleSearch={handleSearch}
          />

          {/* テーマ別検索 */}
          <div>
            <h2 className="font-medium mb-4">テーマ別で検索してみよう</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 px-4 font-normal">
                憲法改正
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                年金制度
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                社会保障
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                外交・安全保障
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                子ども・子育て政策
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                夫婦別性
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                経済政策
              </Button>
              <Button variant="outline" className="h-12 px-4 font-normal">
                パーティー券
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;