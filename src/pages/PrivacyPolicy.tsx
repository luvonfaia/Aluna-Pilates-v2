import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/common/PageTransition';

export default function PrivacyPolicy() {
    const { i18n } = useTranslation();
    const isRo = i18n.language === 'ro';

    return (
        <PageTransition>
            <Helmet>
                <link rel="canonical" href="https://alunareformerstudio.ro/privacy" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen bg-aluna-alabaster pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Back */}
                        <Link
                            to="/"
                            className="inline-flex items-center text-aluna-stone/60 hover:text-aluna-gold text-[11px] uppercase tracking-[0.25em] font-medium transition-colors duration-200 mb-10"
                        >
                            {isRo ? '← Înapoi' : '← Back'}
                        </Link>

                        {/* Header */}
                        <div className="mb-12">
                            <div className="w-px h-12 bg-gradient-to-b from-transparent to-aluna-gold/50 mx-auto mb-8" />
                            <h1 className="font-serif italic text-4xl md:text-5xl text-aluna-charcoal text-center mb-3">
                                {isRo ? 'Politica de Confidențialitate' : 'Privacy Policy'}
                            </h1>
                            <p className="text-center text-aluna-stone/60 text-xs uppercase tracking-widest">
                                {isRo ? 'Ultima actualizare: Aprilie 2025' : 'Last updated: April 2025'}
                            </p>
                            <div className="w-px h-12 bg-gradient-to-b from-aluna-gold/50 to-transparent mx-auto mt-8" />
                        </div>

                        {isRo ? <RomanianContent /> : <EnglishContent />}

                        <div className="w-px h-12 bg-gradient-to-b from-aluna-gold/30 to-transparent mx-auto mt-16" />
                        <div className="flex justify-center mt-10">
                            <Link to="/" className="btn-primary">
                                Înapoi la pagina principală
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}

