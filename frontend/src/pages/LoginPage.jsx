import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { username, password });

            // استخراج توکن (چه به صورت رشته مستقیم، چه در قالب JSON)
            let token = response.data;
            if (typeof response.data === 'object' && response.data !== null) {
                token = response.data.token || response.data.accessToken || response.data.jwt;
            }

            console.log('Token Received:', token);

            if (token && token !== 'undefined' && token !== 'null') {
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);

                // هدایت اجباری به داشبورد
                navigate('/dashboard', { replace: true });
            } else {
                setError('پاسخ دریافت شده از سرور حاوی توکن معتبر نیست.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError('نام کاربری یا رمز عبور اشتباه است.');
            } else {
                setError('خطا در ارتباط با سرور. مطمئن شوید بک‌اند روشن است.');
            }
        }
    };

    return (
        <div dir="rtl" className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans text-stone-200">
            <div className="bg-stone-900 border border-stone-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
                <div className="flex items-center gap-2 mb-6 justify-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <h1 className="text-xl font-bold text-white">ورود به EdutechLite</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs text-stone-400 mb-1">نام کاربری</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-stone-400 mb-1">رمز عبور</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-2.5 rounded-lg text-xs transition mt-2"
                    >
                        ورود به حساب
                    </button>
                </form>

                {/* لینک هدایت به صفحه ثبت‌نام */}
                <div className="mt-4 text-center text-xs text-stone-400">
                    حساب کاربری ندارید؟{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-amber-400 hover:underline font-medium"
                    >
                        ثبت‌نام کنید
                    </button>
                </div>
            </div>
        </div>
    );
}