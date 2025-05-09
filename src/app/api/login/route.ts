import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
export async function POST(request: Request){
    const {email, password} = await request.json();
    let {data: Accounts, error} = await supabase
        .from('Accounts')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error) {
        return NextResponse.json({ error: 'Invalid Login' }, { status: 401 });
    }
    else {
        let {data: Accounts, error} = await supabase
        .from('Accounts')
        .update({ is_logged_in: 'TRUE' })
        .eq('email', email)
        .select()
        return NextResponse.json({ status: 200 });
    }

}
