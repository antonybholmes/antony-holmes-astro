import type { ColorMode } from '@/interfaces/color-mode'
import { Moon, Sun } from 'lucide-react'
import { useCallback, useEffect } from 'react'

export function ThemeToggle({ mode }: { mode?: ColorMode }) {
  const setInitialTheme = useCallback(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    setInitialTheme()
  }, [setInitialTheme])

  return (
    <button
      aria-label="Toggle Theme"
      title="Toggle Theme"
      onClick={toggleTheme}
      className="flex aspect-square h-5 w-5 cursor-pointer items-center justify-center"
    >
      <Sun
        className="dark:hidden data-[mode=dark]:text-white data-[mode=trans]:text-white"
        data-mode={mode}
      />
      <Moon
        className="hidden dark:inline data-[mode=dark]:text-white data-[mode=trans]:text-white"
        data-mode={mode}
      />
    </button>
  )
}
