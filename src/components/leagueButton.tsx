import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { MoreVertical } from "lucide-react"
import {useRouter} from "next/navigation"
import { useLeagueStore } from "@/lib/stores/use-league-store"
import {League} from "@/types/league"
import { set } from "zod"

interface LeagueButtonProps {
    name: string;
    description: string;
    logoUrl: string;
}

export function LeagueButton({ name, description, logoUrl }: LeagueButtonProps) {
    const league = {
        league_name: name,
        description: description,
        logo_url: logoUrl,
    } as League
    const router = useRouter();
    const {setLeague} = useLeagueStore();
    return (
        <Card className="w-[300px] hover:bg-slate-100 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Manage League" onClick={() => {
                    router.push(`dashboard/manage-league/${name}`)
                    setLeague(league)
                    }} >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img src={logoUrl} alt={`${name} logo`} className="h-24 w-24 object-contain" />
            </CardContent>
        </Card>
    );
}