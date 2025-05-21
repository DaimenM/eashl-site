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
         <Card className="w-full max-w-2xl hover:bg-accent/5 transition-colors duration-200">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 relative rounded-lg overflow-hidden border bg-background">
                        <img 
                            src={logoUrl} 
                            alt={`${name} logo`} 
                            className="h-full w-full object-contain" 
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg leading-none mb-2">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Manage League" onClick={() => {
                    router.push(`dashboard/manage-league/${name}`)
                    setLeague(league)
                    }} >
                    <MoreVertical className="h-4 w-4" />
                </Button>
           </div>
        </Card>
    );
}