function RomanianContent() {
    return (
        <div className="space-y-10 text-aluna-stone leading-relaxed">
            <p className="text-base">
                Aluna Reformer Studio respectă confidențialitatea vizitatorilor și clienților săi. Această politică explică ce date cu caracter personal colectăm, de ce le colectăm și cum le protejăm.
            </p>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">1. Operatorul de Date</h2>
                <p className="text-sm">
                    Operatorul datelor cu caracter personal este <strong className="text-aluna-charcoal">Aluna Reformer Studio</strong>, cu sediul la Șos. Colentina nr. 16, bl. B3, parter ap. 07, București, România.
                    Contact: <a href="mailto:hello@alunareformerstudio.ro" className="text-aluna-gold hover:text-aluna-earth transition-colors">hello@alunareformerstudio.ro</a>
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">2. Date Colectate</h2>
                <p className="text-sm mb-3">Colectăm următoarele date cu caracter personal prin formularul de contact al site-ului:</p>
                <ul className="text-sm space-y-2 list-disc list-inside">
                    <li><strong className="text-aluna-charcoal">Nume</strong> — pentru a te putea adresa personalizat</li>
                    <li><strong className="text-aluna-charcoal">Adresă de e-mail</strong> — pentru a răspunde la cererea ta</li>
                    <li><strong className="text-aluna-charcoal">Număr de telefon</strong> (opțional) — pentru contact telefonic dacă este necesar</li>
                    <li><strong className="text-aluna-charcoal">Tipul de ședință de interes</strong> — pentru a-ți oferi informații relevante</li>
                </ul>
                <p className="text-sm mt-3">Nu colectăm date de plată, date despre localizare sau date sensibile în sensul Regulamentului GDPR.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">3. Scopul Prelucrării</h2>
                <p className="text-sm">Datele tale sunt utilizate exclusiv pentru:</p>
                <ul className="text-sm space-y-2 list-disc list-inside mt-2">
                    <li>Răspunderea la cererile și întrebările tale privind serviciile noastre</li>
                    <li>Programarea ședințelor de pilates la cererea ta</li>
                </ul>
                <p className="text-sm mt-3">Nu folosim datele tale în scopuri de marketing fără consimțământul tău explicit.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">4. Temeiul Legal</h2>
                <p className="text-sm">
                    Prelucrarea datelor se bazează pe <strong className="text-aluna-charcoal">consimțământul tău</strong> (Art. 6 alin. (1) lit. a din GDPR), exprimat prin bifarea casetei de acord și trimiterea formularului de contact.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">5. Destinatarii Datelor</h2>
                <p className="text-sm">
                    Datele transmise prin formular sunt procesate prin serviciul <strong className="text-aluna-charcoal">Formspree</strong> (formspree.io), un serviciu terț de procesare a formularelor. Formspree acționează ca un operator asociat și are propria politică de confidențialitate disponibilă la <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-aluna-gold hover:underline">formspree.io/legal/privacy-policy</a>.
                </p>
                <p className="text-sm mt-3">Nu vindem, închiriem sau transmitem datele tale altor terți în scopuri comerciale.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">6. Durata Păstrării Datelor</h2>
                <p className="text-sm">
                    Datele tale sunt păstrate atât timp cât este necesar pentru a răspunde cererii tale, dar nu mai mult de <strong className="text-aluna-charcoal">12 luni</strong> de la ultima interacțiune. La cerere, datele pot fi șterse anterior acestui termen.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">7. Drepturile Tale (GDPR)</h2>
                <p className="text-sm mb-3">În temeiul GDPR, ai dreptul la:</p>
                <ul className="text-sm space-y-2 list-disc list-inside">
                    <li><strong className="text-aluna-charcoal">Acces</strong> — să soliciți o copie a datelor pe care le deținem despre tine</li>
                    <li><strong className="text-aluna-charcoal">Rectificare</strong> — să corectezi datele inexacte</li>
                    <li><strong className="text-aluna-charcoal">Ștergere</strong> — să soliciți ștergerea datelor tale</li>
                    <li><strong className="text-aluna-charcoal">Restricționare</strong> — să limitezi prelucrarea datelor tale</li>
                    <li><strong className="text-aluna-charcoal">Portabilitate</strong> — să primești datele tale într-un format structurat</li>
                    <li><strong className="text-aluna-charcoal">Retragerea consimțământului</strong> — oricând, fără a afecta legalitatea prelucrărilor anterioare</li>
                </ul>
                <p className="text-sm mt-3">
                    Pentru exercitarea drepturilor, contactează-ne la: <a href="mailto:hello@alunareformerstudio.ro" className="text-aluna-gold hover:text-aluna-earth transition-colors">hello@alunareformerstudio.ro</a>
                </p>
                <p className="text-sm mt-2">
                    Ai dreptul să depui o plângere la <strong className="text-aluna-charcoal">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-aluna-gold hover:underline">www.dataprotection.ro</a>.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">8. Cookie-uri</h2>
                <p className="text-sm">
                    Pentru informații privind cookie-urile utilizate pe acest site, consultă{' '}
                    <a href="/cookie-policy" className="text-aluna-gold hover:text-aluna-earth transition-colors">Politica de Cookie-uri</a>.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">9. Modificări ale Politicii</h2>
                <p className="text-sm">
                    Ne rezervăm dreptul de a actualiza această politică periodic. Versiunea actualizată va fi disponibilă pe această pagină cu data revizuirii.
                </p>
            </section>
        </div>
    );
}

