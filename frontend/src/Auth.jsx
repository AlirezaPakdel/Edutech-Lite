import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); // جابجایی بین لاگین و ثبت‌نام
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'STUDENT' // نقش پیش‌فرض
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const endpoint = isLogin ? 'http://localhost:8081/api/auth/login' : 'http://localhost:8081/api/auth/register';

        // ساخت بدنه درخواست بر اساس دیتای بک‌اند شما
        const payload = isLogin
            ? { username: formData.username, password: formData.password }
            : formData;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('خطایی در ارتباط با سرور رخ داد. اطلاعات را بررسی کنید.');
            }

            if (isLogin) {
                const token = await response.text(); // بک‌اند شما توکن را به صورت String برمی‌گرداند
                localStorage.setItem('token', token);
                setMessage('ورود با موفقیت انجام شد! 🎉');
                // اینجا می‌توانید کاربر را به صفحه داشبورد هدایت کنید
            } else {
                setMessage('ثبت‌نام با موفقیت انجام شد! اکنون وارد شوید. ✅');
                setIsLogin(true); // هدایت به صفحه لاگین
            }
        } catch (err) {
            setError(err.message || 'عملیات ناموفق بود.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Edutech Lite</h2>
                    <p>{isLogin ? 'خوش آمدید! لطفاً وارد شوید' : 'حساب کاربری جدید بسازید'}</p>
                </div>

                {message && <div className="alert success">{message}</div>}
                {error && <div className="alert error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>نام کاربری</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="نام کاربری خود را وارد کنید"
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="input-group">
                                <label>ایمیل</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@site.com"
                                />
                            </div>
                            <div className="input-group">
                                <label>نقش کاربری</label>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="STUDENT">دانش‌آموز / دانشجو</option>
                                    <option value="TEACHER">استاد / مدرس</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label>رمز عبور</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        {isLogin ? 'ورود به حساب' : 'ثبت‌نام'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده اید؟'}
                        <span onClick={() => { setIsLogin(!isLogin); setMessage(''); setError(''); }}>
                            {isLogin ? ' ثبت‌نام کنید' : ' وارد شوید'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;