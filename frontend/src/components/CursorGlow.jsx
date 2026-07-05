import { useEffect, useRef } from 'react';

// A soft radial glow that gently follows the pointer, purely decorative.
// Hidden automatically on touch devices via CSS (see .cursor-glow media query).
function CursorGlow() {
    const glowRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMove);

        let frame;
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.12;
            pos.current.y += (target.current.y - pos.current.y) * 0.12;
            if (glowRef.current) {
                glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}

export default CursorGlow;
