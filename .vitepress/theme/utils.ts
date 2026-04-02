import { Post } from "./serverUtils";

export function useYearSort(posts: Post[]): Post[][] {
  const yearGroups: Post[][] = []
  let currentYear = ''

  for (const post of posts) {
    const date = post.frontMatter.date
    if (!date) continue

    const year = date.split('-')[0]

    if (year !== currentYear) {
      yearGroups.push([])
      currentYear = year
    }

    yearGroups[yearGroups.length - 1].push(post)
  }

  return yearGroups
}