import type { FC, ReactNode, MouseEventHandler } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>; // Add onClick here
}

const Link: FC<LinkProps> = ({ href, children, className = '', target = '_self', rel = 'noopener noreferrer', onClick }) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // If not opening in a new tab, intercept click for client-side navigation (SPA-like behavior)
    if (target !== '_blank') {
      e.preventDefault();
      window.location.href = href; // Simple page navigation
    }
    // Call the onClick handler if provided
    if (onClick) {
      onClick(e); // Optional: You can call a custom onClick handler if passed
    }
  };

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick} // Attach the handleClick function here
      aria-label={typeof children === 'string' ? children : undefined}
    >
      { children }
    </a>
  );
};

export default Link;
