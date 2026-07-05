import { motion, AnimatePresence } from 'framer-motion';

function SitePreloader({ visible }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="site-preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="site-preloader-inner">
                        <motion.div
                            className="site-preloader-logo"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            D
                        </motion.div>

                        <div className="site-preloader-bar-track">
                            <motion.div
                                className="site-preloader-bar-fill"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                            />
                        </div>

                        <motion.p
                            className="site-preloader-text"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.9 }}
                        >
                            Loading portfolio...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SitePreloader;
