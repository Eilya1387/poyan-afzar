import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  if (items.length === 0) return null;

  const parentItems = items.slice(0, items.length - 1);
  const currentItem = items[items.length - 1];

  return (
    <nav
      aria-label="مسیر راهنما"
      className="py-3 flex items-center justify-between gap-4 text-xs text-slate-500 overflow-x-auto no-scrollbar"
    >
      <ol className="flex items-center gap-2 whitespace-nowrap">
        {parentItems.map((item) => (
          <li key={item.title} className="flex items-center gap-2">
            <Link
              href={item.href}
              className="hover:text-[#2563eb] transition-colors cursor-pointer"
            >
              {item.title}
            </Link>
            <span className="text-slate-300 select-none">/</span>
          </li>
        ))}
      </ol>

      {currentItem && (
        <span
          className="font-medium text-slate-700 whitespace-nowrap shrink-0"
          aria-current="page"
        >
          {currentItem.title}
        </span>
      )}
    </nav>
  );
}
