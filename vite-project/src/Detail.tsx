import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

interface Post {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  imgUrl: string;
}

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="detailArea">
      <div className="detailHead">
        <h1>{post.title}</h1>
        <p>{post.createdAt}</p>
      </div>
      <div className="detailBody">
        <p>{post.content}</p>
        <img src={post.imgUrl} alt={post.title} />
      </div>

      <Comments postId={post.id} />
    </div>
  );
};

export default Detail;
