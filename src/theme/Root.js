import React from "react";
import AskAiButton from "@site/src/components/AskAiButton";

export default function Root({ children }) {
  return (
    <>
      {children}
      <AskAiButton />
    </>
  );
}
