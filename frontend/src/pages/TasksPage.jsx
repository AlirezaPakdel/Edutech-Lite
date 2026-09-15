import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // استیت‌های فرم افزودن تکلیف جدید
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('TODO');

    const navigate = useNavigate();

    // دریافت لیست تکالیف از بک‌اند
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tasks');
            setTasks(response.data || []);
            setError('');
        } catch (err) {
            console.error('خطا در دریافت تکالیف:', err);
            setError('خطا در دریافت لیست تکالیف از سرور');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ایجاد تکلیف جدید
    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await api.post('/tasks', {
                title: title.trim(),
                description: description.trim(),
                dueDate: dueDate || null,
                status: status,
            });

            // ریست فرم و بروزرسانی لیست
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('TODO');
            fetchTasks();
        } catch (err) {
            console.error('خطا در ثبت تکلیف:', err);
            alert('خطا در ایجاد تکلیف جدید');
        }
    };

    // تغییر وضعیت تکلیف (تکمیل / در حال انجام)
    const handleToggleStatus = async (task) => {
        const nextStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
        try {
            await api.put(`/tasks/${task.id}`, {
                ...task,
                status: nextStatus,
            });
            fetchTasks();
        } catch (err) {
            console.error('خطا در تغییر وضعیت تکلیف:', err);
        }
    };

    // حذف تکلیف
    const handleDeleteTask = async (id) => {
        if (!window.confirm('آیا از حذف این تکلیف مطمئن هستید؟')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.error('خطا در حذف تکلیف:', err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div dir="rtl" className="min-h-screen bg-stone-950 text-stone-200 font-sans">
            {/* هدر اصلی */}
            <header className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="font-bold text-white text-lg">EdutechLite</span>
                </div>
                <nav className="flex items-center gap-6 text-sm">
                    <Link to="/dashboard" className="text-stone-400 hover:text-stone-200 transition">داشبورد</Link>
                    <Link to="/tasks" className="text-amber-400 font-medium">تکالیف</Link>
                    <Link to="/schedules" className="text-stone-400 hover:text-stone-200 transition">زمان‌بندی</Link>
                    <Link to="/incidents" className="text-stone-400 hover:text-stone-200 transition">حوادث</Link>
                    <button onClick={handleLogout} className="text-stone-500 hover:text-red-400 text-xs transition border border-stone-800 rounded-lg px-3 py-1.5">
                        خروج
                    </button>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto p-6 md:p-8">
                {/* عنوان صفحه */}
                <div className="mb-8 bg-stone-900 border border-stone-800 rounded-2xl p-6">
                    <h1 className="text-xl font-bold text-white mb-1">مدیریت تکالیف و کارهای جاری</h1>
                    <p className="text-xs text-stone-400">لیست کلیه تکالیف ثبت‌شده به همراه امکان ایجاد و بروزرسانی وضعیت</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                        {error}
                    </div>
                )}

                {/* فرم ثبت تکلیف جدید */}
                <div className="mb-8 bg-stone-900 border border-stone-800 rounded-2xl p-6">
                    <h2 className="text-sm font-bold text-stone-200 mb-4">ثبت تکلیف جدید</h2>
                    <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-stone-400 mb-1">عنوان تکلیف *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="مثال: طراحی دیاگرام ER"
                                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-stone-400 mb-1">وضعیت اولیه</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                            >
                                <option value="TODO">انجام‌نشده (TODO)</option>
                                <option value="IN_PROGRESS">در حال انجام (IN_PROGRESS)</option>
                                <option value="DONE">انجام‌شده (DONE)</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs text-stone-400 mb-1">توضیحات</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                placeholder="توضیحات مربوط به تکلیف..."
                                className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold px-5 py-2 rounded-lg text-xs transition"
                            >
                                + ثبت تکلیف
                            </button>
                        </div>
                    </form>
                </div>

                {/* جدول / لیست تکالیف */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-stone-800 flex justify-between items-center">
                        <h2 className="text-sm font-bold text-stone-200">لیست تکالیف ({tasks.length})</h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-xs text-stone-500">در حال دریافت داده‌ها...</div>
                    ) : tasks.length === 0 ? (
                        <div className="p-8 text-center text-xs text-stone-500">هیچ تکلیفی ثبت نشده است.</div>
                    ) : (
                        <div className="divide-y divide-stone-800">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-4 flex items-center justify-between hover:bg-stone-950/50 transition">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                      <span className={`font-medium text-sm ${task.status === 'DONE' ? 'line-through text-stone-500' : 'text-stone-100'}`}>
                        {task.title}
                      </span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                                task.status === 'DONE'
                                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                                                    : task.status === 'IN_PROGRESS'
                                                        ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50'
                                                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                                            }`}>
                        {task.status === 'DONE' ? 'انجام‌شده' : task.status === 'IN_PROGRESS' ? 'در حال انجام' : 'انجام‌نشده'}
                      </span>
                                        </div>
                                        {task.description && (
                                            <p className="text-xs text-stone-400">{task.description}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(task)}
                                            className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                                                task.status === 'DONE'
                                                    ? 'border-stone-700 text-stone-400 hover:bg-stone-800'
                                                    : 'border-emerald-800/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                                            }`}
                                        >
                                            {task.status === 'DONE' ? 'علامت به عنوان ناتمام' : 'علامت به عنوان انجام‌شده'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="text-xs px-3 py-1.5 rounded-lg border border-red-900/60 bg-red-950/30 text-red-400 hover:bg-red-900/50 transition"
                                        >
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}