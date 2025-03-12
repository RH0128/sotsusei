//1つ目の引数がフロントからデータを受け取る固有の場所になっている
export default async function GET(request) {
  //バックエンドのルート定義
  console.log(request);

  try {
    // URLSearchParamsを使って、検索用のクエリパラメータ（speaker、from、until）を設定

    const params = new URLSearchParams({
      speaker: request.query.speaker,
      from: request.query.from,
      until: request.query.until,
    });

    // console.log(3,params); もし上の処理が正しく行われているか確認したいなら、console.logを使って確認することができる

    //APIにリクエストを送信
    const response = await fetch(
      `https://kokkai.ndl.go.jp/api/speech?${params}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //APIから返ってきたデータを取得
    const data = await response.json();
    //フロントにデータを返す
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
