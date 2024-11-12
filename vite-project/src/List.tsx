import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Post 데이터 타입 정의
interface Post {
  id: number;
  title: string;
}

const List = () => {
  const [lists, setLists] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
        }
        const data: { posts: Post[] } = await response.json();
        setLists(data.posts);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <Link to={`/post/${list.id}`}>{list.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
