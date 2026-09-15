import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        unfinishedTasksCount: 0,
        substituteSchedulesCount: 0,
        highSeverityIncidentsCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/dashboard/stats')
            .then((res) => {
                if (res.data) {
                    setStats({
                        unfinishedTasksCount: res.data.unfinishedTasksCount ?? 0,
                        substituteSchedulesCount: res.data.substituteSchedulesCount ?? 0,
                        highSeverityIncidentsCount: res.data.highSeverityIncidentsCount ?? 0,
                    });
                }
                setError('');
            })
            .catch((err) => {
                console.error('خطای آمار داشبورد:', err);
                setError(`عدم دریافت آمار از سرور (کد خطا: ${err.response?.status || 'ارتباط'})`);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div dir="rtl" className="min-h-screen bg-stone-950 text-stone-200 font-sans">
            <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="font-bold text-white text-lg">EdutechLite</span>
                </div>
                <nav className="flex items-center gap-6 text-sm">
                    <Link to="/dashboard" className="text-amber-400 font-medium">داشبورد</Link>
                    <Link to="/tasks" className="text-stone-400 hover:text-stone-200 transition">تکالیف</Link>
                    <Link to="/schedules" className="text-stone-400 hover:text-stone-200 transition">زمان‌بندی</Link>
                    <Link to="/incidents" className="text-stone-400 hover:text-stone-200 transition">حوادث</Link>
                    <button onClick={handleLogout} className="text-stone-500 hover:text-red-400 text-xs transition border border-stone-800 rounded-lg px-3 py-1.5">
                        خروج
                    </button>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto p-6 md:p-8">
                <div className="mb-8 bg-stone-900 border border-stone-800 rounded-2xl p-6">
                    <h1 className="text-xl font-bold text-white mb-1">خلاصه وضعیت سیستم</h1>
                    <p className="text-xs text-stone-400">آمار کلی تکالیف، برنامه‌ها و حوادث ثبت‌شده</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/tasks" className="bg-stone-900 border border-stone-800 hover:border-amber-400/50 transition rounded-xl p-5">
                        <span className="text-xs text-stone-500 block mb-1">تکالیف ناتمام</span>
                        <span className="text-2xl font-bold text-amber-400">{loading ? '...' : stats.unfinishedTasksCount}</span>
                    </Link>

                    <Link to="/schedules" className="bg-stone-900 border border-stone-800 hover:border-amber-400/50 transition rounded-xl p-5">
                        <span className="text-xs text-stone-500 block mb-1">برنامه‌های جایگزین</span>
                        <span className="text-2xl font-bold text-amber-400">{loading ? '...' : stats.substituteSchedulesCount}</span>
                    </Link>

                    <Link to="/incidents" className="bg-stone-900 border border-stone-800 hover:border-amber-400/50 transition rounded-xl p-5">
                        <span className="text-xs text-stone-500 block mb-1">حوادث با اولویت بالا</span>
                        <span className="text-2xl font-bold text-amber-400">{loading ? '...' : stats.highSeverityIncidentsCount}</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}