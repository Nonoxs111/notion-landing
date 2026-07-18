import { ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { label: 'Product', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-warm-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-coral flex items-center justify-center">
              <span className="text-white font-semibold text-xs">N</span>
            </div>
            <span className="font-serif text-lg font-semibold text-ink">Notion</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-ink-muted">
            &copy; 2026 Notion
          </p>
        </div>

        {/* Philosophy quote */}
        <div className="mt-10 pt-8 border-t border-border-light text-center">
          <p className="text-xs text-ink-muted tracking-wide uppercase">
            Democratize Software
          </p>
          <p className="mt-2 text-sm text-ink-secondary max-w-md mx-auto text-balance">
            Inspired by the belief that the ability to create software should belong to everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
