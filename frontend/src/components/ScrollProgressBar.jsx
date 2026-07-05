import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
        restDelta: 0.001,
    });

    return <motion.div className="scroll-progress-bar" style={{ scaleX }} />;
}

export default ScrollProgressBar;
