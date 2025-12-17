"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

// 1. 実際の表示とロジックを担当するコンポーネント
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // customer_id が取得できるまで何もしない
    if (!customer_id) return;

    const fetchAndSetCustomer = async () => {
      try {
        const customerData = await fetchCustomer(customer_id);
        setCustomer(customerData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchAndSetCustomer();
  }, [customer_id]); // 依存配列に customer_id を追加

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      
      {/* データの取得が終わってからカードを表示 */}
      {customer ? (
        <OneCustomerInfoCard {...customer} />
      ) : (
        <div className="p-4 text-center">読み込み中...</div>
      )}

      <button onClick={() => router.push("/customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

// 2. メインのページコンポーネント（Suspenseで囲む）
export default function ConfirmPage() {
  return (
    // useSearchParamsを使用するコンポーネントは必ずSuspenseで囲む必要があります
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
