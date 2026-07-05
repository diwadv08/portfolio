import { motion } from 'framer-motion';

function PageLoader({ label = 'Loading...' }) {
    return (
        <div className="page-loader d-flex flex-column align-items-center justify-content-center">
            <div className="loader-ring">
                <motion.span
                    className="loader-ring-arc"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                />
            </div>
            <motion.p
                className="mt-3 loader-label"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
            >
                {label}
            </motion.p>
        </div>
    );
}

export default PageLoader;
