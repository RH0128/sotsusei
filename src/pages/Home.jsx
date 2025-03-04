import React, { useState } from 'react';
import '../App.css';
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        

          {/* 検索条件 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>調べてみよう</CardTitle>
              <CardDescription className="pt-1">あの人は国会でどんなこと言ってる？</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSearch(e, 1)} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1  text-left">
                    <label htmlFor="speaker-name" className="block text-sm font-medium mb-2">
                      政治家のお名前
                    </label>
                   <div className="relative">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="speaker-name"
                        placeholder="例: 岸田 文雄"
                        className="pl-8"  // パディングを増やしてアイコンとテキストの重なりを防止
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/3  text-left">
                    <label htmlFor="meeting-name" className="block text-sm font-medium mb-2">
                      会議
                    </label>
                    <Select value={meetingName} onValueChange={setMeetingName} >
                      <SelectTrigger id="meeting-name" className="h-12">
                        <SelectValue placeholder="すべての会議" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべての会議</SelectItem>
                        <SelectItem value="予算委員会">予算委員会</SelectItem>
                        <SelectItem value="財政金融委員会">財政金融委員会</SelectItem>
                        <SelectItem value="厚生労働委員会">厚生労働委員会</SelectItem>
                        <SelectItem value="文部科学委員会">文部科学委員会</SelectItem>
                        <SelectItem value="外交防衛委員会">外交防衛委員会</SelectItem>
                        <SelectItem value="本会議">本会議</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-left">期間</label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" type="submit" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        検索中...
                      </>
                    ) : (
                      "検索する"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

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