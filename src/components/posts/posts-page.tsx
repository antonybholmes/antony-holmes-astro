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
  showLatestPosts,
  root,
}: IPostsProps) {
  const heroPosts = posts.slice(0, 4)
  const headPosts = posts.slice(4, 6)
  const restPosts = posts.slice(6)

  return (
    <BaseCol className=" gap-y-16">
      <HeroPosts posts={heroPosts} page={0} pages={0} />

      {/* <HeadPost post={heroPost} /> */}
      {headPosts.length > 0 && (
        <HeadPosts posts={headPosts} page={0} pages={0} />
      )}
      {/* <HeroPost post={heroPost} /> */}
      {/* <MorePosts posts={morePosts} /> */}

      {restPosts.length > 0 && (
        <RestPosts posts={restPosts} page={0} pages={0} />
      )}

      {/* <Pagination page={page} pages={pages} /> */}

      <HCenterRow className="mt-16">
        <PagePagination page={page} pages={pages} root={root} />
      </HCenterRow>

      {showLatestPosts && <LatestPosts posts={posts} page={0} pages={0} />}

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
