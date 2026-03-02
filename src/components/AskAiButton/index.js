import { useEffect, useCallback, useRef } from "react";

/**
 * Triggers the search plugin's lazy loading of the AskAI widget
 * by focusing and immediately blurring the search input.
 */
function loadSearchIndex() {
  const input = document.querySelector(".navbar__search-input");
  if (input) {
    input.focus({ preventScroll: true });
    input.blur();
  }
}

/**
 * Opens the AskAI drawer by clicking the hidden trigger rendered
 * by the search plugin's AskAIWidget inside the SearchBar.
 * Returns true if the trigger was found and clicked.
 */
function openAskAi() {
  const trigger = document.querySelector(".ask-ai span[hidden]");
  if (trigger) {
    trigger.click();
    return true;
  }
  return false;
}

export default function AskAiButton() {
  const pendingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(loadSearchIndex, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback(() => {
    if (openAskAi() || pendingRef.current) return;

    pendingRef.current = true;
    loadSearchIndex();
    const observer = new MutationObserver(() => {
      if (openAskAi()) {
        observer.disconnect();
        pendingRef.current = false;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      pendingRef.current = false;
    }, 5000);
  }, []);

  return (
    <button
      className="floating-ask-ai-btn"
      onClick={handleClick}
      aria-label="Ask AI"
      title="Ask AI"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
      Ask AI
    </button>
  );
}
