import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  executeRequest: (
    endpoint: string,
    method: "POST" | "GET",
    data?: any
  ) => Promise<AxiosResponse<T> | undefined>;
}

export function useApi<T>(): ApiResponse<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const executeRequest = async (
    endpoint: string,
    method: "POST" | "GET" = "GET",
    requestData?: any
  ): Promise<AxiosResponse<T> | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios<T>({
        method,
        url: `/api/${endpoint}`,
        data: requestData,
      });

      setData(response.data);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Something went wrong";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, executeRequest };
}
