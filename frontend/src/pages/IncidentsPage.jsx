import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('LOW');

    const fetchIncidents = () => {
        setLoading(true);
        api.get('/incidents')
            .then((res) => setIncidents(res.data))
            .catch(() => setIncidents([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleCreateIncident = (e) => {
        e.preventDefault();
        api.post('/incidents', { description, severity })
            .then(() => {
                setDescription('');
                setSeverity('LOW');
                fetchIncidents();
            });
    };

    return (
        <div dir="rtl" className="min-h-screen bg-stone-950 text-stone-200 font-sans">
            <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
                <span className="font-bold text-white text-lg">EdutechLite</span>
                <nav className="flex items-center gap-6 text-sm">
                    <Link to="/dashboard" className="text-stone-400 hover:text-stone-200">داشبورد</Link>
                    <Link to="/tasks" className="text-stone-400 hover:text-stone-200">تکالیف</Link>
                    <Link to="/schedules" className="text-stone-400 hover:text-stone-200">زمان‌بندی</Link>
                    <Link to="/incidents" className="text-amber-400 font-medium">حوادث</Link>
                </nav>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                <form onSubmit={handleCreateIncident} className="bg-stone-900 border border-stone-800 rounded-xl p-5 mb-8 space-y-4">
                    <h2 className="text-sm font-bold text-white">ثبت حادثه / گزارش خطا</h2>
                    <textarea
                        placeholder="شرح حادثه یا مشکل..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="2"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    ></textarea>
                    <div className="flex justify-between items-center">
                        <select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="bg-stone-950 border border-stone-800 text-stone-300 text-xs rounded-lg p-2 focus:outline-none"
                        >
                            <option value="LOW">کم (LOW)</option>
                            <option value="MEDIUM">متوسط (MEDIUM)</option>
                            <option value="HIGH">بالا (HIGH)</option>
                        </select>
                        <button type="submit" className="bg-amber-400 text-stone-950 font-semibold px-4 py-2 rounded-lg text-xs">ثبت گزارش</button>
                    </div>
                </form>

                <div className="space-y-3">
                    {loading ? <p className="text-xs text-stone-500">در حال دریافت گزارش‌ها...</p> : incidents.map((item) => (
                        <div key={item.id} className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex justify-between items-center text-xs">
                            <span className="text-stone-300">{item.description}</span>
                            <span className={`px-2.5 py-1 rounded border ${item.severity === 'HIGH' ? 'border-red-800 bg-red-950/40 text-red-400' : 'border-stone-800 text-stone-400'}`}>
                {item.severity}
              </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}