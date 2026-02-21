import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MousePointer2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
    const { t } = useTranslation();
    return (
        <section id="features" className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-foreground mb-4">
                        {t('features.title')}
                    </h2>
                    <p className="font-mono text-sm uppercase tracking-widest text-foreground/60 max-w-xl">
                        {t('features.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CursorScheduler />
                </div>
            </div>
        </section>
    );
}

// Card 1
function DiagnosticShuffler() {
    const { t } = useTranslation();
    const [cards, setCards] = useState([
        { id: 1, label: t('features.shuffler.card1.label', 'Sonic Signatures'), desc: t('features.shuffler.card1.desc', 'Music & Concerts') },
        { id: 2, label: t('features.shuffler.card2.label', 'Visual Artifacts'), desc: t('features.shuffler.card2.desc', 'Art & Exhibitions') },
        { id: 3, label: t('features.shuffler.card3.label', 'Performative Layers'), desc: t('features.shuffler.card3.desc', 'Theater & Culinary') },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[400px] bg-white border border-foreground/10 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-8 left-8">
                <h3 className="font-sans font-bold text-xl text-foreground">{t('features.shuffler.title')}</h3>
                <p className="font-mono text-xs text-foreground/50 mt-1 uppercase">{t('features.shuffler.subtitle')}</p>
            </div>

            <div className="relative w-full max-w-[240px] h-[160px] top-12 perspective-1000">
                {cards.map((card, idx) => {
                    const isTop = idx === 0;
                    const isMid = idx === 1;
                    const isBot = idx === 2;

                    return (
                        <div
                            key={card.id}
                            className="absolute w-full p-6 rounded-2xl border border-foreground/10 bg-background shadow-lg transition-all duration-700 ease-spring"
                            style={{
                                top: isTop ? 0 : isMid ? -20 : -40,
                                scale: isTop ? 1 : isMid ? 0.95 : 0.9,
                                opacity: isTop ? 1 : isMid ? 0.7 : 0.4,
                                zIndex: isTop ? 30 : isMid ? 20 : 10,
                            }}
                        >
                            <div className="font-sans font-bold text-primary">{card.label}</div>
                            <div className="font-mono text-[10px] text-foreground/60 mt-1 uppercase">{card.desc}</div>
                            <div className="mt-4 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                                <div className="h-full bg-accent/30 w-1/3 rounded-full"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Card 2
function TelemetryTypewriter() {
    const { t } = useTranslation();
    const text = t('features.typewriter.messages', "LOCAL_ROOTS_DETECTED\nOS_ORIGIN: VERIFIED\nQUALITY_MATRIX: NATIONAL_TIER\nSTATUS: AWAITING_DEPLOYMENT_2026");
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed(text.slice(0, index + 1));
                setIndex(index + 1);
            }, Math.random() * 50 + 30);
            return () => clearTimeout(timeout);
        } else {
            const reset = setTimeout(() => {
                setDisplayed("");
                setIndex(0);
            }, 5000);
            return () => clearTimeout(reset);
        }
    }, [index, text]);

    return (
        <div className="relative h-[400px] bg-[#1A1A1A] rounded-3xl p-8 shadow-xl flex flex-col justify-between overflow-hidden group">
            <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-xl text-background">{t('features.typewriter.title')}</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E63B2E] animate-pulse"></div>
                    <span className="font-mono text-[10px] text-background/50 uppercase tracking-widest">{t('features.typewriter.liveFeed')}</span>
                </div>
            </div>

            <div className="flex-grow mt-8 font-mono text-sm text-[#4CAF50] leading-relaxed whitespace-pre-wrap">
                {displayed}
                <span className="inline-block w-2.5 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
            </div>

            <div className="w-full h-[1px] bg-background/10 mt-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/4 bg-background/30 group-hover:translate-x-[400%] transition-transform duration-[2000ms] ease-in-out"></div>
            </div>
        </div>
    );
}

// Card 3
function CursorScheduler() {
    const { t } = useTranslation();
    const cursorRef = useRef(null);
    const cellRef = useRef(null);
    const saveRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(cursorRef.current, { x: 30, y: 150, opacity: 0 })
                // Fade in and move to cell
                .to(cursorRef.current, { opacity: 1, duration: 0.3 })
                .to(cursorRef.current, {
                    x: 140, y: 55,
                    duration: 1.2,
                    ease: 'power2.inOut'
                })
                // Click action (scale down slightly)
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .to(cellRef.current, {
                    backgroundColor: '#CC5833', // accent
                    color: '#F2F0E9',
                    duration: 0.1
                }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                // Move to save button
                .to(cursorRef.current, {
                    x: 180, y: 155,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    delay: 0.3
                })
                // Click save
                .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
                .to(saveRef.current, { scale: 0.95, duration: 0.1 }, "<")
                .to(cursorRef.current, { scale: 1, duration: 0.1 })
                .to(saveRef.current, { scale: 1, duration: 0.1 }, "<")
                // Reset cell and move out
                .to(cellRef.current, {
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    duration: 0.3,
                    delay: 0.5
                })
                .to(cursorRef.current, { opacity: 0, duration: 0.4 }, "-=0.2");

        });
        return () => ctx.revert();
    }, []);

    const days = t('features.scheduler.days', { returnObjects: true }) || ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="relative h-[400px] bg-white border border-foreground/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between overflow-hidden">
            <div>
                <h3 className="font-sans font-bold text-xl text-foreground">{t('features.scheduler.title')}</h3>
                <p className="font-mono text-[10px] text-foreground/50 mt-1 uppercase">{t('features.scheduler.subtitle')}</p>
            </div>

            <div className="flex-grow flex flex-col justify-center items-center relative z-10">
                <div className="grid grid-cols-7 gap-2 w-full max-w-[240px]">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            ref={i === 4 ? cellRef : null}
                            className="aspect-square flex items-center justify-center font-mono text-xs rounded border border-foreground/5 text-foreground/40 transition-colors"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-[240px] mt-6 flex justify-end">
                    <button ref={saveRef} className="px-4 py-1.5 bg-foreground text-background font-mono text-[10px] uppercase rounded">
                        {t('features.scheduler.deploy')}
                    </button>
                </div>

                {/* The Animated Cursor */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-md text-foreground"
                >
                    <MousePointer2 fill="currentColor" size={24} />
                </div>
            </div>
        </div>
    );
}
