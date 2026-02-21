import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Hero() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Initialize Mapbox
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9', // Satellite imagery
            center: [5.4673, 60.1866], // Osøyro / Bjørnafjorden
            zoom: 10,  // Start high up
            pitch: 0,
            bearing: -45,
            interactive: false
        });

        // Setup 3D terrain and fog when loaded
        map.on('style.load', () => {
            // Add 3D terrain
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

            // Atmospheric fog
            map.setFog({
                'range': [0.5, 3],
                'color': '#2E4036',         // primary color 
                'horizon-blend': 0.1,
                'high-color': '#1A1A1A',    // foreground color
                'space-color': '#1A1A1A',
                'star-intensity': 0.2
            });

            // The Cinematic "Stup" -> fly down into the fjord
            setTimeout(() => {
                map.flyTo({
                    center: [5.4673, 60.1866],
                    zoom: 13.5,
                    bearing: 30, // Turn the view 
                    pitch: 75,   // Look down slightly 
                    duration: 20000, // 20 seconds epic dive
                    essential: true
                });

                // Keep panning slowly after arriving
                setTimeout(() => {
                    map.flyTo({
                        bearing: 90,
                        duration: 80000, // Very slow pan over the fjord
                        easing: (t) => t, // Linear pacing
                        essential: true
                    });
                }, 20000);
            }, 1000); // 1 sec delay before diving
        });

        const ctx = gsap.context(() => {
            // Staggered fade-up
            gsap.from([textRef1.current, textRef2.current, ctaRef.current], {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 1.5 // Wait a bit so the map starts moving before text appears
            });

            // Subtle parallax on scroll
            gsap.to(mapContainerRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, containerRef);

        return () => {
            ctx.revert();
            if (map) map.remove();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-primary flex items-end">
            {/* Mapbox Background Container */}
            <div className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden bg-primary">
                {/* 3D Mapbox Element */}
                <div
                    ref={mapContainerRef}
                    className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"
                />
            </div>

            {/* Heavy primary-to-black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#2E4036]/80 to-transparent" />

            {/* Content pushes to bottom-left third */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:w-2/3 ml-0 lg:ml-[10%]">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-background flex flex-col leading-none">
                        <span ref={textRef1} className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2">
                            {t('hero.line1')}
                        </span>
                        <span ref={textRef2} className="font-serif italic text-7xl md:text-9xl lg:text-[11rem] leading-[0.85] text-accent pr-4">
                            {t('hero.line2')}
                        </span>
                    </h1>

                    <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <a href="#newsletter" className="relative overflow-hidden group px-8 py-4 rounded-3xl bg-accent text-white font-sans font-medium text-lg ease-magnetic hover:scale-[1.03] transition-transform duration-500 flex items-center gap-3 no-underline">
                            <span className="absolute inset-0 w-full h-full bg-background -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-[1]"></span>
                            <span className="relative z-[2] group-hover:text-primary transition-colors duration-500">{t('hero.cta')}</span>
                        </a>
                        <p className="font-mono text-sm text-background/70 max-w-xs leading-relaxed uppercase tracking-wide">
                            {t('hero.date')}<br />
                            {t('hero.location')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
