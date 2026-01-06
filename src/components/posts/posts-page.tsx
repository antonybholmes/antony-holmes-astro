import { BaseCol } from '@layout/base-col'

import { PagePagination } from '@components/page-pagination'
import { ContentDiv } from '../layout/content-div'
import { HeroPosts, type IPostsProps } from './hero-posts'
import { LatestPosts } from './latest-posts'
import { RestPosts } from './rest-posts'

export function PostsPage({
  posts,
  page,
  pages,
  showLatestPosts = false,
  showSectionLinks = true,
  root,
}: IPostsProps) {
  const heroPosts = posts.slice(0, 4)
  //const headPosts = posts.slice(4, 8)
  const restPosts = posts.slice(4) //8)

  return (
    <BaseCol className="gap-y-24">
      <ContentDiv className="py-16 bg-linear-to-br from-gray-900 to-gray-700">
        <HeroPosts
          posts={heroPosts}
          page={0}
          pages={0}
          showSectionLinks={showSectionLinks}
          mode="dark"
        />
      </ContentDiv>
      {/* <HeadPost post={heroPost} /> */}
      {restPosts.length > 0 && (
        <ContentDiv>
          {/* <MenuSeparator /> */}
          <RestPosts posts={restPosts} />
        </ContentDiv>
      )}
      {/* <HeroPost post={heroPost} /> */}
      {/* <MorePosts posts={morePosts} /> */}

      {/* {restPosts.length > 0 && (
        <ContentDiv>
          
          <RestPosts posts={restPosts} />
        </ContentDiv>
      )} */}

      {/* <Pagination page={page} pages={pages} /> */}

      <PagePagination page={page} pages={pages} root={root} />

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
