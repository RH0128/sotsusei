import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SearchForm from "@/components/ui/searchform";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";

function App() {
  const [speakerName, setSpeakerName] = useState("");
  const [meetingName, setMeetingName] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // 今日の一年前
    to: new Date(), // 今日
  });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const handleThemeSearch = async (theme) => {
    setIsSearching(true);

    try {
      const fromDate = dateRange.from.toISOString().split("T")[0];
      const toDate = dateRange.to.toISOString().split("T")[0];

      const params = new URLSearchParams({
        any: theme,
        from: fromDate,
        until: toDate,
        maximumRecords: 10,
      });

      console.log("API Request URL:", `/api/speech?${params}`);

      const response = await fetch(`/api/speech?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      setIsSearching(false);

      navigate("/search-result", { state: { results: data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsSearching(false);
    }
  };

  const breadcrumbItems = []; // パンクズを空にする

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
            setIsSearching={setIsSearching}
          />

          {/* テーマ別検索 */}
          <div>
            <h2 className="font-medium mb-4">テーマ別で検索してみよう</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "憲法改正",
                "年金制度",
                "社会保障",
                "外交・安全保障",
                "子ども・子育て政策",
                "夫婦別性",
                "経済政策",
                "パーティー券",
              ].map((theme) => (
                <Button
                  key={theme}
                  variant="outline"
                  className="h-12 px-4 font-normal"
                  onClick={() => handleThemeSearch(theme)}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
