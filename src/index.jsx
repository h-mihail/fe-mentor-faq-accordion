import { hydrate, prerender as ssr } from "preact-iso";
import { useCallback, useState } from "preact/hooks";

import starIcon from "/assets/icon-star.svg";
import plusIcon from "/assets/icon-plus.svg";
import minusIcon from "/assets/icon-minus.svg";

import "./style.css";

import { faqData } from "./data";

export const App = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleArticleClick = useCallback(
    (i) => () => {
      if (expandedItem === i) setExpandedItem(null);
      else setExpandedItem(i);
    },
    [expandedItem]
  );

  const handleArticleKeyDown = useCallback(
    (i) => (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Prevent scrolling when space is pressed
        if (expandedItem === i) setExpandedItem(null);
        else setExpandedItem(i);
      }
    },
    [expandedItem]
  );

  const renderFaqData = () => {
    return faqData.map(({ question, answer }, i) => (
      <Article
        index={i}
        question={question}
        answer={answer}
        expanded={expandedItem === i}
        onClick={handleArticleClick(i)}
        onKeyDown={handleArticleKeyDown(i)}
      />
    ));
  };

  return (
    <main>
      <div className="card">
        <header>
          <img alt="title-decoration" src={starIcon} />
          <h1>FAQs</h1>
        </header>
        <section>{renderFaqData()}</section>
      </div>
    </main>
  );
};

const Article = ({ index, question, answer, expanded, onClick, onKeyDown }) => {
  return (
    <article class="item">
      <div
        onClick={onClick}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={`panel${index}`}
      >
        <h2>{question}</h2>
        {!expanded && <img alt="collapsed" src={plusIcon} />}
        {expanded && <img alt="expanded" src={minusIcon} />}
      </div>
      <p
        id={`panel${index}`}
        className={expanded ? "visible" : "hidden"}
        role="region"
      >
        {answer}
      </p>
    </article>
  );
};

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
