import { BaseCol } from '@layout/base-col'
import { HCenterRow } from '@layout/h-center-row'

import { PagePagination } from '@components/page-pagination'
import HeadPosts from './head-posts'
import { HeroPosts, type IPostsProps } from './hero-posts'
import { LatestPosts } from './latest-posts'
import RestPosts from './rest-posts'

export function PostsPage({
  posts,
  page,
  pages,
  showLatestPosts = false,
  showSectionLinks = true,
  root,
}: IPostsProps) {
  const heroPosts = posts.slice(0, 4)
  const headPosts = posts.slice(4, 6)
  const restPosts = posts.slice(6)

  return (
    <BaseCol className="gap-y-24">
      <HeroPosts
        posts={heroPosts}
        page={0}
        pages={0}
        showSectionLinks={showSectionLinks}
      />

      {/* <HeadPost post={heroPost} /> */}
      {headPosts.length > 0 && (
        <>
          {/* <MenuSeparator /> */}
          <HeadPosts posts={headPosts} />
        </>
      )}
      {/* <HeroPost post={heroPost} /> */}
      {/* <MorePosts posts={morePosts} /> */}

      {restPosts.length > 0 && (
        <>
          {/* <MenuSeparator /> */}
          <RestPosts posts={restPosts} />
        </>
      )}

      {/* <Pagination page={page} pages={pages} /> */}

      <HCenterRow>
        <PagePagination page={page} pages={pages} root={root} />
      </HCenterRow>

      {showLatestPosts && <LatestPosts posts={posts} />}

      {/* {sectionMap && (
        <>
          <CategoryPostsVert
            category="Guides & Tutorials"
            posts={sectionMap["Guides & Tutorials"]}
          />
          <CategoryPosts category="Opinions" posts={sectionMap["Opinions"]} />

          <CategoryPostsVert
            category="Retirement"
            posts={sectionMap["Retirement"]}
          />

        
          <CategoryPostsVert
            category="News & Announcements"
            posts={sectionMap["News & Announcements"]}
          />
        </>
      )} */}
    </BaseCol>
  )
}
