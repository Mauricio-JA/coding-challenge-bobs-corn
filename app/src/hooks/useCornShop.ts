import {
  buyCornApi,
  CornPurchase,
  getPurchasesApi,
} from "@/services/bobsCornApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  clientId: string | null;
};

const useCornShop = ({ clientId }: Props) => {
  const [purchases, setPurchases] = useState<CornPurchase[]>([]);

  const buyCorn = async () => {
    if (clientId) {
      const res = await buyCornApi(clientId);
      if (res?.success && res?.data) {
        setPurchases((prev) => [res?.data as CornPurchase, ...prev]);
        toast.success(res.message);
      } else {
        toast.error(res?.error, {
          description: res?.message,
        });
      }
    }
  };

  const fetchPurchases = async () => {
    const res = await getPurchasesApi(clientId as string);
    if (res?.success && res.data) {
      setPurchases(res.data);
    } else {
      setPurchases([]);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchPurchases();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return {
    buyCorn,
    purchases,
  };
};

export default useCornShop;
