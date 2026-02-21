import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const [modal, setModal] = useState(null); // 'privacy' | 'terms' | null

    return (
        <>
            <footer className="bg-[#0D0D12] text-white pt-24 pb-8 px-6 md:px-12 rounded-t-[4rem] relative z-20 mt-[-2rem]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-8">

                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-sans font-bold text-3xl tracking-tight text-[#F2F0E9]">{t('navbar.title')}</h3>
                            <p className="font-serif italic text-xl text-[#F2F0E9]/60 mt-2">{t('footer.subtitle')}</p>
                        </div>

                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 w-fit">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] animate-pulse" />
                            <span className="font-mono text-xs text-[#F2F0E9]/70 uppercase tracking-widest">{t('footer.status')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{t('footer.index')}</h4>
                            <a href="#features" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">{t('navbar.experience')}</a>
                            <a href="#philosophy" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">{t('navbar.identity')}</a>
                            <a href="#protocol" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">{t('navbar.program')}</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{t('footer.social')}</h4>
                            <a href="https://www.instagram.com/kulturveko/" target="_blank" rel="noopener noreferrer" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">Instagram</a>
                            <a href="https://www.facebook.com/profile.php?id=61587921840896" target="_blank" rel="noopener noreferrer" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">Facebook</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{t('footer.legal')}</h4>
                            <button onClick={() => setModal('privacy')} className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm text-left">{t('footer.privacy')}</button>
                            <button onClick={() => setModal('terms')} className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm text-left">{t('footer.terms')}</button>
                            <a href="mailto:post@kulturveko.no" className="text-[#F2F0E9]/80 hover:text-white transition-colors text-sm">{t('footer.contact')}</a>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-[10px] text-white/40 uppercase">{t('footer.rights')}</p>
                    <a href="https://webagent.no" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/40 uppercase tracking-widest hover:text-white/60 transition-colors">Levert av Webagent</a>
                </div>
            </footer>

            {/* Legal Modal */}
            {modal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setModal(null)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <div
                        className="relative bg-[#F2F0E9] text-foreground rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModal(null)}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors text-foreground font-mono text-sm"
                        >
                            &times;
                        </button>

                        {modal === 'privacy' && <PrivacyContent t={t} />}
                        {modal === 'terms' && <TermsContent t={t} />}
                    </div>
                </div>
            )}
        </>
    );
}

function PrivacyContent({ t }) {
    return (
        <div className="prose prose-sm max-w-none">
            <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-6">{t('legal.privacy.title')}</h2>
            <p className="font-mono text-xs text-foreground/50 uppercase mb-8">{t('legal.privacy.updated')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.who_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.who_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.what_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.what_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.why_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.why_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.processor_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.processor_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.rights_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.rights_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.privacy.contact_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.privacy.contact_text')}</p>
        </div>
    );
}

function TermsContent({ t }) {
    return (
        <div className="prose prose-sm max-w-none">
            <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight mb-6">{t('legal.terms.title')}</h2>
            <p className="font-mono text-xs text-foreground/50 uppercase mb-8">{t('legal.terms.updated')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.terms.use_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.terms.use_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.terms.content_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.terms.content_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.terms.liability_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.terms.liability_text')}</p>

            <h3 className="font-sans font-bold text-lg mt-6 mb-2">{t('legal.terms.changes_title')}</h3>
            <p className="text-foreground/80 leading-relaxed mb-4">{t('legal.terms.changes_text')}</p>
        </div>
    );
}
