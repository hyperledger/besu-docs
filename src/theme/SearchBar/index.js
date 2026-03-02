import React, { useEffect, useRef } from "react";
import SearchBar from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/index.jsx";

export default function SearchBarWrapper(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const input = containerRef.current?.querySelector("input");
    if (input) {
      input.placeholder = "Search or Ask AI";
    }
  }, []);

  return (
    <div ref={containerRef}>
      <SearchBar {...props} />
    </div>
  );
}
