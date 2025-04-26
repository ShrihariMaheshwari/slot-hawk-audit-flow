
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AuditPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AuditPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AuditPaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate range of pages to show
  const range = 2; // Show 2 pages before and after current page
  const pages: number[] = [];
  
  for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
    pages.push(i);
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {currentPage > range + 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
            </PaginationItem>
            {currentPage > range + 2 && (
              <PaginationItem>
                <span className="flex h-9 w-9 items-center justify-center">...</span>
              </PaginationItem>
            )}
          </>
        )}
        
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        {currentPage < totalPages - range && (
          <>
            {currentPage < totalPages - range - 1 && (
              <PaginationItem>
                <span className="flex h-9 w-9 items-center justify-center">...</span>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
