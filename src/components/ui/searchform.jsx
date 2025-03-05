import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

const SearchForm = ({ speakerName, setSpeakerName, meetingName, setMeetingName, dateRange, setDateRange, isSearching, handleSearch }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>調べてみよう</CardTitle>
        <CardDescription className="pt-1">あの人は国会でどんなこと言ってる？</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSearch(e, 1)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 text-left">
              <label htmlFor="speaker-name" className="block text-sm font-medium mb-2">
                政治家のお名前
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="speaker-name"
                  placeholder="例: 岸田 文雄"
                  className="pl-8"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 text-left">
              <label htmlFor="meeting-name" className="block text-sm font-medium mb-2">
                会議
              </label>
              <Select value={meetingName} onValueChange={setMeetingName}>
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
  );
};

export default SearchForm;