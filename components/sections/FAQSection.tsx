'use client';

import { useState } from 'react';
import type { FAQ } from '@/lib/types';
import { faqSchema } from '@/lib/seo';
import Schema from '@/components/seo/Schema';

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
}

export default function FAQSection({ title = 'Frequently Asked Questions', faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 lg:py-16">
      <Schema data={faqSchema(faqs)} />
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark text-center mb-10">
          {title}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-brand-dark pr-4">{faq.question}</span>
                <span className="text-brand-primary flex-shrink-0 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
