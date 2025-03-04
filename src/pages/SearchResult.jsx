import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";  // 追加
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, Search } from "lucide-react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";  // 追加
import { Separator } from "@/components/ui/separator";  // 追加
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// 検索結果のモックデータ
const mockResults = [
{
id: 1,
politician: "岸田 文雄",
date: "2025年02月15日",
meeting: "本会議",
content: "我が国の経済成長を促進するために、デジタル化の推進と規制改革を進めてまいります。",
keywords: ["経済成長", "デジタル化", "規制改革"],
},
{
id: 2,
politician: "岸田 文雄",
date: "2025年02月10日",
meeting: "予算委員会",
content: "物価高騰対策として、エネルギー価格の抑制と生活支援策を講じていきます。",
keywords: ["物価高騰", "エネルギー", "生活支援"],
},
{
id: 3,
politician: "岸田 文雄",
date: "2025年01月25日",
meeting: "外交防衛委員会",
content: "国際社会と連携しながら、地域の平和と安定に貢献していく方針です。",
keywords: ["国際連携", "平和", "安定"],
},
{
id: 4,
politician: "岸田 文雄",
date: "2025年01月18日",
meeting: "本会議",
content: "少子化対策として、子育て支援の拡充と教育費負担の軽減を図ります。",
keywords: ["少子化", "子育て支援", "教育費"],
},
{
id: 5,
politician: "岸田 文雄",
date: "2025年01月12日",
meeting: "厚生労働委員会",
content: "医療体制の強化と社会保障制度の持続可能性を両立させる改革を進めます。",
keywords: ["医療体制", "社会保障", "改革"],
},
]


export default function SearchResults() {
const navigate = useNavigate();
const location = useLocation();
const [results, setResults] = useState(mockResults);
const [searchTerm, setSearchTerm] = useState("");


// URLからクエリパラメータを取得
const searchParams = new URLSearchParams(location.search);
const name = searchParams.get("name");
const meeting = searchParams.get("meeting");
const theme = searchParams.get("theme");


// 検索条件の表示用テキスト
const searchCondition = theme
  ? `テーマ: ${theme}`
  : name
  ? `政治家: ${name}${meeting && meeting !== "すべての会議" ? `, 会議: ${meeting}` : ""}`
  : "";


// 検索ボックスでのフィルタリング
const handleSearch = () => {
if (searchTerm.trim() === "") {
setResults(mockResults);
} else {
const filtered = mockResults.filter(
(item) => item.content.includes(searchTerm) || item.keywords.some((keyword) => keyword.includes(searchTerm)),
);
setResults(filtered);
}
};


// ホームに戻る
const goToHome = () => {
navigate("/");
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
<BreadcrumbItem>
<BreadcrumbLink href="#" onClick={goToHome}>
ホーム
</BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
<BreadcrumbLink>検索結果</BreadcrumbLink>
</BreadcrumbItem>
</BreadcrumbList>
</Breadcrumb>
</div>
</header>
<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
<div>
<h1 className="text-2xl font-bold text-left">検索結果</h1>
</div>


      <div className="border rounded-lg overflow-hidden mb-6 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日付</TableHead>
              <TableHead className="w-[50%]">会議</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {result.date}
                  </div>
                </TableCell>
                <TableCell className="text-start">{result.meeting}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* ページネーション
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  </SidebarInset>
</SidebarProvider>

);
}