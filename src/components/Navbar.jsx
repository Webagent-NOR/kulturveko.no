import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const navRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar morphing logic
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    targets: navRef.current,
                    className: 'scrolled'
                },
                onToggle: (self) => {
                    if (self.isActive) {
                        gsap.to(navRef.current, {
                            backgroundColor: 'rgba(242, 240, 233, 0.8)', // Cream/background
                            backdropFilter: 'blur(16px)',
                            borderColor: 'rgba(26, 26, 26, 0.1)', // Charcoal border
                            color: '#2E4036', // Moss primary
                            duration: 0.4,
                            ease: 'power2.inOut'
                        });
                    } else {
                        gsap.to(navRef.current, {
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            backdropFilter: 'blur(0px)',
                            borderColor: 'rgba(255, 255, 255, 0)',
                            color: '#F2F0E9', // Cream (light text at top)
                            duration: 0.4,
                            ease: 'power2.inOut'
                        });
                    }
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 w-full pointer-events-none">
            <nav
                ref={navRef}
                className="pointer-events-auto flex items-center justify-between px-6 py-3 clip-pill border border-transparent transition-all w-full max-w-4xl text-background gap-4"
            >
                <div className="font-sans font-bold text-xl tracking-tight uppercase whitespace-nowrap">
                    {t('navbar.title')}
                </div>

                <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-widest">
                    <a href="#features" className="hover:-translate-y-[1px] transition-transform duration-300">{t('navbar.experience')}</a>
                    <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform duration-300">{t('navbar.identity')}</a>
                    <a href="#protocol" className="hover:-translate-y-[1px] transition-transform duration-300">{t('navbar.program')}</a>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        value={i18n.language.split('-')[0]}
                        className="bg-transparent text-inherit font-mono text-xs uppercase outline-none cursor-pointer hidden sm:block appearance-none border border-current rounded-full px-3 py-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <option value="nn" className="text-foreground">NN</option>
                        <option value="no" className="text-foreground">BM</option>
                        <option value="en" className="text-foreground">EN</option>
                    </select>

                    <button className="relative overflow-hidden group px-4 py-2 sm:px-6 clip-pill bg-accent text-white font-sans font-medium text-sm ease-magnetic hover:scale-[1.03] transition-transform duration-500 whitespace-nowrap">
                        <span className="absolute inset-0 w-full h-full bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-[1]"></span>
                        <span className="relative z-[2]">{t('navbar.newsletter')}</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
