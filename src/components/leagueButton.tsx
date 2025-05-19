import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { MoreVertical } from "lucide-react"
import {useRouter} from "next/navigation"

interface LeagueButtonProps {
    name: string;
    logoUrl: string;
}

export function LeagueButton({ name, logoUrl }: LeagueButtonProps) {
    const router = useRouter();
    return (
        <Card className="w-[300px] hover:bg-slate-100 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push('/')}>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img src={logoUrl} alt={`${name} logo`} className="h-24 w-24 object-contain" />
            </CardContent>
        </Card>
    );
}