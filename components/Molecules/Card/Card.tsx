import Link from "next/link";

export interface CardPropsInterface {
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
}

export const Card = ({ post }: CardPropsInterface) => {
  return (
    <Link href={`/blogs/${post.id}`}>
      <div className="flex flex-col gap-3 border border-neutral-300 p-xs">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span>Post #{post.id}</span>
          <span>•</span>
          <span>User {post.userId}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors capitalize">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.body.substring(0, 150)}...
        </p>

        {/* Read more link */}
        <div className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline mt-1">
          Read more →
        </div>
      </div>
    </Link>
  );
};

export default Card;
