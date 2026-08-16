import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl tracking-tighter uppercase">
          Sumer
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="#work" className="hover:underline underline-offset-4">Work</Link>
          <Link href="#about" className="hover:underline underline-offset-4">About</Link>
        </div>
      </div>
    </nav>
  );
}
