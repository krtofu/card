"use client";

import ReprintCard from "@/components/ReprintCard";
import { type ReprintSectionData } from "@/lib/types";

export default function ReprintSection({
  sections,
}: {
  sections: ReprintSectionData[];
}) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {sections.map((s) => (
        <ReprintCard key={s.title} title={s.title} items={s.items} />
      ))}
    </section>
  );
}