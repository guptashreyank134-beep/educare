import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  if (totalPages <= 1) return null;

  // Helper to build page URL
  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Near start
        pages.push(2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near end
        pages.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 select-none" aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all duration-200 shadow-sm"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <span
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 border border-slate-100 text-slate-400 cursor-not-allowed shadow-none"
          aria-disabled="true"
        >
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-400 font-sans">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return isActive ? (
            <span
              key={`page-${pageNum}`}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-medium font-sans shadow-sm transition-all duration-200"
              aria-current="page"
            >
              {pageNum}
            </span>
          ) : (
            <Link
              key={`page-${pageNum}`}
              href={getPageUrl(pageNum)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium font-sans hover:text-primary hover:border-primary hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all duration-200 shadow-sm"
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <span
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 border border-slate-100 text-slate-400 cursor-not-allowed shadow-none"
          aria-disabled="true"
        >
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
