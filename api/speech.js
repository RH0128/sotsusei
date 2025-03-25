import { fetch } from "node-fetch";

export default async function handler(req, res) {
  const { any, from, until, maximumRecords } = req.query;

  const apiUrl = `https://kokkai.ndl.go.jp/api/speech?any=${encodeURIComponent(
    any
  )}&from=${from}&until=${until}&maximumRecords=${maximumRecords}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
