import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clubId = searchParams.get('clubId');
  const clubName = searchParams.get('clubName');
   if(clubName&&clubId){
  try {
    const response = await axios.get(
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
    const club = matchClub(response.data, clubId);
    return NextResponse.json({
      status: 200,
      body: {
        clubId: club.clubId,
        clubName: club.clubName,
        data: club.team,
      }
    })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'EA API failed' }, { status: 500 });
  }
}
}
function matchClub(data: any, clubId: string){
  const keys = Object.keys(data);
  for(const key of keys){
    if(key == clubId){
      return {
        clubId: key,
        clubName: data[key].name,
        team: data[key]
      };
    }
  }
  throw new Error('Club not found');
}

