import { memo } from 'react';

interface IconsTimeProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const IconsTime = memo(({ className = 'mr-2', width = 24, height = 24, color = 'currentColor' }: IconsTimeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
});

IconsTime.displayName = 'IconsTime';

export default IconsTime;