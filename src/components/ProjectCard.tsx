"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-4 relative"
    >
      <Link href={`/projects/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-accent">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
          <p className="text-sm text-foreground/60">{project.category}</p>
        </div>
        <Link 
          href={`/projects/${project.slug}`}
          className="text-sm border-b border-foreground/30 hover:border-foreground pb-0.5 transition-colors"
        >
          View Case
        </Link>
      </div>
    </motion.div>
  );
}
