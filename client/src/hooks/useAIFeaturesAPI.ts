import { API_URL } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import type { ChangeToneInputDTO, ChangeToneOutputDTO, SummarizeInputDTO, SummarizeOutputDTO, TranslateInputDTO, TranslateOutputDTO } from "@/types";

function useAIFeaturesAPI() {
  const { getToken } = useAuth();

  const translate = async (note: TranslateInputDTO) => {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(`${API_URL}/ai/translate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data: TranslateOutputDTO = await response.json();
    return data.result;
  };

  const summarize = async (note: SummarizeInputDTO) => {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(`${API_URL}/ai/summarize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data: SummarizeOutputDTO = await response.json();
    return data.result;
  };

  const rewrite = async (note: ChangeToneInputDTO) => {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(`${API_URL}/ai/rewrite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data: ChangeToneOutputDTO = await response.json();
    return data.result;
  };

  return { translate, summarize, rewrite };
}

export default useAIFeaturesAPI;
