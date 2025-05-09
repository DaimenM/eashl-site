import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
function checkEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const valid = email.includes('@') && emailRegex.test(email);
    return valid;
  }
  function checkPassword(password: string) {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length >= 8;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    return length && specialChars && upperCase && lowerCase;
    
  }
  export async function POST(request: Request) {
    try{
    const {firstName, lastName, email,password} = await request.json();
    if (!checkEmail(email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    else if (!checkPassword(password)) {
        return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
    }
    const {data, error} = await supabase
        .from('Accounts')
        .insert([
            {name: firstName+" "+lastName, email:email, password: password}
        ]).select()
    if (error) {
        console.error('Error creating account:', error.message);
        if(error.code=='23505'){
            return NextResponse.json({ error: 'Email already exists' }, { status: 401 });
        }
        else return NextResponse.json({ error: 'Error creating account' }, { status: 401 });
    }

    else return NextResponse.json({ status: 200 });
}
catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json({ error: 'Error creating account' }, { status: 500 });
}
  }
