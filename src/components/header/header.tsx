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

const MAX_BLUR = 16
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
  const [opacity, setOpacity] = useState(0)
  const [addShadow, setAddShadow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setBlur(Math.min(MAX_BLUR, Math.floor(window.scrollY / 10)))
      setOpacity(Math.max(0, window.scrollY / 100))
      setAddShadow(window.scrollY > 100)
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
        'fixed top-0 w-full z-100 flex h-12 flex-col justify-center'
      )}
    >
      <span
        data-mode={mode}
        className={cn(
          'absolute top-0 left-0 w-full z-0 h-12 data-[mode=light]:bg-background/50 data-[mode=dark]:bg-gray-900/30 trans-shadow',
          //{ 'shadow-xl': addShadow },
          className
        )}
        style={{ backdropFilter: `blur(${blur}px)`, opacity }}
      />

      <ContentDiv className="grow items-center z-10">
        <div
          slot="main"
          className="grid grow grid-cols-5 items-center justify-between"
        >
          <Logo />

          <ul
            className="col-span-3 flex h-full flex-row items-center justify-center gap-x-8 text-sm"
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

          <VCenterRow
            slot="right"
            className="justify-end gap-x-3 hidden md:flex"
          >
            <ThemeToggle mode={mode} />
            <BaseLink
              href="/rss.xml"
              title="Subscribe to RSS feed"
              className="stroke-foreground trans-color group"
            >
              <Rss className={RSS_CLS} data-mode={mode} />
            </BaseLink>
          </VCenterRow>
        </div>
      </ContentDiv>
    </header>
  )
}
