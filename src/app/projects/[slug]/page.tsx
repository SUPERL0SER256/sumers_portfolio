import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Using the correct type signature for params in Next.js 15+ App Router
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <article className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Work
        </Link>
        
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl text-foreground/70">{project.description}</p>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-foreground/50">Category</span>
            <span className="text-lg font-medium">{project.category}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="aspect-[16/9] w-full bg-accent mb-16 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Links / Details */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
          {project.externalLink && (
            <a 
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors text-lg font-medium"
            >
              View Project <ExternalLink size={20} />
            </a>
          )}
          <p className="text-foreground/50 text-sm">
            Note: You can add more screenshots, process descriptions, or PDF embeds here by extending the project data structure!
          </p>
        </div>
      </article>
    </main>
  );
}
