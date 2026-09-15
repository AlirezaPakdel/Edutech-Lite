import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function SchedulesPage() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [isSubstitute, setIsSubstitute] = useState(false);

    const fetchSchedules = () => {
        setLoading(true);
        api.get('/schedules')
            .then((res) => setSchedules(res.data))
            .catch(() => setSchedules([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleCreateSchedule = (e) => {
        e.preventDefault();
        api.post('/schedules', { title, isSubstitute })
            .then(() => {
                setTitle('');
                setIsSubstitute(false);
                fetchSchedules();
            });
    };

    return (
        <div dir="rtl" className="min-h-screen bg-stone-950 text-stone-200 font-sans">
            <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
                <span className="font-bold text-white text-lg">EdutechLite</span>
                <nav className="flex items-center gap-6 text-sm">
                    <Link to="/dashboard" className="text-stone-400 hover:text-stone-200">داشبورد</Link>
                    <Link to="/tasks" className="text-stone-400 hover:text-stone-200">تکالیف</Link>
                    <Link to="/schedules" className="text-amber-400 font-medium">زمان‌بندی</Link>
                    <Link to="/incidents" className="text-stone-400 hover:text-stone-200">حوادث</Link>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                <form onSubmit={handleCreateSchedule} className="bg-stone-900 border border-stone-800 rounded-xl p-5 mb-8 flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="عنوان برنامه آموزشی"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="flex-1 bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <label className="flex items-center gap-2 text-xs text-stone-300">
                        <input
                            type="checkbox"
                            checked={isSubstitute}
                            onChange={(e) => setIsSubstitute(e.target.checked)}
                            className="accent-amber-400"
                        />
                        برنامه جایگزین / جبرانی
                    </label>
                    <button type="submit" className="bg-amber-400 text-stone-950 font-semibold px-4 py-2 rounded-lg text-xs">ثبت برنامه</button>
                </form>

                <div className="space-y-3">
                    {loading ? <p className="text-xs text-stone-500">در حال دریافت برنامه‌ها...</p> : schedules.map((schedule) => (
                        <div key={schedule.id} className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex justify-between items-center text-xs">
                            <span className="font-bold text-white">{schedule.title}</span>
                            {schedule.isSubstitute && (
                                <span className="text-amber-400 border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 rounded">
                  برنامه جایگزین
                </span>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}