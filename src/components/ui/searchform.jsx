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

const SearchForm = ({
  speakerName,
  setSpeakerName,
  dateRange,
  setDateRange,
  isSearching,
  setIsSearching,
}) => {
  const navigate = useNavigate();

  // 検索処理
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      // 日付文字列に変換し、クエリパラメータとして使用するためのフォーマットに整理整頓
      const fromDate = dateRange?.from?.toISOString().split("T")[0] || "";
      const toDate = dateRange?.to?.toISOString().split("T")[0] || "";

      const params = new URLSearchParams({
        speaker: speakerName,
        from: fromDate,
        until: toDate,
        maximumRecords: 10, // ここで最大10件の検索結果を取得するように設定
      });

      console.log("API Request URL:", `/api/meeting?${params}`);

      // APIリクエストを送信
      const response = await fetch(`/api/meeting?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response Data:", data); // 取得したデータをコンソールに出力
      setIsSearching(false);

      // 検索結果ページに遷移し、結果を渡す
      navigate("/search-result", { state: { results: data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsSearching(false);
    }
  };

  return (
    <Card className="mb-8 gap-3">
      <div className="flex justify-center items-center pt-6">
        <img
          src="/img/Logo.svg"
          alt="のぞこっかい"
          className="h-auto w-[320px] md:w-[280px]"
        />
      </div>
      <CardHeader>
        {/* <CardTitle>気になる国会、ちょっとのぞこっかい</CardTitle> */}
        <CardDescription className="font-semibold">
          気になる国会、ちょっとのぞこっかい
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 text-left">
              <label
                htmlFor="speaker-name"
                className="block text-sm font-medium mb-2"
              >
                政治家のお名前
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="speaker-name"
                  placeholder="例: 石破茂"
                  className="pl-8"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-left">
              期間
            </label>
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <img
              src="/img/Character.png"
              alt="キャラクター"
              className="w-[330px] h-auto"
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
