import { hydrate, prerender as ssr } from "preact-iso";
import { useCallback, useState } from "preact/hooks";

import starIcon from "/assets/icon-star.svg";
import plusIcon from "/assets/icon-plus.svg";
import minusIcon from "/assets/icon-minus.svg";

import "./style.css";

import { faqData } from "./data";

export const App = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const onArticleClick = useCallback(
    (i) => () => {
      if (expandedItem === i) setExpandedItem(null);
      else setExpandedItem(i);
    },
    [expandedItem]
  );

  const renderFaqData = () => {
    return faqData.map(({ question, answer }, i) => (
      <Article
        question={question}
        answer={answer}
        expanded={expandedItem === i}
        onClick={onArticleClick(i)}
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

const Article = ({ question, answer, expanded, onClick }) => {
  return (
    <article class="item">
      <div onClick={onClick}>
        <h2>{question}</h2>
        {!expanded && <img alt="collapsed" src={plusIcon} />}
        {expanded && <img alt="expanded" src={minusIcon} />}
      </div>
      <p className={expanded ? "visible" : "hidden"}>{answer}</p>
    </article>
  );
};

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
