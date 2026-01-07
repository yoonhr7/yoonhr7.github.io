import { getPost, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="inner">
      <article>
        <header>
          <h1>{post.title}</h1>
          <time>{post.date}</time>
          {post.tags && (
            <div>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </header>
        <div>
          <pre>{post.content}</pre>
        </div>
      </article>
    </div>
  );
}
