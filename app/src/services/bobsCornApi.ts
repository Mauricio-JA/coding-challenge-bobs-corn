import axios from "axios";

export interface CornPurchase {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
}
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  message?: string;
}

type CornPurchaseResponse = ApiResponse<CornPurchase[]>;
type BuyCornResponse = ApiResponse<CornPurchase>;

export const getPurchasesApi = async (clientId: string) => {
  const response = await axios.get<CornPurchaseResponse>(
    import.meta.env.VITE_API_URL + "/corn-purchases",
    {
      params: {
        clientId: clientId,
      },
    }
  );

  return response.data;
};

export const buyCornApi = async (clientId: string) => {
  try {
    const response = await axios.post<BuyCornResponse>(
      `${import.meta.env.VITE_API_URL}/buy-corn`,
      { clientId }
    );

    return response.data;
  } catch (error) {
    console.error("Error buying corn:", error);

    if (axios.isAxiosError<BuyCornResponse>(error)) {
      if (error.response && error.response.status === 429) {
        // Respuesta por demasiadas peticiones, armado desde la api
        return error.response.data;
      }
      return {
        success: false,
        data: null,
        error: error.response?.data?.error ?? "Unknown error",
        message: error.response?.data?.message ?? "Failed to buy corn",
      };
    }
  }
};
