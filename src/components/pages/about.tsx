// 'use client'

import { ThemeLink } from '@components/link/theme-link'
import { BaseCol } from '@layout/base-col'

import { APP_NAME, UPDATED, VERSION } from '@/consts'

import type { IChildrenProps } from '@interfaces/children-props'
import { VCenterRow } from '@layout/v-center-row'
import { getCopyright } from '@lib/copyright'
import { Card } from '@themed/card'
import { MenuSeparator } from '@themed/dropdown-menu'
import { Logo } from '../header/logo'
import { CenterCol } from '../layout/center-col'
import { BLANK_TARGET } from '../link/base-link'

const LINKS = [
  ['Astro', 'https://astro.build/'],
  ['React', 'https://reactjs.org'],
  ['Tailwind', 'https://tailwindcss.com/'],
  ['Lucide', 'https://lucide.dev/'],
  ['Font Awesome', 'https://fontawesome.com/'],
  ['Node.js', 'https://nodejs.org/'],
  ['Go', 'https://go.dev/'],
  ['GitHub', 'https://github.com'],
  ['Visual Studio Code', 'https://code.visualstudio.com'],
]

export function AboutPage({ children }: IChildrenProps) {
  return (
    <CenterCol className="mx-4 my-8 gap-y-8">
      <Card
        className="text-sm shadow-md w-full md:w-lg"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <VCenterRow className="gap-x-4 py-2 px-6">
          <Logo />

          <span className="text-xl font-semibold tracking-wide">
            {APP_NAME}
          </span>
        </VCenterRow>

        <MenuSeparator />

        <VCenterRow className="justify-between px-6">
          <BaseCol className="gap-y-1">
            <p>
              v{VERSION} ({UPDATED})
            </p>
          </BaseCol>
          {/* <Button
              variant="link"
              //target={BLANK_TARGET}
              aria-label="View changelog"
              onClick={() => {
                window.open(
                  '/changelog',
                  'ChangeLogWindow',
                  'width=1080,height=720,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
                )
              }}
            >
              Changelog
            </Button> */}

          <ThemeLink
            href="/changelog"
            aria-label="View changelog"
            target={BLANK_TARGET}
            //data-underline={true}
            //className="text-sm text-foreground/50 hover:text-foreground"
          >
            Changelog
          </ThemeLink>
        </VCenterRow>
      </Card>
      <Card className="text-sm shadow-md w-full md:w-lg">
        <BaseCol className="gap-y-1">
          <p>{APP_NAME}</p>
          <p>
            {getCopyright()}{' '}
            <ThemeLink
              href="https://www.antonyholmes.dev"
              aria-label="Email Antony Holmes"
              //data-underline={true}
            >
              Antony Holmes
            </ThemeLink>
            . All rights reserved.
          </p>
        </BaseCol>

        <BaseCol className="gap-y-1">
          <p>
            This site is made possible by open source software and other
            services:
          </p>

          <ul className="flex flex-col gap-y-0.5">
            {LINKS.map((link, li) => {
              return (
                <li key={li}>
                  <ThemeLink
                    href={link[1]!}
                    aria-label="View tool"
                    //data-underline={true}
                  >
                    {link[0]}
                  </ThemeLink>
                </li>
              )
            })}
          </ul>
        </BaseCol>
      </Card>
      {children}
    </CenterCol>
  )
}
