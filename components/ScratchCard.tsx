"use client";

import { useRef, useEffect, useState } from "react";
import styles from "@/styles/scratch-card.module.css";
import useScratchCanvas from "@/hooks/useScratchCanvas";
import Image from "next/image";

interface ScratchCardProps {
  overlayImage: string;
  couponImage: string;
  onRevealed: () => void;
  revealThreshold?: number; // Percentage of scratched area to trigger reveal (0-1)
}

export default function ScratchCard({ 
  overlayImage, 
  couponImage, 
  onRevealed,
  revealThreshold = 0.15 
}: ScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Using our custom hook for scratch functionality
  const { isRevealed } = useScratchCanvas({
    canvasRef,
    dimensions,
    isLoaded,
    revealThreshold,
    onRevealed,
  });

  // Set dimensions based on container size
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      // Get the actual rendered dimensions
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.scratchContainer}
    >
      <div className={styles.scratchCard}>
        <div className="relative w-full h-full bg-white rounded-xl overflow-hidden">
          {/* Gift Image (default view) */}
          <div className={`w-full h-full transition-opacity duration-500 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
            <Image
              src={overlayImage}
              alt="Gift Box"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
              priority
            />
          </div>

          {/* Coupon Image (revealed) */}
          <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src={couponImage}
              alt="Coupon Code"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
              onLoad={() => setIsLoaded(true)}
              priority
            />
          </div>

          {/* Scratch Overlay */}
          <div 
            className={`${styles.scratchOverlay} ${isRevealed ? styles.revealed : ''}`}
          >
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              className={styles.canvas}
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}