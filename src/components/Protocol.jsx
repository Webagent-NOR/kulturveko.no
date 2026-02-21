import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Protocol() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    const steps = t('protocol.steps', { returnObjects: true }) || [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 3 full-screen cards that stack on scroll
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // We rely on CSS "sticky top-0" for pinning instead of GSAP's pin,
                // so we don't collapse the layout and hide the Newsletter.

                // The card underneath scales down, blurs, and fades
                if (i > 0) {
                    const prevCard = cardsRef.current[i - 1];
                    gsap.to(prevCard, {
                        scale: 0.9,
                        filter: 'blur(10px)',
                        opacity: 0.5,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true
                        }
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative bg-background">
            {steps.map((step, i) => (
                <div
                    key={i}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="w-full h-[100dvh] sticky top-0 flex items-center justify-center p-6"
                    style={{ zIndex: i }}
                >
                    <div className="w-full max-w-5xl h-[80vh] bg-white rounded-4xl border border-foreground/5 shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(26,26,26,0.05)]">

                        {/* Visualizer Side */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-foreground flex items-center justify-center p-8 relative overflow-hidden">
                            <div className="absolute top-6 left-6 font-mono text-xs text-background/50 uppercase">
                                {t('protocol.visualizer', { num: step.num })}
                            </div>
                            {i === 0 && <GeometricMotif />}
                            {i === 1 && <ScanningLaser />}
                            {i === 2 && <PulsingWaveform />}
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-10 md:p-16 lg:p-24 bg-background">
                            <div className="font-mono text-accent text-sm md:text-lg mb-6 tracking-widest uppercase">
                                {t('protocol.phase', { num: step.num })}
                            </div>
                            <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
                                {step.title}
                            </h2>
                            <p className="font-sans text-lg text-foreground/70 leading-relaxed max-w-md">
                                {step.desc}
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}

// 1. Slowly rotating geometric motif
function GeometricMotif() {
    const sysRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(sysRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none'
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sysRef} className="w-64 h-64 border border-background/20 rounded-full flex items-center justify-center relative">
            <div className="w-48 h-48 border border-background/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-background/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-accent rounded-full opacity-80" />
                </div>
            </div>
            <div className="absolute w-[120%] h-[1px] bg-background/20 rotate-45" />
            <div className="absolute w-[120%] h-[1px] bg-background/20 -rotate-45" />
        </div>
    );
}

// 2. Scanning horizontal laser-line over grid
function ScanningLaser() {
    const laserRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(laserRef.current,
                { top: '0%' },
                { top: '100%', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full h-[80%] max-w-xs border border-background/20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjQyLDI0MCwyMzMsMC4yKSIvPjwvc3ZnPg==')] opacity-50" />
            <div ref={laserRef} className="absolute left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#CC5833] z-10" />
        </div>
    );
}

// 3. Pulsing waveform
function PulsingWaveform() {
    const pathRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                duration: 2,
                repeat: -1,
                ease: 'power1.inOut',
                yoyo: true
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full p-8">
            <svg viewBox="0 0 200 100" className="w-full h-auto stroke-accent z-10 relative" fill="none" strokeWidth="2">
                <path
                    ref={pathRef}
                    d="M0 50 Q 25 50, 40 20 T 80 80 T 120 20 T 160 80 Q 175 50, 200 50"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                />
            </svg>
        </div>
    );
}
