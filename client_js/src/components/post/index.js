import React from "react";
import Tree_comment from "./tree_comment";
import Avatar_post from "./avatar_post";
import Onclick_status from "./onclick_status";
import CommentForm from "./comment";

const Post = () => {
  return (
    <div className="max-w-2xl mx-auto mb-3 rounded-lg border border-gray-100 bg-white p-2 shadow-sm transition hover:shadow-lg ">
      <div>
        <Avatar_post />
      </div>
      <div className="mb-4 mt-4 ">
        <img
          src="https://images.unsplash.com/photo-1672632826501-f0b82532fc52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
          alt="Hình ảnh bài viết"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <Onclick_status />
      <div className="my-8">
        {/* <div className="bg-gray-100 p-4 rounded-lg">
          <Tree_comment />
        </div> */}
      </div>
    </div>
  );
};

export default Post;
