"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Project } from "@/data/projects";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FloatingProjectProps {
  project: Project;
  index: number;
  initialX: number;
  initialY: number;
  velX: number;
  velY: number;
  phase: number;
  baseScale: number;
  isVisible: boolean;
}

export function FloatingProject({ project, initialX, initialY, velX, velY, phase, baseScale, isVisible }: FloatingProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Global state
  const hoveredProject = useStore((state) => state.hoveredProject);
  const setHoveredProject = useStore((state) => state.setHoveredProject);

  // Derived state
  const isHovered = hoveredProject === project.slug;
  const isSomeoneHovered = hoveredProject !== null;
  const isDimmed = isSomeoneHovered && !isHovered;

  // Performant motion values
  const x = useMotionValue(-1000); 
  const y = useMotionValue(-1000);
  const scale = useMotionValue(baseScale);
  const blur = useMotionValue(0);
  const opacity = useMotionValue(0);
  const zIndex = useMotionValue(10);
  
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: velX, y: velY });
  const initialized = useRef(false);
  const isHoveredRef = useRef(isHovered);
  const isSomeoneHoveredRef = useRef(isSomeoneHovered);
  const isVisibleRef = useRef(isVisible);

  // Initialize precise pixel positions on mount so resize doesn't break
  useEffect(() => {
    posRef.current.x = (window.innerWidth * initialX) / 100;
    posRef.current.y = (window.innerHeight * initialY) / 100;
    x.set(posRef.current.x);
    y.set(posRef.current.y);
    opacity.set(1);
    initialized.current = true;
  }, [initialX, initialY, x, y, opacity]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    isSomeoneHoveredRef.current = isSomeoneHovered;
    isVisibleRef.current = isVisible;
    
    // Smoothly apply state overrides
    if (!isVisible) {
      blur.set(12);
      opacity.set(0);
      zIndex.set(-1);
    } else if (isDimmed) {
      blur.set(6);
      opacity.set(0.15);
      zIndex.set(5);
    } else if (isHovered) {
      blur.set(0);
      opacity.set(1);
      zIndex.set(50);
      scale.set(baseScale + 0.4);
    } else {
      blur.set(0);
      opacity.set(1);
      zIndex.set(10);
      scale.set(baseScale);
    }
  }, [isHovered, isDimmed, isVisible, blur, opacity, zIndex, scale, baseScale]);

  useAnimationFrame((t, delta) => {
    if (!initialized.current || !containerRef.current || isHoveredRef.current) return;
    
    // Smooth, slightly faster movement (delta / 20)
    const timeScale = delta / 20; 
    let { x: currentX, y: currentY } = posRef.current;
    let { x: vx, y: vy } = velRef.current;
    
    currentX += vx * timeScale;
    currentY += vy * timeScale;
    
    const rect = containerRef.current.getBoundingClientRect();
    if (currentX + rect.width > window.innerWidth) {
      currentX = window.innerWidth - rect.width;
      vx *= -1;
    } else if (currentX < 0) {
      currentX = 0;
      vx *= -1;
    }
    
    if (currentY + rect.height > window.innerHeight) {
      currentY = window.innerHeight - rect.height;
      vy *= -1;
    } else if (currentY < 0) {
      currentY = 0;
      vy *= -1;
    }
    
    posRef.current = { x: currentX, y: currentY };
    velRef.current = { x: vx, y: vy };
    
    x.set(currentX);
    y.set(currentY);
  });

  const handleMouseEnter = () => setHoveredProject(project.slug);
  const handleMouseLeave = () => setHoveredProject(null);

  return (
    <motion.div
      ref={containerRef}
      className={cn("absolute top-0 left-0 group cursor-pointer transition-opacity duration-1000", !isVisible && "pointer-events-none")}
      style={{ x, y, scale, zIndex, opacity }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/projects/${project.slug}`} className="block relative">
        <motion.div 
          className="relative overflow-hidden bg-accent shadow-2xl transition-all duration-700"
          style={{ filter: useMotionValue(`blur(${blur.get()}px)`) }}
        >
          {/* Slightly larger base images */}
          <img
            src={project.image}
            alt={project.title}
            className="w-[170px] md:w-[220px] h-auto object-cover transition-all duration-700 pointer-events-none"
          />
        </motion.div>
        
        {/* Hover Info */}
        <motion.div 
          className="absolute -bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered && isVisible ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-bold tracking-tight whitespace-nowrap px-3 py-1 bg-background text-foreground shadow-lg border border-foreground/10">
            {project.title}
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase mt-1 px-2 py-0.5 bg-background/90 text-foreground backdrop-blur-sm border border-foreground/10">
            {project.category}
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
