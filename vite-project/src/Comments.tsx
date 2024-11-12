import { useState, useEffect } from "react";

interface Comment {
  id: number;
  body: string;
  username: string;
  createdAt: string;
}

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data: { comments: Comment[] } = await response.json();
        setComments(data.comments);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              <strong>{comment.username}</strong>: {comment.body}
            </p>
            <p>
              <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
