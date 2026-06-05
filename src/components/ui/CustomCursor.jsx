'use client';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const trailRef = useRef([]);
  const ripplesRef = useRef([]);
  const [visible, setVisible] = useState(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize trail points
    const TRAIL_LENGTH = 28;
    trailRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -200,
      y: -200,
    }));

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverStart = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover], input, textarea, [role="button"]');
      if (el) hoveringRef.current = true;
    };
    const onHoverEnd = () => { hoveringRef.current = false; };

    const onClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 0.65,
        speed: 2.5,
      });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);
    window.addEventListener('click', onClick);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const trail = trailRef.current;
      const target = mouseRef.current;
      const isHovering = hoveringRef.current;

      // Trail follows mouse with lag
      trail[0].x += (target.x - trail[0].x) * 0.38;
      trail[0].y += (target.y - trail[0].y) * 0.38;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.22;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.22;
      }

      // ── Fluid trail (two passes: glow + sharp) ───────────────
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length - 1; i++) {
          const mx = (trail[i].x + trail[i + 1].x) / 2;
          const my = (trail[i].y + trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, mx, my);
        }
        const last = trail.length - 1;
        ctx.lineTo(trail[last].x, trail[last].y);

        const grad = ctx.createLinearGradient(
          trail[0].x, trail[0].y,
          trail[last].x, trail[last].y
        );

        if (pass === 0) {
          grad.addColorStop(0, `hsla(200, 100%, 78%, 0.5)`);
          grad.addColorStop(0.5, `hsla(205, 90%, 68%, 0.22)`);
          grad.addColorStop(1, `hsla(210, 80%, 60%, 0.0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isHovering ? 8 : 5.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.filter = 'blur(5px)';
          ctx.stroke();
          ctx.filter = 'none';
        } else {
          grad.addColorStop(0, `hsla(195, 100%, 90%, 0.92)`);
          grad.addColorStop(0.4, `hsla(205, 95%, 74%, 0.55)`);
          grad.addColorStop(1, `hsla(215, 85%, 65%, 0.0)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isHovering ? 2.5 : 1.8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // ── Droplets along the trail ──────────────────────────────
      [5, 11, 17, 23].forEach((idx) => {
        if (idx >= trail.length) return;
        const pt = trail[idx];
        const life = 1 - idx / trail.length;
        const pulse = 0.72 + 0.28 * Math.sin(frame * 0.09 + idx * 1.3);
        const r = (1.2 + life * 2.8) * pulse;

        // Soft glow behind droplet
        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 4);
        glow.addColorStop(0, `hsla(200, 100%, 82%, ${life * 0.45})`);
        glow.addColorStop(1, `hsla(210, 100%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Droplet core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(198, 100%, 88%, ${life * 0.75})`;
        ctx.fill();
      });

      // ── Cursor head orb ───────────────────────────────────────
      const hx = trail[0].x;
      const hy = trail[0].y;
      const headR = isHovering
        ? 10 + 1.5 * Math.sin(frame * 0.07)
        : 6.5 + 0.8 * Math.sin(frame * 0.07);

      // Wide outer glow
      const outerGlow = ctx.createRadialGradient(hx, hy, 0, hx, hy, headR * 4.5);
      outerGlow.addColorStop(0, `hsla(200, 100%, 80%, 0.3)`);
      outerGlow.addColorStop(0.6, `hsla(210, 100%, 70%, 0.1)`);
      outerGlow.addColorStop(1, `hsla(220, 100%, 65%, 0)`);
      ctx.beginPath();
      ctx.arc(hx, hy, headR * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Orb body with water-like radial gradient
      const orbGrad = ctx.createRadialGradient(
        hx - headR * 0.32, hy - headR * 0.32, headR * 0.05,
        hx, hy, headR
      );
      orbGrad.addColorStop(0, `hsla(192, 100%, 93%, 0.97)`);
      orbGrad.addColorStop(0.45, `hsla(203, 96%, 74%, 0.88)`);
      orbGrad.addColorStop(0.8, `hsla(213, 90%, 60%, 0.75)`);
      orbGrad.addColorStop(1, `hsla(220, 85%, 52%, 0.6)`);
      ctx.beginPath();
      ctx.arc(hx, hy, headR, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();

      // Specular highlight (top-left shine)
      ctx.beginPath();
      ctx.arc(hx - headR * 0.3, hy - headR * 0.3, headR * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.fill();

      // Tiny secondary highlight
      ctx.beginPath();
      ctx.arc(hx + headR * 0.2, hy - headR * 0.15, headR * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

      // ── Click ripples ─────────────────────────────────────────
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0.012);
      ripplesRef.current.forEach((rip) => {
        rip.radius += rip.speed;
        rip.speed *= 0.965;
        rip.alpha *= 0.905;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(200, 100%, 80%, ${rip.alpha * 0.65})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.radius > 10) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(210, 100%, 88%, ${rip.alpha * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    />
  );
}