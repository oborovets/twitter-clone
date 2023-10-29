"use client";
import { useState } from "react";

import FollowersList from "./followers-list";

function FollowersContainer() {
  const [cnt, setCnt] = useState(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FollowersList key={i} index={i} />);
  }

  return (
    <div>
      {pages}
      <div className="flex justify-center w-full">
        <button
          className="bg-slate-900 p-2 rounded-lg"
          onClick={() => setCnt((cnt) => cnt + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
export default FollowersContainer;
