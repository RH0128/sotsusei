import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const SearchForm = () => {
  const [speakerName, setSpeakerName] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearching(true);

    try {
      const fromDate = dateRange?.from?.toISOString().split("T")[0] || "";
      const toDate = dateRange?.to?.toISOString().split("T")[0] || "";

      const params = new URLSearchParams({
        speaker: speakerName,
        from: fromDate,
        until: toDate,
        maximumRecords: 10, // ここで最大10件の検索結果を取得するように設定
      });

      // APIリクエストを送信
      const response = await fetch(`/api/meeting?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsSearching(false);

      // 検索結果ページに遷移し、結果を渡す
      navigate("/search-result", { state: { results: data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsSearching(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>調べてみよう</CardTitle>
        <CardDescription className="pt-1">
          あの人は国会でどんなこと言ってる？
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="speakerName" className="block text-sm font-medium text-gray-700">
              発言者名
            </label>
            <input
              type="text"
              id="speakerName"
              value={speakerName}
              onChange={(e) => setSpeakerName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
              日付範囲
            </label>
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="default"
              type="submit"
              disabled={isSearching}
              className="w-full"
            >
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
  );
};

export default SearchForm;
