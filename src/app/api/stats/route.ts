import { NextResponse } from 'next/server';
import axios from 'axios';
import { TeamStats } from '@/types/stats';
import { Team } from '@/types/team';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clubId = searchParams.get('clubId');
  const clubName = searchParams.get('clubName');
   if(clubName&&clubId){
  try {
    const clubResponse = await axios.get(
      `https://proclubs.ea.com/api/nhl/clubs/search?platform=common-gen5&clubName=${encodeURI(clubName)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
        }
      }
    );
    //console.log('EA API response:', response.data);
    const club = matchClub(clubResponse.data, clubId);
    const mathcesResponse = await axios.get(
      `https://proclubs.ea.com/api/nhl/clubs/matches?matchType=club_private&platform=common-gen5&clubIds=${clubId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
        }
      }
    )
    const membersResponse = await axios.get(
      `https://proclubs.ea.com/api/nhl/members/stats?platform=common-gen5&clubId=${clubId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
        }
      })
      const members : Record<string, any>[] = [];
      members.push(membersResponse.data as Record<string, any>);
      const matches = mathcesResponse.data as Record<string, any>[];
    return NextResponse.json({
      status: 200,
      club: {
        clubId: club.clubId,
        clubName: club.clubName,
        wins: club.wins,
        losses: club.losses,
        ties: club.ties,
        overtimeLosses: club.overtimeLosses,
        goalsFor: club.goalsFor,
        goalsAgainst: club.goalsAgainst,
      },
      matches: parseMatches(matches,club.clubId),
      members: parseMembers(members),
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'EA API failed' }, { status: 500 });
  }
}
}
function matchClub(data: any, clubId: string){
  let team: TeamStats
  const keys = Object.keys(data);
  for(const key of keys){
    if(key == clubId){
      return {
        clubId: key,
        clubName: data[key].name,
        wins: data[key].wins,
        losses: data[key].losses,
        ties: data[key].ties,
        overtimeLosses: data[key].otl,
        goalsFor: data[key].goals,
        goalsAgainst: data[key].goalsAgainst,
      };
    }
  }
  throw new Error('Club not found');
}

function parseMatches(matches:Record<string, any>[],clubId: string){
  const result : Record<string, any>  = {}
  const teams : Record<string, any> = {}
  const homeTeamPlayers: Record<string, any> = {}
  const awayTeamPlayers: Record<string, any> = {}
  Object.entries(matches).forEach(([key,value]) => {
    const clubs: Record<string, any> = value.clubs
    const players: Record<string, any> = value.players
      Object.entries(clubs).forEach(([key,value]) => {
      teams[value.details.clubId] = {
      teamId :value.details.clubId,
      teamName : value.details.name,
      teamGoals : value.goals,
      teamShots: value.shots,
    }
      })
    Object.entries(players).forEach(([key,value]) => {
    const player: Record<string, any> = value
      if(key == clubId){
          Object.entries(player).forEach(([key,value]) => {
      if(value.isGuest==0){
      homeTeamPlayers[value.playername] = {
        playerId: key,
        position: value.position,
        goals: value.skgoals,
        assists: value.skassists,
        shots: value.skshots+value.glshots,
        saves: value.glsaves,
      }
      }
    })
        }
    else{
      Object.entries(player).forEach(([key,value]) => {
      if(value.isGuest==0){
      awayTeamPlayers[value.playername] = {
        playerId: key,
        position: value.position,
        goals: value.skgoals,
        assists: value.skassists,
        shots: value.skshots+value.glshots,
        saves: value.glsaves,
      }
      }
    })
  }
  })
result[value.matchId] = {
      matchId : value.matchId,
      date : value.timeAgo,
      teams : teams,
      homeTeamPlayers : homeTeamPlayers,
      awayTeamPlayers : awayTeamPlayers,
    }
  })
  return result
}
function parseMembers(members: Record<string, any>[]){
  const result: Record<string, any> = {}
  members.forEach((obj: Record<string, any>) => {
    obj.members.forEach((member: Record<string, any>) => {
    if(member.name){
    result[member.name] = {
      goals: member.goals,
      assists: member.assists,
      points: member.points,
      plusminus: member.plusmin,
      gamesPlayed: member.gamesplayed,
      shots: member.skshots+member.glshots,
      saves: member.glsaves,
      position: member.favoritePosition,
    }
    //console.log(result[member.name])
  }
})
  })
return result
}