function EnglishContent() {
    return (
        <div className="space-y-10 text-aluna-stone leading-relaxed">
            <p className="text-base">
                Aluna Reformer Studio respects the privacy of its visitors and clients. This policy explains what personal data we collect, why we collect it, and how we protect it.
            </p>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">1. Data Controller</h2>
                <p className="text-sm">
                    The data controller is <strong className="text-aluna-charcoal">Aluna Reformer Studio</strong>, located at Șos. Colentina nr. 16, bl. B3, parter ap. 07, Bucharest, Romania.
                    Contact: <a href="mailto:hello@alunareformerstudio.ro" className="text-aluna-gold hover:text-aluna-earth transition-colors">hello@alunareformerstudio.ro</a>
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">2. Data Collected</h2>
                <p className="text-sm mb-3">We collect the following personal data through the website contact form:</p>
                <ul className="text-sm space-y-2 list-disc list-inside">
                    <li><strong className="text-aluna-charcoal">Name</strong> — to address you personally</li>
                    <li><strong className="text-aluna-charcoal">Email address</strong> — to respond to your inquiry</li>
                    <li><strong className="text-aluna-charcoal">Phone number</strong> (optional) — for phone contact if needed</li>
                    <li><strong className="text-aluna-charcoal">Session type of interest</strong> — to provide relevant information</li>
                </ul>
                <p className="text-sm mt-3">We do not collect payment data, location data, or sensitive data within the meaning of the GDPR.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">3. Purpose of Processing</h2>
                <p className="text-sm">Your data is used exclusively for:</p>
                <ul className="text-sm space-y-2 list-disc list-inside mt-2">
                    <li>Responding to your inquiries and questions about our services</li>
                    <li>Scheduling Pilates sessions at your request</li>
                </ul>
                <p className="text-sm mt-3">We do not use your data for marketing purposes without your explicit consent.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">4. Legal Basis</h2>
                <p className="text-sm">
                    Processing is based on your <strong className="text-aluna-charcoal">consent</strong> (Art. 6(1)(a) GDPR), expressed by ticking the agreement checkbox and submitting the contact form.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">5. Data Recipients</h2>
                <p className="text-sm">
                    Data submitted via the form is processed through <strong className="text-aluna-charcoal">Formspree</strong> (formspree.io), a third-party form processing service. Formspree acts as a co-processor with its own privacy policy available at <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-aluna-gold hover:underline">formspree.io/legal/privacy-policy</a>.
                </p>
                <p className="text-sm mt-3">We do not sell, rent, or transfer your data to other third parties for commercial purposes.</p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">6. Data Retention</h2>
                <p className="text-sm">
                    Your data is retained for as long as necessary to respond to your inquiry, but no longer than <strong className="text-aluna-charcoal">12 months</strong> from the last interaction. Data can be deleted earlier upon request.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">7. Your Rights (GDPR)</h2>
                <p className="text-sm mb-3">Under GDPR, you have the right to:</p>
                <ul className="text-sm space-y-2 list-disc list-inside">
                    <li><strong className="text-aluna-charcoal">Access</strong> — request a copy of the data we hold about you</li>
                    <li><strong className="text-aluna-charcoal">Rectification</strong> — correct inaccurate data</li>
                    <li><strong className="text-aluna-charcoal">Erasure</strong> — request deletion of your data</li>
                    <li><strong className="text-aluna-charcoal">Restriction</strong> — limit processing of your data</li>
                    <li><strong className="text-aluna-charcoal">Portability</strong> — receive your data in a structured format</li>
                    <li><strong className="text-aluna-charcoal">Withdraw consent</strong> — at any time, without affecting prior processing</li>
                </ul>
                <p className="text-sm mt-3">
                    To exercise your rights, contact us at: <a href="mailto:hello@alunareformerstudio.ro" className="text-aluna-gold hover:text-aluna-earth transition-colors">hello@alunareformerstudio.ro</a>
                </p>
                <p className="text-sm mt-2">
                    You have the right to lodge a complaint with the <strong className="text-aluna-charcoal">Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-aluna-gold hover:underline">www.dataprotection.ro</a>.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">8. Cookies</h2>
                <p className="text-sm">
                    For information about cookies used on this site, see our{' '}
                    <a href="/cookie-policy" className="text-aluna-gold hover:text-aluna-earth transition-colors">Cookie Policy</a>.
                </p>
            </section>

            <section>
                <h2 className="font-serif italic text-2xl text-aluna-charcoal mb-3">9. Policy Changes</h2>
                <p className="text-sm">
                    We reserve the right to update this policy periodically. The updated version will be available on this page with the revision date.
                </p>
            </section>
        </div>
    );
}
