"use client";

import { useRef, useEffect } from "react";
import { generateParticles } from "@/lib/scratch-utils";
import styles from "@/styles/particle-effect.module.css";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  startTime: number;
}

export default function ParticleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const gravity = 400;
    const particles: Particle[] = [];

    // Generate particle configurations
    const particleCount = 50;
    const colors = ["#ffeb3b", "#ff5722", "#03a9f4", "#4caf50", "#ffffff"];

    // Create and initialize particle elements
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = styles.particle;
      
      // Style the particle
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      
      particle.style.backgroundColor = color;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * width}px`;
      particle.style.top = `${Math.random() * height}px`;
      
      container.appendChild(particle);
      
      // Calculate physics properties
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 150 + 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      // Store particle with its properties
      particles.push({
        element: particle,
        x: parseFloat(particle.style.left),
        y: parseFloat(particle.style.top),
        vx,
        vy,
        startTime: performance.now(),
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function for all particles
    const animateParticles = (time: number) => {
      let hasActiveParticles = false;
      
      particles.forEach(particle => {
        const elapsedSeconds = (time - particle.startTime) / 1000;
        const lifetime = 1.5;
        
        if (elapsedSeconds < lifetime) {
          hasActiveParticles = true;
          
          // Calculate new position with physics
          const x = particle.x + particle.vx * elapsedSeconds;
          const y = particle.y + particle.vy * elapsedSeconds + 
                    0.5 * gravity * elapsedSeconds * elapsedSeconds;
          
          // Update DOM element
          particle.element.style.left = `${x}px`;
          particle.element.style.top = `${y}px`;
          particle.element.style.opacity = `${Math.max(0, 1 - elapsedSeconds / lifetime)}`;
        } else if (particle.element.parentNode) {
          // Remove completed particles
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      
      // Continue animation if we still have active particles
      if (hasActiveParticles) {
        requestAnimationFrame(animateParticles);
      }
    };
    
    // Start animation
    requestAnimationFrame(animateParticles);
    
    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className={styles.particleContainer}></div>;
}