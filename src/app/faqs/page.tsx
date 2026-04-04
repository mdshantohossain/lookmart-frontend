'use client';

const faqData = [
  { q: "How do I track my order?", a: "Once your order ships, you will receive an email with a tracking link. It usually takes 24 hours to update." },
  { q: "What is your shipping policy?", a: "We offer free standard shipping on all orders over $75. Priority shipping is available at checkout." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement. Contact support immediately for assistance." }
];

export default function FAQPage() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6">
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <details key={i} className="group border-b border-zinc-200 pb-4">
            <summary className="list-none flex justify-between items-center cursor-pointer font-bold text-lg py-4">
              {item.q}
              <span className="transition group-open:rotate-45 text-zinc-400">+</span>
            </summary>
            <p className="text-zinc-500 leading-relaxed pb-4">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}