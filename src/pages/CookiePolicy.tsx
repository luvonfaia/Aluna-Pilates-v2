import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';

interface CookieEntry {
    name: string;
    purpose: string;
    type: string;
    duration: string;
}

export default function CookiePolicy() {
    const { t } = useTranslation();
    const cookies = t('cookie_policy.cookies', { returnObjects: true }) as CookieEntry[];

    return (
        <PageTransition>
            <div className="min-h-screen bg-aluna-alabaster pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Back link */}
                        <Link
                            to="/"
                            className="inline-flex items-center text-aluna-stone/60 hover:text-aluna-gold text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-200 mb-10"
                        >
                            {t('cookie_policy.back')}
                        </Link>

                        {/* Header */}
                        <div className="mb-12">
                            <div className="w-px h-12 bg-gradient-to-b from-transparent to-aluna-gold/50 mx-auto mb-8" />
                            <h1 className="font-serif italic text-4xl md:text-5xl text-aluna-charcoal text-center mb-3">
                                {t('cookie_policy.title')}
                            </h1>
                            <p className="text-center text-aluna-stone/60 text-xs uppercase tracking-widest">
                                {t('cookie_policy.last_updated')}
                            </p>
                            <div className="w-px h-12 bg-gradient-to-b from-aluna-gold/50 to-transparent mx-auto mt-8" />
                        </div>

                        <div className="space-y-10 text-aluna-stone leading-relaxed">
                            {/* Intro */}
                            <p className="text-base">{t('cookie_policy.intro')}</p>

                            {/* What are cookies */}
                            <section>
                                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">
                                    {t('cookie_policy.what_title')}
                                </h2>
                                <p className="text-sm">{t('cookie_policy.what_body')}</p>
                            </section>

                            {/* Cookies we use */}
                            <section>
                                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">
                                    {t('cookie_policy.we_use_title')}
                                </h2>
                                <p className="text-sm mb-6">{t('cookie_policy.we_use_intro')}</p>

                                {/* Table — responsive */}
                                <div className="overflow-x-auto rounded border border-aluna-charcoal/10">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-aluna-cream text-aluna-charcoal">
                                                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest border-b border-aluna-charcoal/10">
                                                    {t('cookie_policy.table.name')}
                                                </th>
                                                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest border-b border-aluna-charcoal/10">
                                                    {t('cookie_policy.table.purpose')}
                                                </th>
                                                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest border-b border-aluna-charcoal/10 whitespace-nowrap">
                                                    {t('cookie_policy.table.type')}
                                                </th>
                                                <th className="text-left px-4 py-3 font-medium text-xs uppercase tracking-widest border-b border-aluna-charcoal/10 whitespace-nowrap">
                                                    {t('cookie_policy.table.duration')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cookies.map((cookie, i) => (
                                                <tr
                                                    key={cookie.name}
                                                    className={i % 2 === 0 ? 'bg-white' : 'bg-aluna-alabaster'}
                                                >
                                                    <td className="px-4 py-3 font-mono text-xs text-aluna-charcoal align-top whitespace-nowrap">
                                                        {cookie.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-aluna-stone align-top">
                                                        {cookie.purpose}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-aluna-stone align-top whitespace-nowrap">
                                                        {cookie.type}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-aluna-stone align-top whitespace-nowrap">
                                                        {cookie.duration}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Your rights */}
                            <section>
                                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">
                                    {t('cookie_policy.rights_title')}
                                </h2>
                                <p className="text-sm">{t('cookie_policy.rights_body')}</p>
                            </section>

                            {/* How to manage */}
                            <section>
                                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">
                                    {t('cookie_policy.manage_title')}
                                </h2>
                                <p className="text-sm">{t('cookie_policy.manage_body')}</p>
                            </section>

                            {/* Contact */}
                            <section>
                                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">
                                    {t('cookie_policy.contact_title')}
                                </h2>
                                <p className="text-sm mb-2">{t('cookie_policy.contact_body')}</p>
                                <a
                                    href="mailto:hello@alunareformerstudio.ro"
                                    className="text-sm text-aluna-gold hover:text-aluna-earth transition-colors duration-200"
                                >
                                    hello@alunareformerstudio.ro
                                </a>
                            </section>
                        </div>

                        <div className="w-px h-12 bg-gradient-to-b from-aluna-gold/30 to-transparent mx-auto mt-16" />

                        {/* Return home button */}
                        <div className="flex justify-center mt-10">
                            <Link to="/" className="btn-primary">
                                {t('cookie_policy.return_home')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
