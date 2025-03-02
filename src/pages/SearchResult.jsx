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
    // 実際の検索処理
    setTimeout(() => setIsSearching(false), 1000); // ダミーの非同期処理
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
        
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">検索結果</h1>
          <p className="text-muted-foreground">{searchCondition}</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Input
            placeholder="結果を絞り込む"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            検索
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-6">
        <Table>
          <TableCaption>検索結果: {results.length}件</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>政治家</TableHead>
              <TableHead>日付</TableHead>
              <TableHead>会議</TableHead>
              <TableHead className="w-[50%]">発言内容</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.politician}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {result.date}
                  </div>
                </TableCell>
                <TableCell>{result.meeting}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <p>{result.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {result.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
            

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;