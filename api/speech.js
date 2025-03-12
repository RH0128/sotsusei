const handler = async (req, res) => {
  try {
    const { speaker, from, until } = req.query;

    const response = await fetch(
      `https://kokkai.ndl.go.jp/api/speech?${new URLSearchParams({
        speaker,
        from,
        until,
        recordPacking: "json",
      })}`
    );

    const data = await response.json();
    res.json(data.speechRecord || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
