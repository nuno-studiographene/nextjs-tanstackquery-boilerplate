"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPosts } from "./getPosts";
import { postPosts } from "./postPosts";
import { Input } from "@/components";

const CallbackMemoPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const apiData = await getPosts();
      setPosts(apiData);
    };
    fetchPosts();
  }, []);

  const [search, setSearch] = useState<string>("");
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const searchedPosts = useMemo(() => {
    return posts.filter((post: any) => post.title.includes(search));
  }, [posts, search]);

  /* const handleSubmit = async () => {
    const newPost = await postPosts({ title, body });
  }; */

  return (
    <div>
      <h1>Posts: {posts.length}</h1>
      {searchedPosts.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}

      <br></br>
      <Input
        value={search}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default CallbackMemoPage;
