import {Button} from "./ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card"

interface LeagueButtonProps {
    name: string;
    logoUrl: string;
}

export function LeagueButton({ name, logoUrl }: LeagueButtonProps) {
    return (
        <Card className="w-[300px] hover:bg-slate-100 cursor-pointer ">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img src={logoUrl} alt={`${name} logo`} className="h-24 w-24 object-contain" />
            </CardContent>
        </Card>
    );
}