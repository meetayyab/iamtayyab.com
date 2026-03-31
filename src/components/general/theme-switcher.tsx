'use client';

import { useState, useEffect } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import IconButton from '@/components/general/icon-button';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme = 'dark', setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // until the UI is mounted, display a dummy icon
  if (!mounted) {
    return (
      <IconButton aria-label="Toggle theme">
        <Sun aria-hidden="true" />
      </IconButton>
    );
  }

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <MoonStar aria-hidden="true" />}
    </IconButton>
  );
};

export default ThemeSwitcher;

// Ref :: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
