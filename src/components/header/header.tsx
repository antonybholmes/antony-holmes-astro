import { VCenterRow } from '@components/layout/v-center-row'

import { MENU_ITEMS } from '@/consts'
import type { ColorMode } from '@/interfaces/color-mode'
import { cn } from '@/lib/shadcn-utils'

import type { IClassProps } from '@/interfaces/class-props'
import { Rss } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ContentDiv } from '../layout/content-div'
import { BaseLink } from '../link/base-link'
import { ThemeToggle } from '../theme-toggle'
import { HeaderLink } from './header-link'
import { Logo } from './logo'

const MAX_BLUR = 20
const RSS_CLS = `h-5 w-5 trans-color aspect-square
  data-[mode=dark]:text-white data-[mode=trans]:text-white 
  data-[mode=light]:group-hover:text-orange-400 data-[mode=dark]:group-hover:text-orange-400`

interface Props extends IClassProps {
  tab?: string
  mode?: ColorMode
}

export function Header({ tab = 'Home', mode = 'light', className }: Props) {
  const [subPath, setSubPath] = useState('/')
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setBlur(Math.min(MAX_BLUR, Math.floor(window.scrollY / 10)))
    }

    window.addEventListener('scroll', onScroll)

    const pathname = window.location.pathname
    setSubPath('/' + pathname.split('/')[1])

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-mode={mode}
      className={cn(
        'fixed w-full top-0 z-20 flex h-16 flex-col justify-center data-[mode=light]:bg-background/75 data-[mode=dark]:bg-gray-800/75 dark:bg-transparent!',
        className
      )}
      style={{ backdropFilter: `blur(${blur}px)` }}
    >
      <nav className="flex grow flex-col justify-center">
        <ContentDiv className="grow items-center">
          <div
            slot="main"
            className="grid grow grid-cols-5 items-center justify-between"
          >
            <Logo />

            <ul
              className="col-span-3 flex h-full flex-row items-center justify-center gap-x-6"
              slot="main"
            >
              {MENU_ITEMS.map(item => (
                <li key={item.label}>
                  <HeaderLink
                    aria-label={item.label}
                    href={item.path}
                    isActive={item.path === subPath}
                    mode={mode}
                  >
                    {item.label}
                  </HeaderLink>
                </li>
              ))}
            </ul>

            <VCenterRow slot="right" className="justify-end gap-x-2">
              <ThemeToggle mode={mode} />
              <BaseLink
                href="/rss.xml"
                title="Subscribe to RSS feed"
                className="stroke-foreground trans-color hidden lg:inline-flex group"
              >
                <Rss className={RSS_CLS} data-mode={mode} />
              </BaseLink>
            </VCenterRow>
          </div>
        </ContentDiv>
      </nav>
    </header>
  )
}
