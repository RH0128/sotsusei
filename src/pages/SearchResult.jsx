import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Calendar } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SpeechContext } from "@/context/speechContext";

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { setSpeechData, setSelectedIndex } = useContext(SpeechContext);

  const goToHome = () => {
    navigate("/");
  };

  const handleRowClick = (index) => {
    setSpeechData(results); // APIから取得したデータをコンテキストに保存
    setSelectedIndex(index); // 選択されたインデックスをコンテキストに保存
    navigate("/chat");
  };

  const breadcrumbItems = [{ href: "#", label: "検索結果" }];

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
          <div>
            <h1 className="text-2xl font-bold text-left">検索結果</h1>
          </div>

          <div className="border rounded-lg overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead className="w-[30%]">会議</TableHead>
                  <TableHead className="w-[20%]">議院</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow
                    key={result.id}
                    onClick={() => handleRowClick(index)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {result.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-start">
                      {result.nameOfMeeting}
                    </TableCell>
                    <TableCell className="text-start">
                      {result.nameOfHouse}
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
