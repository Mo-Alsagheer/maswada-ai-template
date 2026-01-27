import type { CreateTranslateDTO, 
    CreateTranslateResponseDTO, 
    CreateSummarizeDTO, 
    CreateSummarizeResponseDTO,
    CreateRewriteDTO,
    CreateRewriteResponseDTO,
    RewriteMode
} from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { API_BASE_URL } from "@/lib/utils"

function useAIFeaturesAPI() {
    const { getToken } = useAuth()

    const translate = async (note: CreateTranslateDTO) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/ai/translate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        
        const data: CreateTranslateResponseDTO = await response.json()
        
        return data.result
    }

    const summarize = async (note: CreateSummarizeDTO) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/ai/summarize", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        
        const data: CreateSummarizeResponseDTO = await response.json()

        return data.result
        
    }

    const rewrite = async (note: CreateRewriteDTO) => {
        const token = await getToken()
        
        if (!token) {
            console.error("No token found")
            return null
        }

        const response = await fetch(API_BASE_URL + "/api/ai/rewrite", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        
        const data: CreateRewriteResponseDTO = await response.json()

        return data.result
    }

    return {
        translate,
        summarize,
        rewrite
    }
}

export default useAIFeaturesAPI;