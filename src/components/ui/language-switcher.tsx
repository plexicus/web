import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages as LanguagesIcon } from 'lucide-react';
import { languages } from '@/i18n/ui';
export const LanguageSwitcher = ({ t }) => {
  // Save scroll position to localStorage before changing language
  const changeLanguage = (language) => {
    localStorage.setItem('scrollPosition', String(window?.scrollY));
    const currentPath = window.location.pathname;
    // Check if the current path already has a language prefix
    const currentLanguageMatch = currentPath.match(/^\/([a-z]{2})\//);

    // If a language prefix exists, replace it with the new language, otherwise add it
    const newPath = currentLanguageMatch
      ? currentPath.replace(/^\/[a-z]{2}\//, `/${language}/`)  // Replace existing language prefix
      : `/${language}${currentPath}`;  // Add language prefix for paths without one

    // Redirect to the new language path
    window.location.href = newPath;
  };
  
  // Restore scroll position after the page loads
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      localStorage.removeItem('scrollPosition');  // Clean up after restoring
    }
  }, []);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-white gap-3"><LanguagesIcon /> { t('nav.languages') }</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          { Object.entries(languages).map(([lang, label]) => (
            <DropdownMenuItem onClick={() => changeLanguage(lang)}>
              { label }
            </DropdownMenuItem>
          )) }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};