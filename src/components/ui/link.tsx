// src/components/Link.tsx

import type { FC, ReactNode, MouseEventHandler } from 'react';
interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const Link: FC<LinkProps> = ({ href, children, className = '', target = '_self', rel = 'noopener noreferrer' }) => {
  // Optional: You can handle client-side navigation logic here if needed (SPA-like behavior)
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // If not opening in a new tab, intercept click for client-side navigation (similar to Next.js)
    if (target !== '_blank') {
      e.preventDefault();
      window.location.href = href; // Simple page navigation
    }
  };

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </a>
  );
};

export default Link;
