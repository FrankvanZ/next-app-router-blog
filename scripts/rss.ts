import { allPosts } from "contentlayer/generated"
import { Feed } from "feed"
import { writeFileSync } from "fs"

const feed = new Feed({
  title: "Frank's blog",
  description:
    "A personal blog where I write about Sitecore and other stuff I'm passionate about",
  id: "https://www.technophilian.com",
  link: "https://www.technophilian.com",
  language: "en",
  favicon: "https://www.technophilian.com/favicon.ico",
  copyright: "All rights reserved 2024, Frank van Zutphen",
  author: {
    name: "Frank van Zutphen",
    email: "",
    link: "https://www.technophilian.com",
  },
})

allPosts
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .forEach((post) => {
    const url = `https://www.technophilian.com/posts/${post._raw.flattenedPath}`
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.description,
      date: new Date(post.date),
      category: [{ name: post.category }],
      image: post.image,
      author: [
        {
          name: "Frank van Zutphen",
          email: "",
          link: "https://www.technophilian.com",
        },
      ],
    })
  })

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" })
