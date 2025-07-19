import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Separator } from "@/components/ui/separator";
import SearchForm from "@/components/ui/searchform";
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

  const breadcrumbItems = []; // パンクズを空にする

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex items-center gap-2 px-4">
          {/* サイドバー関連の要素は削除 */}
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
      </div>
    </div>
  );
}

export default App;
