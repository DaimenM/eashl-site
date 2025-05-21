import {NextResponse, NextRequest} from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { withAuth } from '@/lib/api/with-auth';



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
        const supabase = await createServerSupabaseClient();
        const body = await request.json();
        const {data, error} = await supabase
            .from('Teams')
            .insert({
                clubId: body.clubId,
                clubName: body.clubName,
                league: body.league,
                logo: body.logo,
                created_at: new Date(),
            })
            .select('*')
            .single()
        if (error) console.error(error);
        return NextResponse.json({ data });
    })
}

export async function DELETE(request: NextRequest){
    const {searchParams} = new URL(request.url);
    const league_name = searchParams.get('league')
    return withAuth(request, async (user) => {
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const supabase = await createServerSupabaseClient();
        const body = await request.json();
        console.log(body);
        const {data, error} = await supabase
            .from('Teams')
            .delete()
            .eq('clubId', body.clubId)
            .eq('league', league_name)
            .select('*')
        if (error) console.error(error);
        if (data && data.length === 0) {
            return NextResponse.json({ error: "No teams found" }, { status: 404 });
        }
        return NextResponse.json({ data });
    })
}
