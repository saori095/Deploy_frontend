import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import Link from "next/link"; // aタグの代わりにLinkを使用推奨

async function fetchCustomer(id) {
  // APIエンドポイントが未設定の場合のガード
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!endpoint) {
    console.error("API endpoint is not defined");
    return [];
  }

  const res = await fetch(
    // process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
    `${endpoint}/customers?customer_id=${id}`,
    { cache: 'no-store' } // 常に最新を取得
  );

  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

// searchParams は Promise として受け取ります（Next.js 15の仕様）
export default async function ReadPage({ searchParams }) {
// export default async function ReadPage({ query }) {
  // 1. searchParams を await して id を取得
  const params = await searchParams;
  const id = params.customer_id || params.id; // URLが ?customer_id= か ?id= かに合わせて調整
  // const { id } = query;
  // const customerInfo = await fetchCustomer(id);

  // 2. データ取得
  const customerInfo = id ? await fetchCustomer(id) : [];
  const customer = customerInfo[0];

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {/* 3. データが存在する場合のみカードを表示するガードを入れる */}
        {customer ? (
          <OneCustomerInfoCard {...customer} />
        ) : (
          <div className="p-4">顧客データが見つかりませんでした</div>
        )}
      </div>
      
      {/* aタグではなくNext.jsのLinkを使うと高速に遷移できます */}
      <Link href="/customers" className="btn btn-outline btn-accent">
        一覧に戻る
      </Link>
    </>
  );
}


//  return (
//    <>
//      <div className="alert alert-success">更新しました</div>
//      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
//        <OneCustomerInfoCard {...customerInfo[0]} />
//      </div>
//      <button className="btn btn-outline btn-accent">
//        <a href="/customers">一覧に戻る</a>
//      </button>
//    </>
//  );
//}
