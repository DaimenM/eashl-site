'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('Form submitted:', { email, password });
    };

async function handleLogin() {
    const response = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    if(response.ok) {
       router.push('/');
  }
  else{
        const data = await response.json();
        setError(data.error);
        setShowError(true);
        return data.error;
     }
  }

  async function createAccount() {
    const response = await fetch('api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName,lastName,email,password})
    }
    )
    if(response.ok) {
        router.push('/');
    }
    else{
        const data = await response.json();
        setError(data.error);
        setShowError(true);
        return data.error;
    }

  }
  return (
    <main className="flex-1 min-h-screen bg-gradient-to-b from-blue-900 to-slate-900 text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
            <div>
              <div style={{padding: '0 0 15px'}}>
                <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                    First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  pattern="[A-Za-z]+"
                  value={firstName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[A-Za-z]+$/.test(value)) {
                      setFirstName(value);
                    }
                  }}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

                <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                    Last Name
                </label>
                <input
                type="text"
                id="last-name"
                pattern="[A-Za-z]+"
                value={lastName}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[A-Za-z]+$/.test(value)) {
                      setLastName(value);
                    }
                  }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                </div>
                </div>
              
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              onClick={() => isLogin? handleLogin(): createAccount()}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-300 hover:text-blue-200 text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>

          {showError && (
            <div className="mt-4 bg-red-500/90 text-white px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </main>
    );
}