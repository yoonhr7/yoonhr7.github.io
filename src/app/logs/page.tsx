import { getPosts } from "@/lib/posts";
import LogsClient from "./LogsClient";

export default function LogsPage() {
  const posts = getPosts();

  return <LogsClient posts={posts} />;
}
