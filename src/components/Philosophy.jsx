import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next';

export default function Philosophy() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const accentWordRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Text Reveal
            gsap.from(text1Ref.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text1Ref.current,
                    start: 'top 80%',
                }
            });

            gsap.from(text2Ref.current, {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text2Ref.current,
                    start: 'top 75%',
                }
            });

            // Accent keyword pop
            gsap.from(accentWordRef.current, {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                delay: 0.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: text2Ref.current,
                    start: 'top 75%',
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophy"
            ref={containerRef}
            className="relative w-full py-40 overflow-hidden bg-foreground flex items-center justify-center min-h-[80vh]"
        >
            {/* Background Texture */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center opacity-10 mix-blend-screen"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1501862700950-18382cb91834?q=80&w=2500&auto=format&fit=crop')"
                }}
            />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
                <p ref={text1Ref} className="font-sans text-xl md:text-2xl text-background/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                    {t('philosophy.statement1_1')} <span className="text-background/80">{t('philosophy.statement1_2')}</span>
                </p>

                <h2 ref={text2Ref} className="font-sans font-bold text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] text-background leading-[1.1] tracking-tight flex flex-col items-center">
                    <span className="block mb-2">{t('philosophy.statement2_1')}</span>
                    <span ref={accentWordRef} className="block font-serif italic text-accent pr-4">{t('philosophy.statement2_2')}</span>
                </h2>
            </div>
        </section>
    );
}
