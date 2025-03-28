const handler = async (req, res) => {
  try {
    const { speaker, from, until, maximumRecords } = req.query;

    // バリデーション: speaker が指定されていない場合はエラーを返す
    if (!speaker) {
      return res.status(400).json({ error: "Speakerは必須です" });
    }

    const response = await fetch(
      `https://kokkai.ndl.go.jp/api/meeting?${new URLSearchParams({
        speaker,
        from,
        until,
        maximumRecords,
        recordPacking: "json",
      })}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("API Response Data:", data); // 取得したデータをコンソールに出力
    res.json(data.meetingRecord || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
