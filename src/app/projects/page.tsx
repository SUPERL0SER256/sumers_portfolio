"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

export default function DeploymentsPage() {
  const [mounted, setMounted] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen bg-background selection:bg-foreground selection:text-background flex flex-col items-center justify-start p-6 md:p-24">
      
      <motion.div 
        className={`w-full flex flex-col items-start text-left space-y-8 mt-12 md:mt-0 ${isGridView ? 'max-w-7xl' : 'max-w-4xl'}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setIsGridView(!isGridView)}
            className="text-xs font-bold tracking-widest uppercase border border-foreground/20 hover:bg-foreground hover:text-background transition-colors px-4 py-2 rounded-full flex items-center gap-2"
          >
            {isGridView ? '≡ List View' : '⊞ Grid View'}
          </button>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none border-b-8 border-foreground pb-8 w-full mb-12">
          Projects
        </h1>
        
        <div className={`w-full mt-4 pb-24 ${isGridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12' : 'flex flex-col gap-24'}`}>
          
          {projects
            .filter(project => !['zomato', 'spotify', 'lamp-poster', '25151017-sumer-vaidya'].includes(project.slug))
            .sort((a, b) => {
              const websiteSlugs = ['janus-system', 'indian-glyph-webcam', 'tgif', 'human-nature'];
              const aIsWebsite = websiteSlugs.includes(a.slug);
              const bIsWebsite = websiteSlugs.includes(b.slug);
              
              const aIsPdp = a.slug === 'pdp';
              const bIsPdp = b.slug === 'pdp';
              
              const aIsBehance = a.externalLink?.includes('behance.net') || false;
              const bIsBehance = b.externalLink?.includes('behance.net') || false;

              if (aIsWebsite && !bIsWebsite) return -1;
              if (!aIsWebsite && bIsWebsite) return 1;
              if (aIsWebsite && bIsWebsite) return websiteSlugs.indexOf(a.slug) - websiteSlugs.indexOf(b.slug);
              
              if (aIsPdp && !bIsPdp) return -1;
              if (!aIsPdp && bIsPdp) return 1;
              
              if (aIsBehance && !bIsBehance) return -1;
              if (!aIsBehance && bIsBehance) return 1;
              return 0;
            })
            .map(project => (
              <div key={project.slug} className="flex flex-col group">
                <h3 className={`font-bold text-foreground tracking-tight uppercase ${isGridView ? 'text-2xl md:text-3xl mb-2' : 'text-3xl md:text-5xl mb-4'}`}>{project.title}</h3>
                {project.externalLink && (
                  <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className={`font-medium tracking-wide underline underline-offset-8 hover:opacity-50 transition-opacity w-fit break-all ${isGridView ? 'text-sm md:text-lg mb-4' : 'text-lg md:text-2xl mb-8'}`}>
                    {project.externalLink.replace(/^https?:\/\/(www\.)?/, '')} ↗
                  </a>
                )}
                <div className="w-full h-full overflow-hidden bg-accent">
                  <img src={project.image} alt={project.title} className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isGridView ? 'h-full aspect-video md:aspect-[4/3]' : 'h-auto'}`} />
                </div>
              </div>
            ))
          }

          {/* Behance */}
          <div className={`flex flex-col group ${isGridView ? 'col-span-1 md:col-span-2 lg:col-span-3 mt-12 pt-12 border-t border-foreground/10' : 'mt-12 pt-12 border-t border-foreground/10'}`}>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 uppercase">More on Behance</h3>
            <a href="https://www.behance.net/sumervaidya" target="_blank" rel="noopener noreferrer" className="text-lg md:text-2xl font-medium tracking-wide underline underline-offset-8 hover:opacity-50 transition-opacity mb-8 w-fit">
              behance.net/sumervaidya ↗
            </a>
            <a href="https://www.behance.net/sumervaidya" target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden bg-accent block">
              <img src="/images/behance.png" alt="Behance Profile" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
            </a>
          </div>

        </div>
      </motion.div>
    </main>
  );
}
