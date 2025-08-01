import React, { useState, useEffect } from "react";
import { usePosts } from "../../Data/Posts/Posts";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import "./Admin.css";

function Admin() {
  const { fetchSearchPosts, togglePostStatus, fetchPostsCount } = usePosts();
  const [postsData, setPostsData] = useState(null);
  const [postsCount, setPostsCount] = useState(null);
  const [item, setItem] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  

  async function search(event) {
    event.preventDefault();
    setLoadingSearch(true);
    try {
      const data = await fetchSearchPosts("title", item);
      setPostsData(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoadingSearch(false);
      setItem("");
    }
  }

  function handleChange(event) {
    setItem(event.target.value);
  }

  async function handleToggleStatus(postId, currentStatus) {
    const confirmAction = window.confirm("Are you sure you want to toggle status?");
    if (!confirmAction) return;

    try {
      let newStatus = currentStatus === "published" ? "unpublished" : "published";

      if (newStatus === "published") {
        postsCount.publishedPosts += 1;
        postsCount.unpublishedPosts -= 1;
      } else if (newStatus === "unpublished") {
        postsCount.publishedPosts -= 1;
        postsCount.unpublishedPosts += 1;
      } else {
        console.error("Invalid status change");
        return;
      }
      await togglePostStatus(postId, newStatus);
      const updatedPosts = postsData.map(post =>
        post.id === postId ? { ...post, status: newStatus } : post
      );
      setPostsData(updatedPosts);
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  }

  async function fetchPostsCountData() {
    try {
        const count = await fetchPostsCount();
        setPostsCount(count);
      } catch (err) {
        console.error("Failed to fetch posts count:", err);
      }
  }

  useEffect(() => {
    fetchPostsCountData();
  }, []);


  return (
    <section className="admin-panel">
      <h1>Admin Panel</h1>
      {postsCount && (
        <div className="posts-count">
          <h2>Total Posts: {postsCount.totalPosts}</h2>
          <h2>Published Posts: {postsCount.publishedPosts}</h2>
          <h2>Unpublished Posts: {postsCount.unpublishedPosts}</h2>
        </div>
      )}
      <Link to={`/admin/edit/new-post`} className="add-link">Add new post</Link>
      <form className="search-form" onSubmit={search}>
        <input
          type="text"
          placeholder="Search post..."
          onChange={handleChange}
          value={item}
        />
        <button type="submit">
          <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="search icon" />
        </button>
      </form>

      {loadingSearch && <Loading />}

      {postsData && (
        <div className="results">
          <h2>Posts:</h2>
          <table className="posts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Creation Date</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postsData.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.tags}</td>
                  <td>
                    <button
                      className={`status-btn ${post.status == "published" ? "published" : "unpublished"}`}
                      onClick={() => handleToggleStatus(post.id, post.status)}
                    >
                      {post.status}
                    </button>
                  </td>
                  <td>{post.date.toDate().toLocaleString()}</td>
                  <td>{post.lastUpdated.toDate().toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/edit/${post.id}`} state={{post}} className="edit-link">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Admin;