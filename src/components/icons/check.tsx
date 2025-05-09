import { memo } from 'react';

const IconsCheck = memo((attrs: Record<string, string>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...attrs}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
});

IconsCheck.displayName = 'IconsCheck';

export default IconsCheck;