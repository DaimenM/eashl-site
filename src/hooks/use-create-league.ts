import { useState } from "react";
import { CreateLeagueFormData } from "@/lib/validations/createLeague";

interface UseCreateLeague {
    isLoading: boolean
    createLeague: (data: CreateLeagueFormData) => Promise<void>
}
export function UseCreateLeague(){
    const [isLoading, setIsLoading] = useState(false);
    async function createLeague(data: CreateLeagueFormData) {

        try {
            setIsLoading(true);
            const response = await fetch("/api/create-league", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const { data: responseData } = await response.json();
            
            

        } catch (error) {
            console.error(error instanceof Error ? error.message : "Failed to create league");
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, createLeague };

}