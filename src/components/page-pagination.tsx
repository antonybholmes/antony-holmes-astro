import type { ILinkProps } from '@interfaces/link-props'

import { range } from '@/lib/math/range'
import { cn } from '@/lib/shadcn-utils'
import { EllipsisIcon } from 'lucide-react'
import { ChevronRightIcon } from './icons/chevron-right-icon'
import { BaseLink } from './link/base-link'

const BTN_CLS =
  'flex flex-row justify-center items-center min-w-8 h-8 border border-transparent rounded'

function LinkButton({ className, children, ...props }: ILinkProps) {
  return (
    <BaseLink
      className={cn(
        BTN_CLS,
        'transition duration-300 hover:border-border',
        className
      )}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

function NavButton({ className, children, ...props }: ILinkProps) {
  return (
    <LinkButton className={cn('gap-x-2   px-2 ', className)} {...props}>
      {children}
    </LinkButton>
  )
}

function PrevButton({ href }: ILinkProps) {
  return (
    <NavButton href={href} aria-label="Previous page">
      <ChevronRightIcon className="rotate-180" /> Prev
    </NavButton>
  )
}

function NextButton({ href }: ILinkProps) {
  return (
    <NavButton href={href} aria-label="Next page">
      Next <ChevronRightIcon />
    </NavButton>
  )
}

interface ISelectedPageButtonProps extends ILinkProps {
  page: number
}

function BasePageButton({
  href,
  page,
  className,
  ...props
}: ISelectedPageButtonProps) {
  return (
    <BaseLink
      href={href}
      className={cn(BTN_CLS, className)}
      aria-label={`Goto page ${page + 1}`}
      {...props}
    >
      {page + 1}
    </BaseLink>
  )
}

function SelectedPageButton({
  href,
  page,
  ...props
}: ISelectedPageButtonProps) {
  return (
    <BasePageButton
      page={page}
      href={href}
      className="bg-theme text-white"
      {...props}
    />
  )
}

interface IPageButtonProps extends ISelectedPageButtonProps {
  selected: boolean
}

function PageButton({ href, page, selected }: IPageButtonProps) {
  if (selected) {
    return <SelectedPageButton href={href} page={page} />
  } else {
    return (
      <BasePageButton
        href={href}
        page={page}
        className="trans-color-300 hover:border-border"
      />
    )
  }
}

function Ellipsis() {
  return (
    <li className={BTN_CLS}>
      <EllipsisIcon className="w-4 stroke-foreground/50" />
    </li>
  )
}

interface IProps {
  page: number
  pages: number
  root?: string
}

function getPath(page: number, root: string = ''): string {
  return `${root ? `${root}/` : ''}page/${page + 1}`
}

export function PagePagination({ page, pages, root }: IProps) {
  page = Math.max(0, Math.min(page, pages - 1))

  const pageStart = Math.max(page - 1, 0)
  const pageEnd = Math.min(page + 1, pages - 1)

  const prevPage = Math.max(0, page - 1)
  const nextPage = Math.min(pages - 1, page + 1)

  console.log('PagePagination:', pageStart, pageEnd, 1)

  return (
    <ul className="flex flex-row items-center gap-x-1 font-medium">
      <li>
        <PrevButton href={getPath(prevPage, root)} />
      </li>

      <li>
        <PageButton page={0} href={getPath(0, root)} selected={page === 0} />
      </li>

      {pageStart > 2 && <Ellipsis />}

      {pageStart > 0 && pageEnd - pageStart > 0 && (
        <>
          {range(pageStart, pageEnd).map((p: number) => (
            <li key={p}>
              <PageButton
                href={getPath(p, root)}
                page={p}
                selected={p === page}
              />
            </li>
          ))}
        </>
      )}

      {pageEnd < pages - 2 && <Ellipsis />}

      {pages > 1 && (
        <li>
          <PageButton
            href={getPath(pages - 1, root)}
            page={pages - 1}
            selected={page === pages - 1}
          />
        </li>
      )}

      <li>
        <NextButton href={getPath(nextPage, root)} />
      </li>
    </ul>
  )
}
