import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// サイドバー関連のimportは削除
import { Calendar } from "lucide-react";
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
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { setSpeechData, setSelectedIndex } = useContext(SpeechContext);

  const goToHome = () => {
    navigate("/");
  };

  const handleRowClick = (index) => {
    setSpeechData(results);
    setSelectedIndex(index);
    navigate("/chat");
  };

  const handleBreadcrumbClick = (href) => {
    navigate(href);
  };

  const breadcrumbItems = [{ href: "/search-result", label: "検索結果" }];

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex items-center gap-2 px-4">
          {/* SidebarTriggerは不要なので削除 */}
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs
            items={breadcrumbItems}
            onHomeClick={handleBreadcrumbClick}
          />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <h1 className="text-2xl font-bold text-left">検索結果</h1>
        </div>

        <div className="border rounded-lg overflow-hidden mb-6">
          {results.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              該当する検索結果がありませんでした
            </div>
          ) : (
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
                        {format(new Date(result.date), "yyyy年M月d日", {
                          locale: ja,
                        })}
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
          )}
        </div>
      </div>
    </div>
  );
}
