import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'TEACHER',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    const navigate = useNavigate();

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGlowPos({
            x: Math.round((x / rect.width) * 100),
            y: Math.round((y / rect.height) * 100),
        });

        const rotateX = ((y / rect.height) - 0.5) * -14;
        const rotateY = ((x / rect.width) - 0.5) * 14;
        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGlowPos({ x: 50, y: 50 });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'خطا در ایجاد حساب کاربری.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans text-right text-stone-200 overflow-hidden"
        >
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease, border-color 0.3s ease' : 'none',
                    background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(251, 191, 36, 0.07), transparent 45%), #1c1917`
                }}
                className="w-full max-w-md bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-8 shadow-2xl transition-all duration-200 ease-out transform-gpu hover:shadow-amber-500/10"
            >

                <div className="mb-6 border-b border-stone-800 pb-4">
                    <div className="flex items-center gap-2 mb-2 group cursor-default">
                        <div className="w-3 h-3 rounded-full bg-amber-400 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-xs font-medium text-amber-400 tracking-wider">EdutechLite</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">ایجاد حساب کاربری</h1>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="group">
                        <label className="block text-xs font-medium text-stone-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                            نام کاربری
                        </label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-stone-950/80 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 hover:border-stone-700 transition-all duration-200"
                            placeholder="نام کاربری"
                        />
                    </div>

                    <div className="group">
                        <label className="block text-xs font-medium text-stone-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                            ایمیل
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-stone-950/80 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 hover:border-stone-700 transition-all duration-200"
                            placeholder="آدرس ایمیل"
                        />
                    </div>

                    <div className="group">
                        <label className="block text-xs font-medium text-stone-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                            رمز عبور
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-stone-950/80 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 hover:border-stone-700 transition-all duration-200 pl-10"
                                placeholder="رمز عبور"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors text-xs"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 012.122-.191c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-medium text-stone-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                            نقش کاربری
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 hover:border-stone-700 transition cursor-pointer"
                        >
                            <option value="TEACHER">معلم (TEACHER)</option>
                            <option value="STAFF">کادر اداری / ناظم (STAFF)</option>
                            <option value="ADMIN">مدیر سیستم (ADMIN)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin"></div>
                        ) : (
                            'ثبت‌نام'
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-stone-800 text-center text-xs text-stone-500">
                    حساب کاربری دارید؟{' '}
                    <Link to="/login" className="text-amber-400 hover:text-amber-300 hover:underline transition-colors">
                        ورود
                    </Link>
                </div>

            </div>
        </div>
    );
}