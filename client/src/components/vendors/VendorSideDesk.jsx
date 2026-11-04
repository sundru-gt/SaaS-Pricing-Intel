import { useState, useMemo } from "react";
import { X, Search, ChevronRight } from "lucide-react";
import SoftwareLogo from "../shared/SoftwareLogo.jsx";
import { getCategoryTheme } from "../../lib/categoryTheme.js";

export default function VendorSideDesk({
  vendors = [],
  isOpen,
  onClose,
  onSelectVendor,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchesSearch =
        searchTerm === "" ||
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        categoryFilter === "all" || v.categoryId === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [vendors, searchTerm, categoryFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card w-full max-w-full sm:max-w-md h-full border-l border-border shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="p-4 border-b border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider font-mono">
                Software Index
              </h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                {vendors.length} verified B2B vendors
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vendors or tools..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-border rounded-lg outline-none focus:border-foreground/50 text-foreground placeholder:text-muted-foreground font-medium"
            />
          </div>
        </div>

        {/* List of Vendors */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No vendors match your search.
            </div>
          ) : (
            filtered.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => {
                  onSelectVendor(vendor);
                  onClose();
                }}
                className="p-2.5 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <SoftwareLogo
                    name={vendor.name}
                    url={vendor.sourceUrl}
                    logoText={vendor.logoText || vendor.shortName.substring(0, 2)}
                    size="sm"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-foreground group-hover:underline">
                      {vendor.name}
                    </h4>
                    {(() => {
                      const theme = getCategoryTheme(vendor.categoryId);
                      const CatIcon = theme.icon;
                      return (
                        <span className="text-[10px] text-muted-foreground capitalize flex items-center gap-1 font-mono">
                          <CatIcon className={`w-2.5 h-2.5 ${theme.color} flex-shrink-0`} />
                          <span className={theme.color}>{theme.name}</span>
                          <span>• Starts {vendor.cheapestPaidPlanSummary}</span>
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-border bg-muted/20 text-center text-[10px] font-mono text-muted-foreground">
          Select any vendor to inspect pricing tiers & contract nuances
        </div>
      </div>
    </div>
  );
}
