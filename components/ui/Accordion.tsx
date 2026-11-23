import { Icon } from "@/components/ui/Icon";

type Item = { question: string; answer: string };

type AccordionProps = {
  items: Item[];
  /** Kept for call-site compatibility; items always render open. */
  defaultOpen?: "first" | "all" | "none";
};

/** Always-open FAQ list — answers stay visible; no collapse control. */
export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-cream-dark overflow-hidden rounded-[1.25rem] border border-cream-dark bg-white shadow-[0_10px_30px_rgba(13,44,56,0.06)]">
      {items.map((item) => (
        <div key={item.question} className="px-6 py-5 sm:px-8 sm:py-6">
          <h3 className="flex items-start gap-3 font-display text-[1.0625rem] font-bold text-ink">
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-200 bg-brand-50 text-brand-600"
            >
              <Icon name="check" className="text-sm" />
            </span>
            <span>{item.question}</span>
          </h3>
          <p className="mt-3 max-w-prose pl-10 text-base text-muted">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
