"use client";

import { projects } from "@/data/projects";
import { FloatingProject } from "@/components/FloatingProject";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Extract unique categories for filtering
const CATEGORIES = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

// Bouncing screensaver physics layout
const BOUNCE_LAYOUT = [
  { initialX: 10, initialY: 10, velX: 1.5, velY: 1.0, phase: 0, baseScale: 0.8 },
  { initialX: 30, initialY: 40, velX: -1.2, velY: 1.3, phase: 1, baseScale: 1.0 },
  { initialX: 50, initialY: 20, velX: 1.4, velY: -1.1, phase: 2, baseScale: 0.9 },
  { initialX: 70, initialY: 60, velX: -1.1, velY: 1.4, phase: 3, baseScale: 0.8 },
  { initialX: 80, initialY: 10, velX: 1.3, velY: 1.2, phase: 4, baseScale: 0.7 },
  { initialX: 20, initialY: 80, velX: -1.5, velY: -1.0, phase: 5, baseScale: 0.85 },
  { initialX: 40, initialY: 50, velX: 1.1, velY: 1.5, phase: 6, baseScale: 0.7 },
  { initialX: 60, initialY: 30, velX: -1.4, velY: -1.2, phase: 0.5, baseScale: 1.0 },
  { initialX: 10, initialY: 70, velX: 1.2, velY: -1.4, phase: 1.5, baseScale: 0.9 },
  { initialX: 90, initialY: 40, velX: -1.3, velY: 1.1, phase: 2.5, baseScale: 0.85 },
  { initialX: 50, initialY: 80, velX: 1.5, velY: -1.3, phase: 3.5, baseScale: 0.7 },
  { initialX: 30, initialY: 10, velX: -1.1, velY: 1.2, phase: 4.5, baseScale: 1.2 },
  { initialX: 70, initialY: 20, velX: 1.4, velY: 1.4, phase: 5.5, baseScale: 1.2 },
  { initialX: 20, initialY: 50, velX: -1.2, velY: -1.5, phase: 0.8, baseScale: 1.2 },
  { initialX: 80, initialY: 70, velX: 1.3, velY: 1.1, phase: 1.8, baseScale: 1.2 },
  { initialX: 15, initialY: 85, velX: 1.6, velY: -1.0, phase: 2.2, baseScale: 1.1 },
  { initialX: 85, initialY: 15, velX: -1.4, velY: 1.6, phase: 3.3, baseScale: 0.9 },
  { initialX: 45, initialY: 75, velX: 1.1, velY: 1.7, phase: 4.4, baseScale: 1.0 },
  { initialX: 75, initialY: 45, velX: -1.7, velY: -1.1, phase: 0.2, baseScale: 0.8 },
  { initialX: 35, initialY: 25, velX: 1.5, velY: 1.3, phase: 1.4, baseScale: 1.2 },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [showDeployments, setShowDeployments] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full h-screen bg-background overflow-hidden selection:bg-foreground selection:text-background">
      
      {/* Mobile Warning Overlay */}
      <div className="md:hidden fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8 text-center border-[16px] border-foreground">
        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-foreground leading-none">
          Hold Up!
        </h2>
        <p className="text-sm font-bold tracking-widest text-foreground/70 uppercase">
          This portfolio will look garbage on your phone. <br/><br/>Please use a larger screen to view.
        </p>
      </div>

      {/* 1. Intro Screen */}
      <AnimatePresence>
        {!showProjects && !showAbout && !showWork && !showDeployments && !showContact && (
          <motion.div 
            key="intro"
            className="absolute inset-0 z-50 flex items-center justify-center bg-background p-6 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Marquee */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-5 rotate-[-5deg] md:rotate-[-2deg] scale-[1.5] gap-4 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="whitespace-nowrap flex text-[12vw] md:text-[8vw] font-black tracking-tighter uppercase text-foreground leading-none"
                  animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                  transition={{ duration: 60 + (i * 4), ease: "linear", repeat: Infinity }}
                >
                  <span>PRODUCT DESIGNER — DESIGN RESEARCHER — UI/UX DESIGNER — PRODUCT DESIGNER — DESIGN RESEARCHER — UI/UX DESIGNER — PRODUCT DESIGNER — DESIGN RESEARCHER — UI/UX DESIGNER — PRODUCT DESIGNER — DESIGN RESEARCHER — UI/UX DESIGNER — </span>
                </motion.div>
              ))}
            </div>

            <div 
              className="group relative flex flex-col items-center justify-center w-[90vw] md:w-[75vw] h-[70vh] md:h-[75vh] border-[16px] md:border-[24px] border-foreground hover:border-foreground/80 transition-colors cursor-pointer bg-background z-10"
              onClick={() => setShowProjects(true)}
            >
              <h1 className="text-5xl md:text-[7vw] font-bold tracking-tighter uppercase mb-4 md:mb-6 text-center leading-none">
                Sumer's Portfolio
              </h1>
              <p className="text-base md:text-2xl font-medium tracking-widest uppercase text-foreground/70 text-center px-4">
                Product Designer / Design Researcher
              </p>

              <span className="absolute bottom-6 md:bottom-12 text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                Click on the box
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Fixed UI Navigation */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-40 p-6 md:p-12 flex flex-col justify-between mix-blend-difference text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: showProjects ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase leading-none">Sumer Vaidya</h1>
              <p className="text-xs md:text-sm font-medium tracking-widest uppercase mt-2 opacity-70">
                Product Designer / Design Researcher
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowProjects(false)}
                className="text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/20 hover:bg-white hover:text-black transition-colors px-4 py-2 w-fit rounded-full flex items-center gap-2"
              >
                ← Back to Box
              </button>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase">
            <button 
              onClick={() => { setShowWork(true); setShowAbout(false); setShowDeployments(false); setShowProjects(false); setShowContact(false); }}
              className="hover:opacity-50 transition-opacity uppercase tracking-widest font-semibold"
            >
              Experience
            </button>
            <button 
              onClick={() => { setShowDeployments(true); setShowWork(false); setShowAbout(false); setShowProjects(false); setShowContact(false); }}
              className="hover:opacity-50 transition-opacity uppercase tracking-widest font-semibold"
            >
              Projects
            </button>
            <button 
              onClick={() => { setShowAbout(true); setShowWork(false); setShowDeployments(false); setShowProjects(false); setShowContact(false); }}
              className="hover:opacity-50 transition-opacity uppercase tracking-widest font-semibold"
            >
              About
            </button>
            <button 
              onClick={() => { setShowContact(true); setShowWork(false); setShowDeployments(false); setShowAbout(false); setShowProjects(false); }}
              className="hover:opacity-50 transition-opacity uppercase tracking-widest font-semibold"
            >
              Contact
            </button>
          </nav>
        </header>

        <footer className="flex justify-between items-end pointer-events-auto">
          <div className="text-xs font-semibold tracking-widest uppercase opacity-50">
            Interactive Exhibition
          </div>
          <div className="text-xs font-semibold tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
            {projects.length} Projects
          </div>
        </footer>
      </motion.div>

      {/* 3. Bouncing Canvas Layer */}
      <motion.div 
        className="fixed inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: showProjects ? 1 : 0 }}
        style={{ pointerEvents: showProjects ? "auto" : "none" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {projects.map((project, index) => {
          const bounce = BOUNCE_LAYOUT[index % BOUNCE_LAYOUT.length];
          
          return (
            <FloatingProject
              key={project.slug}
              project={project}
              index={index}
              initialX={bounce.initialX}
              initialY={bounce.initialY}
              velX={bounce.velX}
              velY={bounce.velY}
              phase={bounce.phase}
              baseScale={bounce.baseScale}
              isVisible={true}
            />
          );
        })}
      </motion.div>

      {/* 4. About Section */}
      <AnimatePresence>
        {showAbout && (
          <motion.div 
            key="about"
            className="absolute inset-0 z-[60] flex flex-col items-center justify-start bg-background p-6 md:p-24 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="max-w-4xl w-full flex flex-col items-start text-left space-y-8 mt-12 md:mt-0">
              <button 
                onClick={() => { setShowAbout(false); setShowProjects(true); }}
                className="text-xs font-bold tracking-widest uppercase border border-foreground/20 hover:bg-foreground hover:text-background transition-colors px-4 py-2 w-fit rounded-full flex items-center gap-2 mb-4"
              >
                ← Back to Canvas
              </button>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none border-b-4 border-foreground pb-4 w-full">
                About Me
              </h1>

              <div className="w-full flex justify-center my-4">
                <img 
                  src="/images/title_face.png" 
                  alt="Sumer Vaidya" 
                  className="w-full max-w-lg h-auto object-cover"
                />
              </div>
              
              <div className="space-y-8 text-lg md:text-2xl font-medium tracking-wide leading-relaxed text-foreground/80 mt-4 pb-24">
                <p>
                  Hey, I’m Sumer — a Product Designer, UI/UX Designer, and Design Researcher studying Design at IIT Roorkee.
                </p>
                <p>
                  I’m really into understanding why people do the things they do, how products fit into their lives, and how design can make those experiences better. A lot of my work starts with research, asking questions, finding patterns, and trying to understand the problem before jumping into making something.
                </p>
                <p>
                  I love working across product design, UI/UX, interaction design, and visual design. I’m especially interested in turning messy, complicated problems into simple and intuitive experiences.
                </p>
                <p>
                  I also like getting my hands dirty with technology. I’ve worked with things like React, JavaScript, Firebase, Supabase, Python, Blender, and C++, mostly because I enjoy understanding how the things I design actually work.
                </p>
                <p>
                  I’m constantly experimenting — whether that’s building an interactive website, designing a new product, researching how people make decisions, or just messing around with an idea that probably didn’t need to exist in the first place.
                </p>
                <p>
                  At the end of the day, I’m interested in people, products, and the systems connecting the two. I’m still figuring out exactly where that takes me, but I know I want to keep making, researching, and learning along the way.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Experience / Work Section */}
      <AnimatePresence>
        {showWork && (
          <motion.div 
            key="work"
            className="absolute inset-0 z-[60] flex flex-col items-center justify-start bg-background p-6 md:p-24 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="max-w-4xl w-full flex flex-col items-start text-left space-y-8 mt-12 md:mt-0">
              <button 
                onClick={() => { setShowWork(false); setShowProjects(true); }}
                className="text-xs font-bold tracking-widest uppercase border border-foreground/20 hover:bg-foreground hover:text-background transition-colors px-4 py-2 w-fit rounded-full flex items-center gap-2 mb-4"
              >
                ← Back to Canvas
              </button>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none border-b-8 border-foreground pb-8 w-full">
                Experience
              </h1>
              
              <div className="space-y-16 text-lg md:text-xl font-medium tracking-wide leading-relaxed text-foreground/80 mt-12 w-full pb-24">
                
                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">Kshiirsagar Apte Foundation — Ekatra Movement</h3>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-4">Brand & Identity Design</p>
                  <p className="mb-4">
                    Worked on the <strong className="text-foreground">rebranding of the Kshiirsagar Apte Foundation and its Ekatra movement in Mumbai</strong>, exploring how the organisation could communicate its identity, values, and work more clearly through design.
                  </p>
                  <p>
                    The project involved thinking beyond just a logo — looking at the broader visual language, communication, and identity of the movement and how it could translate across different touchpoints.
                  </p>
                </section>

                <hr className="border-foreground/10" />

                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">Future Factory — Mumbai</h3>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-4">Design Intern · 1 Month</p>
                  <p className="mb-4">
                    Spent a month at <strong className="text-foreground">Future Factory</strong>, working in a professional design environment and getting exposure to how design problems are approached outside of college.
                  </p>
                  <p>
                    The experience helped me understand the realities of working with clients, constraints, feedback, and iterations while developing my visual and problem-solving skills.
                  </p>
                </section>

                <hr className="border-foreground/10" />

                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">Global Impact Forum</h3>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-4">Website & Digital Experience Design</p>
                  <p className="mb-4">
                    Designed the <strong className="text-foreground">Global Impact Forum website</strong>, working on the digital experience and visual communication for an international forum connecting business, innovation, and impact.
                  </p>
                  <p>
                    My focus was on translating a large amount of information into a website that felt clear, engaging, and easy to navigate while still giving the forum a strong visual identity.
                  </p>
                </section>

                <hr className="border-foreground/10" />

                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">India Development Review (IDR)</h3>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-4">Design Intern</p>
                  <p className="mb-4">
                    Worked with <strong className="text-foreground">India Development Review</strong>, exploring design within the development and social-impact space.
                  </p>
                  <p>
                    The experience gave me a different perspective on design — particularly how research, communication, storytelling, and information design can be used to make complex social issues easier to understand and engage with.
                  </p>
                </section>

                <hr className="border-foreground/10" />

                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">SDSLabs — IIT Roorkee</h3>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-4">Design</p>
                  <p className="mb-4">
                    Worked with <strong className="text-foreground">SDSLabs at IIT Roorkee</strong>, contributing design thinking and visual/UI work within a highly technical environment.
                  </p>
                  <p>
                    It was an opportunity to work alongside developers and explore the intersection of <strong className="text-foreground">design and technology</strong>, while getting more comfortable with designing for digital products and actually understanding how those products are built.
                  </p>
                </section>

                <hr className="border-foreground/10" />

                <section className="bg-foreground/5 p-8 rounded-2xl border border-foreground/10">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">What ties it all together</h3>
                  <p className="mb-4">
                    Across these experiences, I've ended up working on pretty different kinds of problems — <strong className="text-foreground">branding, websites, digital products, social-impact communication, and technology</strong>.
                  </p>
                  <p className="mb-4">
                    But the part I enjoy most is usually the same: <strong className="text-foreground">figuring out the problem first</strong>.
                  </p>
                  <p>
                    I like researching, talking to people, finding patterns, understanding why something isn't working, and then using design to make sense of it. That's probably why I’ve gradually found myself leaning more toward <strong className="text-foreground">product design, UI/UX, and design research</strong> rather than thinking of design as just making things look good.
                  </p>
                </section>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Deployments Section */}
      <AnimatePresence>
        {showDeployments && (
          <motion.div 
            key="deployments"
            className="absolute inset-0 z-[60] flex flex-col items-center justify-start bg-background p-6 md:p-24 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className={`w-full flex flex-col items-start text-left space-y-8 mt-12 md:mt-0 ${isGridView ? 'max-w-7xl' : 'max-w-4xl'}`}>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Contact Section */}
      <AnimatePresence>
        {showContact && (
          <motion.div 
            key="contact"
            className="absolute inset-0 z-[60] flex flex-col items-center justify-start bg-background p-6 md:p-24 overflow-y-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="max-w-4xl w-full flex flex-col items-start text-left space-y-8 mt-12 md:mt-0 h-full justify-center">
              <button 
                onClick={() => { setShowContact(false); setShowProjects(true); }}
                className="text-xs font-bold tracking-widest uppercase border border-foreground/20 hover:bg-foreground hover:text-background transition-colors px-4 py-2 w-fit rounded-full flex items-center gap-2 mb-4 absolute top-6 md:top-24 left-6 md:left-24"
              >
                ← Back to Projects
              </button>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none border-b-8 border-foreground pb-8 w-full mb-12">
                Contact Me
              </h1>
              
              <div className="flex flex-col gap-12 w-full mt-12">
                <div>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-2">mobile no.</p>
                  <a href="tel:8828291021" className="text-3xl md:text-5xl font-bold text-foreground hover:opacity-70 transition-opacity">
                    8828291021
                  </a>
                </div>

                <div>
                  <p className="text-sm tracking-widest uppercase font-bold text-foreground/50 mb-2">email address</p>
                  <a href="mailto:sumervaidya123@gmail.com" className="text-3xl md:text-5xl font-bold text-foreground hover:opacity-70 transition-opacity">
                    sumervaidya123@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
