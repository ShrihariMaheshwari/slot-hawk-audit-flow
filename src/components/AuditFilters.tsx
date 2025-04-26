
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { AuditFilters } from '@/types/auditTypes';

interface AuditFiltersProps {
  filters: AuditFilters;
  onFilterChange: (filters: AuditFilters) => void;
  totalRecords: number;
  filteredCount: number;
}

export default function AuditFiltersComponent({ 
  filters, 
  onFilterChange, 
  totalRecords,
  filteredCount 
}: AuditFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search: searchInput });
  };

  const handleStatusChange = (status: AuditFilters['status']) => {
    onFilterChange({ ...filters, status });
  };

  const handleDiscrepancyTypeChange = (discrepancyType: string) => {
    onFilterChange({ ...filters, discrepancyType });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFilterChange({
      status: 'all',
      discrepancyType: 'all',
      search: '',
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 mb-5 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search slot ID..."
              className="pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="ghost" size="sm" className="ml-2">
            Search
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:flex"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
          {(filters.status !== 'all' || filters.discrepancyType !== 'all' || filters.search) && (
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </form>
        
        <div className="text-sm text-gray-500">
          Showing {filteredCount} of {totalRecords} records
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={filters.status === 'all' ? "default" : "outline"}
                  onClick={() => handleStatusChange('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filters.status === 'audited' ? "default" : "outline"}
                  onClick={() => handleStatusChange('audited')}
                >
                  Audited
                </Button>
                <Button
                  size="sm"
                  variant={filters.status === 'discrepancy' ? "default" : "outline"}
                  onClick={() => handleStatusChange('discrepancy')}
                >
                  Discrepancy
                </Button>
                <Button
                  size="sm"
                  variant={filters.status === 'no-discrepancy' ? "default" : "outline"}
                  onClick={() => handleStatusChange('no-discrepancy')}
                >
                  No Discrepancy
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Discrepancy Type</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={filters.discrepancyType === 'all' ? "default" : "outline"}
                  onClick={() => handleDiscrepancyTypeChange('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filters.discrepancyType === 'none' ? "default" : "outline"}
                  onClick={() => handleDiscrepancyTypeChange('none')}
                >
                  None
                </Button>
                <Button
                  size="sm"
                  variant={filters.discrepancyType === 'Wrong Inventory' ? "default" : "outline"}
                  onClick={() => handleDiscrepancyTypeChange('Wrong Inventory')}
                >
                  Wrong Inventory
                </Button>
                <Button
                  size="sm"
                  variant={filters.discrepancyType === 'Wrong Quantity' ? "default" : "outline"}
                  onClick={() => handleDiscrepancyTypeChange('Wrong Quantity')}
                >
                  Wrong Quantity
                </Button>
                <Button
                  size="sm"
                  variant={filters.discrepancyType === 'Missing Label' ? "default" : "outline"}
                  onClick={() => handleDiscrepancyTypeChange('Missing Label')}
                >
                  Missing Label
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
