import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';

export default function Contact() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        // EmailJS integration would go here
        alert(t('contact.form.success'));
    };

    return (
        <PageTransition>
            <div>
                <section className="bg-aluna-alabaster py-[60px] text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-serif text-aluna-charcoal mb-4">{t('contact.title')}</h1>
                        <p className="text-aluna-stone font-light">{t('contact.subtitle')}</p>
                    </motion.div>
                </section>

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-3xl font-serif text-aluna-charcoal mb-8">{t('contact.visit.title')}</h2>
                                <div className="space-y-8 text-aluna-stone font-light">
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-aluna-charcoal mb-2">{t('contact.visit.address')}</h3>
                                        <p>Strada Munților 4, Sector 6<br />București, România</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-aluna-charcoal mb-2">{t('contact.visit.hours')}</h3>
                                        <p>{t('contact.visit.mon_fri')}: 07:00 - 20:00<br />{t('contact.visit.sat_sun')}: 09:00 - 16:00</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm uppercase tracking-widest text-aluna-charcoal mb-2">{t('contact.visit.contact')}</h3>
                                        <p>hello@alunastudio.com<br />+49 123 456 7890</p>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                {/* Map Integration */}
                                <div className="mt-12 w-full h-64 bg-aluna-stone/10 rounded-sm overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.647738276686!2d26.02324417666244!3d44.4370217710777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2019ea8369399%3A0x629530467554972!2sStrada%20Mun%C8%9Bilor%204%2C%20Bucure%C8%99ti%20060933!5e0!3m2!1sen!2sro!4v1707567890123!5m2!1sen!2sro"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="ALUNA Reformer Studio Location"
                                    ></iframe>
                                </div>
                            </motion.div>

                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-aluna-cream p-10 md:p-12 rounded-sm"
                            >
                                <h2 className="text-2xl font-serif text-aluna-charcoal mb-8">{t('contact.form.title')}</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-aluna-stone mb-2">{t('contact.form.name')}</label>
                                        <input
                                            {...register("name", { required: true })}
                                            className="w-full bg-white border-none p-4 text-aluna-charcoal focus:ring-1 focus:ring-aluna-gold transition-all"
                                            placeholder={t('contact.form.placeholder_name')}
                                        />
                                        {errors.name && <span className="text-red-400 text-xs mt-1">{t('contact.form.required')}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-aluna-stone mb-2">{t('contact.form.email')}</label>
                                        <input
                                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                            className="w-full bg-white border-none p-4 text-aluna-charcoal focus:ring-1 focus:ring-aluna-gold transition-all"
                                            placeholder={t('contact.form.placeholder_email')}
                                        />
                                        {errors.email && <span className="text-red-400 text-xs mt-1">{t('contact.form.email_required')}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-aluna-stone mb-2">{t('contact.form.message')}</label>
                                        <textarea
                                            {...register("message", { required: true })}
                                            rows={4}
                                            className="w-full bg-white border-none p-4 text-aluna-charcoal focus:ring-1 focus:ring-aluna-gold transition-all"
                                            placeholder={t('contact.form.placeholder_message')}
                                        />
                                        {errors.message && <span className="text-red-400 text-xs mt-1">{t('contact.form.required')}</span>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-primary w-full"
                                    >
                                        {t('contact.form.submit')}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
