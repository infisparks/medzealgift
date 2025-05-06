"use client";

import { useRef, useEffect, useState, MutableRefObject } from "react";
import { calculateScratchPercentage } from "@/lib/scratch-utils";

interface UseScratchCanvasProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  dimensions: { width: number; height: number };
  isLoaded: boolean;
  revealThreshold: number;
  onRevealed: () => void;
}

interface Position {
  x: number;
  y: number;
}

export default function useScratchCanvas({
  canvasRef,
  dimensions,
  isLoaded,
  revealThreshold,
  onRevealed,
}: UseScratchCanvasProps) {
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const lastPosRef = useRef<Position | null>(null);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);
  const checkProgressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize canvas and draw overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || !isLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with proper pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * pixelRatio;
    canvas.height = dimensions.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    // Create and load overlay image
    const overlayImage = new Image();
    overlayImage.src = "/gift.png";
    overlayImageRef.current = overlayImage;

    overlayImage.onload = () => {
      if (!ctx) return;
      drawOverlay(ctx, dimensions);
    };

    return () => {
      // Clean up
      if (checkProgressTimeoutRef.current) {
        clearTimeout(checkProgressTimeoutRef.current);
      }
    };
  }, [dimensions, isLoaded]);

  // Draw the overlay image
  const drawOverlay = (
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number }
  ) => {
    const overlayImage = overlayImageRef.current;
    if (!overlayImage) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      overlayImage,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    ctx.restore();
    
    // Set composite operation to "clear" the scratched areas
    ctx.globalCompositeOperation = "destination-out";
  };

  // Handle scratch position
  const getScratchPos = (
    event: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ): Position => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ((event as TouchEvent).touches) {
      const touchEvent = event as TouchEvent;
      clientX = touchEvent.touches[0].clientX;
      clientY = touchEvent.touches[0].clientY;
    } else {
      const mouseEvent = event as MouseEvent;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Scratch at a position
  const scratch = (
    ctx: CanvasRenderingContext2D,
    pos: Position,
    dimensions: { width: number; height: number }
  ) => {
    if (isRevealed) return;

    // Size scratch radius based on canvas size (larger on bigger screens)
    const scratchRadius = Math.min(dimensions.width, dimensions.height) * 0.05;
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, scratchRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Check scratch progress
  const checkScratchProgress = () => {
    if (isRevealed) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (checkProgressTimeoutRef.current) {
      clearTimeout(checkProgressTimeoutRef.current);
    }

    checkProgressTimeoutRef.current = setTimeout(() => {
      const scratchedPercentage = calculateScratchPercentage(ctx, canvas.width, canvas.height);
      
      if (scratchedPercentage >= revealThreshold) {
        setIsRevealed(true);
        onRevealed();
      }
    }, 50);
  };

  // Set up event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handler functions
    const handleStart = (event: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      
      setIsScratching(true);
      lastPosRef.current = getScratchPos(event, canvas);
      
      if (lastPosRef.current) {
        scratch(ctx, lastPosRef.current, dimensions);
      }
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isScratching || isRevealed) return;
      event.preventDefault();
      
      const currentPos = getScratchPos(event, canvas);
      
      if (lastPosRef.current) {
        // Draw a line between last position and current for smooth scratching
        const scratchRadius = Math.min(dimensions.width, dimensions.height) * 0.05;
        
        ctx.beginPath();
        ctx.lineWidth = scratchRadius * 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
      }
      
      lastPosRef.current = currentPos;
    };

    const handleEnd = () => {
      if (!isScratching || isRevealed) return;
      
      setIsScratching(false);
      lastPosRef.current = null;
      checkScratchProgress();
    };

    // Add event listeners
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleEnd);

    // Clean up event listeners
    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
    };
  }, [isScratching, isRevealed, dimensions]);

  return {
    isRevealed,
  };
}