import React, { useEffect, useRef } from 'react';

export default function MatrixRain({ opacity = 0.22, intensity = 'normal' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Characters: Binary numbers, Hex digits, Cryptographic glyphs & cyber tokens
    const characters = '01010110100101010111001010123456789ABCDEF0xλπΩΔΨ§Σ⊕⊗';
    const charArray = characters.split('');

    const fontSize = 14;
    let columns = 0;
    let drops = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        // Random starting Y position above screen or scattered
        drops[i] = Math.floor(Math.random() * -50);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Render loop
    let lastTime = 0;
    const interval = 38; // ~26 FPS for authentic retro hacker terminal speed

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;

      // Semi-transparent black/emerald clear to create authentic fading linear trails
      ctx.fillStyle = 'rgba(6, 19, 19, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", Consolas, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading head character glows bright white-turquoise
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f2c3';
        ctx.fillText(text, x, y);

        // Trail characters in emerald-green
        ctx.fillStyle = '#00f2c3';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00f2c3';
        ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - fontSize);

        ctx.fillStyle = '#059669';
        ctx.shadowBlur = 0;
        ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - (fontSize * 2));

        // Reset drop to top once it leaves bottom edge
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment linear flow downwards
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity }}
    />
  );
}
