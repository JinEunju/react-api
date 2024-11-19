import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

// Post 데이터 타입 정의
interface Post {
  id: number;
  title: string;
}

const List = () => {
  const [lists, setLists] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [filterUserId, setFilterUserId] = useState<string>("");

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

  const onChange = (e) => {
    setUserId(e.target.value);
  };
  const onClickFilter = () => {
    setFilterUserId(userId);
  };
  return (
    <div>
      <input
        placeholder="userId"
        type="number"
        value={userId}
        onChange={onChange}
      />
      <button onClick={onClickFilter}>확인</button>
      {filterUserId === "" ? (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <Link to={`/post/${list.id}`}>{list.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <Filter userId={filterUserId} />
      )}
    </div>
  );
};

export default List;
