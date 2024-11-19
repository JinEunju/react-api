import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  userId: string;
}

const Filter = ({ userId }) => {
  const [filter, setFilter] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const patchPost = () => {
      fetch(`/api/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFilter(data.posts);
        })
        .catch((error) => console.error("Error fetching data:", error)).finally;
      setLoading(false);
    };
    patchPost();
  }, [userId]);
  if (loading) {
    return <div>로딩...</div>;
  }
  return (
    <>
      <ul>
        {filter.map((list) => (
          <li key={list.id}>
            <Link to={`/post/${list.id}`}>{list.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Filter;
