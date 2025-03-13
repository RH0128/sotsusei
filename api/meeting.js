const handler = async (req, res) => {
  try {
    const { speaker, from, until } = req.query;

    const response = await fetch(
      `https://kokkai.ndl.go.jp/api/meeting?${new URLSearchParams({
        speaker,
        from,
        until,
        recordPacking: "json",
      })}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    res.json(data.meetingRecord || []); // 修正: data.speechRecord から data.records に変更
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
