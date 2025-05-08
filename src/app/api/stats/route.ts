import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clubId = searchParams.get('clubId');
   
  try {
    const response = await axios.get(
      `https://proclubs.ea.com/api/nhl/clubs/search?platform=common-gen5&clubName=${clubId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          "Accept": "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
        }
      }
    );
    console.log('EA API response:', response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'EA API failed' }, { status: 500 });
  }
}
