"use client";

import { useState } from "react";
import "./FaqAccordion.css";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) {
    return null;
  }

  return (
    <section className="faq-accordion" aria-label="Frequently asked questions">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article key={item.question} className="faq-accordion__item">
            <button
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? <div className="faq-accordion__panel">{item.answer}</div> : null}
          </article>
        );
      })}
    </section>
  );
}

export type { FaqAccordionProps, FaqItem };
