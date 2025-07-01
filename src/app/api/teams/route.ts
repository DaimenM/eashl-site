import {NextResponse, NextRequest} from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { withAuth } from '@/lib/api/with-auth';
import { Match } from '@/types/match';
import { Player } from '@/types/player';
import { PlayerStats } from '@/types/stats';
import { TeamMatchStats } from '@/types/match';
import { parse } from 'path';



export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const league_name = searchParams.get('league')
    const supabase = await createServerSupabaseClient();
    const {data, error} = await supabase
        .from('Teams')
        .select('*')
        .eq('league', league_name)
    if (error) console.error(error);
    return NextResponse.json({ data });
}
export async function POST(request: NextRequest){
    return withAuth(request, async (user) => {
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json();
        //console.log("body: ", body);
        const result = await addTeam(body);
        return NextResponse.json(result);
        
    })
}

export async function DELETE(request: NextRequest){
    const {searchParams} = new URL(request.url);
    const league_name = searchParams.get('league')
    return withAuth(request, async (user) => {
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const supabase = await createServerSupabaseClient();
        const body = await request.json();
        const {data: deleteMatches, error: matchesError} = await supabase
            .from('Matches')
            .delete()
            .eq('league', league_name)
            .eq('homeTeamId', body.clubId)
            .select('*')
        if (matchesError) console.error(matchesError);

        const {data: deletePlayers, error: playersError} = await supabase
            .from('Players')
            .delete()
            .eq('teamId', body.clubId)
            .select('*')
        if (playersError) console.error(playersError);
        if (deletePlayers && deletePlayers.length==0) return NextResponse.json({ error: "No players found" }, { status: 404 });

        const {data: deleteTeam, error: teamError} = await supabase
            .from('Teams')
            .delete()
            .eq('clubId', body.clubId)
            .eq('league', league_name)
            .select('*')
        if (teamError) console.error(teamError);
        
        if (deleteTeam && deleteTeam.length === 0) return NextResponse.json({ error: "No teams found" }, { status: 404 });
        return NextResponse.json({ deleteTeam, deleteMatches, deletePlayers  });
    })
}

async function addTeam(body: any) {
    const supabase = await createServerSupabaseClient()
    const {data: club, error} = await supabase
            .from('Teams')
            .insert({
                clubId: body.club.clubId,
                clubName: body.club.clubName,
                league: body.league,
                logo: body.logo,
                created_at: new Date(),
            })
            .select('*')
            .single()
        if (error) console.error(error);
    const {data: matches, error: matchesError} = await supabase
            .from('Matches')
            .insert(
                parseMatches(body)
            )
            .select('*')
    if (matchesError) console.error(matchesError);
    const {data: members, error: membersError} = await supabase
            .from('Players')
            .insert(
                parseMembers(body)
            ).select('*')
    if (membersError) console.error(membersError);
    return { matches, members, club }


}
function parseMembers(body: Record<string, any>) {
    const members = body.members as Record<string,any>
    const matches = body.matches as Record<string, any>;
    const result: Player[] = [];
    Object.entries(members).forEach(([key,value]) => {
        
        result.push({
            playerId: matches[Object.keys(matches)[0]].homeTeamPlayers[key].playerId,
            username: key,
            teamId: body.club.clubId,
            position: value.position,
        })
    })
    return result
}
function parseMatches(body: Record<string, any>){
    const matches = body.matches as Record<string, any>;
    //console.log("matches: ",body);
    const result: Match[] = [];
    let homeTeamId: string;
    let awayTeamId: string;
    let homeTeamStats: TeamMatchStats;
    let awayTeamStats: TeamMatchStats;
    Object.entries(matches).forEach(([key,value]) => {
        const parsedHomePlayers: PlayerStats[] = [];
        const parsedAwayPlayers: PlayerStats[] = [];
        const teams: Record <string,any> = value.teams
        const homePlayers: Record <string,any> = value.homeTeamPlayers
        const awayPlayers: Record <string,any> = value.awayTeamPlayers 
        Object.entries(homePlayers).forEach(([key,value]) => {
            parsedHomePlayers.push({
                playerId: key,
                goals: value.goals,
                assists: value.assists,
                points: value.goals + value.assists,
                shots: value.shots,
                saves: value.saves,
            })
        })
        Object.entries(awayPlayers).forEach(([key,value]) => {
            parsedAwayPlayers.push({
                playerId: key,
                goals: value.goals,
                assists: value.assists,
                points: value.goals + value.assists,
                shots: value.shots,
                saves: value.saves,
            })
        })
        Object.entries(teams).forEach(([key,value]) => {
            if(key == body.club.clubId) {
                homeTeamId = key
                homeTeamStats = {
                    shots: value.shots,
                    goals: value.goals,
                    playerStats: parsedHomePlayers
                }

            }
            else {
                awayTeamId = key
                awayTeamStats = {
                    shots: value.shots,
                    goals: value.goals,
                    playerStats: parsedAwayPlayers
                }
            }
    })

        const match: Match ={
            matchId: key,
            league: body.league,
            homeTeamId: homeTeamId,
            awayTeamId: awayTeamId,
            date: value.date.number+" "+value.date.unit,
            stats: {
                homeTeamStats: homeTeamStats,
                awayTeamStats: awayTeamStats
            }
        }
        result.push(match);

    })
    return result;
}