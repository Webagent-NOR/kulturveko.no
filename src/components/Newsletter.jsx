import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

export default function Newsletter() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | already | error
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                y: 60,
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus(data.already ? 'already' : 'success');
                setEmail('');
            } else {
                setStatus('error');
                setErrorMsg(data.error || t('newsletter.errorGeneric'));
            }
        } catch {
            setStatus('error');
            setErrorMsg(t('newsletter.errorGeneric'));
        }
    };

    return (
        <section id="newsletter" ref={containerRef} className="py-32 px-6 bg-background flex justify-center">
            <div
                ref={cardRef}
                className="w-full max-w-4xl bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#F2F0E9]/60 mb-6">
                        {t('newsletter.phase')}
                    </div>
                    <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-7xl text-[#F2F0E9] mb-8 tracking-tight">
                        {t('newsletter.title1')} <span className="font-serif italic text-accent pr-2">{t('newsletter.title2')}</span>
                    </h2>
                    <p className="font-sans text-[#F2F0E9]/80 max-w-lg mx-auto mb-10 text-lg">
                        {t('newsletter.desc')}
                    </p>

                    {status === 'success' || status === 'already' ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 max-w-md mx-auto border border-white/10">
                            <p className="font-sans text-[#F2F0E9] text-lg">
                                {status === 'already' ? t('newsletter.already') : t('newsletter.success')}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('newsletter.placeholder')}
                                required
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#F2F0E9] placeholder:text-[#F2F0E9]/40 font-sans text-base outline-none focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="relative overflow-hidden group px-8 py-4 rounded-full bg-accent text-white font-sans font-medium text-base ease-magnetic hover:scale-[1.03] transition-transform duration-500 inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100"
                            >
                                <span className="absolute inset-0 w-full h-full bg-[#F2F0E9] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-[1]"></span>
                                <span className="relative z-[2] group-hover:text-primary transition-colors duration-500">
                                    {status === 'loading' ? t('newsletter.sending') : t('newsletter.cta')}
                                </span>
                            </button>
                        </form>
                    )}

                    {status === 'error' && (
                        <p className="font-mono text-sm text-accent mt-4">{errorMsg}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
