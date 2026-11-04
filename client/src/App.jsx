import { useState, useEffect, useMemo, useCallback } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { CATEGORIES, ALL_CATEGORY } from "./data/categories.js";
import { VENDORS } from "./data/vendors.js";
import { matchCategory, filterVendors } from "./lib/search.js";
import { rankVendors } from "./lib/recommendations.js";
import { fetchCategories, fetchVendors, submitSearchApi } from "./lib/api.js";

// Components
import Header from "./components/layout/Header.jsx";
import QueryBubble from "./components/summary/QueryBubble.jsx";
import SummarySection from "./components/summary/SummarySection.jsx";
import VideoSection from "./components/video/VideoSection.jsx";
import CategoryChips from "./components/categories/CategoryChips.jsx";
import PricingCalculator from "./components/pricing/PricingCalculator.jsx";
import GuidedFlow from "./components/recommendations/GuidedFlow.jsx";
import ResultCards from "./components/vendors/ResultCards.jsx";
import ComparisonPanel from "./components/comparison/ComparisonPanel.jsx";
import VendorDetailSheet from "./components/vendors/VendorDetailSheet.jsx";
import Disclaimer from "./components/shared/Disclaimer.jsx";
import PriceWatchNewsletter from "./components/newsletter/PriceWatchNewsletter.jsx";
import FollowUpQuestions from "./components/shared/FollowUpQuestions.jsx";
import AnswerToolbar from "./components/shared/AnswerToolbar.jsx";
import FixedSearchBar from "./components/search/FixedSearchBar.jsx";
import SaaSBonusToolkit from "./components/toolkit/SaaSBonusToolkit.jsx";
import VendorSideDesk from "./components/vendors/VendorSideDesk.jsx";
import Toast from "./components/shared/Toast.jsx";

export default function App() {
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [vendorsList, setVendorsList] = useState(VENDORS);

  // Parse initial query params
  const initialParams = new URLSearchParams(window.location.search);
  const initialQ = initialParams.get("q") || "";
  const initialCat = initialParams.get("cat") || "";
  const initialLoc = initialParams.get("loc") || "";

  const [currentQuery, setCurrentQuery] = useState(initialQ || (initialCat ? "" : "All Software"));
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [activeSubType, setActiveSubType] = useState("All");
  const [currency, setCurrency] = useState(initialLoc === "IN" ? "INR" : "USD");

  // Selection states
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [comparePanelOpen, setComparePanelOpen] = useState(false);
  const [detailVendor, setDetailVendor] = useState(null);
  const [vendorDeskOpen, setVendorDeskOpen] = useState(false);

  // Guided recommendation answers
  const [guidedAnswers, setGuidedAnswers] = useState({});

  // Regeneration animation state ("idle" | "clearing" | "generating")
  const [regeneratePhase, setRegeneratePhase] = useState("idle");

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Initial Load: Fetch categories & vendors from Express Backend
  useEffect(() => {
    async function loadData() {
      const catRes = await fetchCategories();
      if (catRes.categories) setCategoriesList(catRes.categories);

      const vendRes = await fetchVendors();
      if (vendRes) setVendorsList(vendRes);
    }
    loadData();
  }, []);

  // 2. Parse URL params and listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || "";
      const cat = params.get("cat") || "";
      const loc = params.get("loc") || "";

      if (loc === "IN") setCurrency("INR");

      if (cat) {
        const match = categoriesList.find((c) => c.id === cat || c.slug === cat);
        if (match) {
          setActiveCategory(match);
          setCurrentQuery(match.name);
          return;
        }
      }

      if (q) {
        const matched = matchCategory(q, vendorsList);
        setActiveCategory(matched);
        setCurrentQuery(q);
      } else if (!cat) {
        setActiveCategory(ALL_CATEGORY);
        setCurrentQuery("All Software");
      }
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [categoriesList, vendorsList]);

  // URL State Updater Helper
  const updateUrlParams = (newQuery, newCatId, newLoc) => {
    const params = new URLSearchParams();
    if (newQuery && newQuery !== "All Software") {
      params.set("q", newQuery);
    }
    if (newCatId && newCatId !== "all") {
      params.set("cat", newCatId);
    }
    const currentLoc = newLoc || (currency === "INR" ? "IN" : null);
    if (currentLoc) {
      params.set("loc", currentLoc);
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    window.history.pushState(null, "", newUrl);
  };

  /**
   * ChatGPT / Gemini Style Regeneration:
   * 1. 0s to 1s: Remove all currently available content over 1 second
   * 2. 1s to 2s: Regenerate the new output over 1 second with AI shimmer pulse
   * 3. At 2s: Reveal the newly regenerated content
   */
  const handleRegenerate = (targetQuery) => {
    if (regeneratePhase !== "idle") return;

    // Step 1: Remove all content in 1 second
    setRegeneratePhase("clearing");

    setTimeout(() => {
      // Step 2: Content removed; start generating new output for 1 second
      const matched = matchCategory(targetQuery, vendorsList);
      setActiveCategory(matched);
      setActiveSubType("All");
      setCurrentQuery(targetQuery);
      updateUrlParams(targetQuery, matched.id === "all" ? null : matched.id);
      setGuidedAnswers({});
      setSelectedForCompare([]);
      setRegeneratePhase("generating");

      // Optional backend search log
      submitSearchApi(targetQuery);

      setTimeout(() => {
        // Step 3: Reveal new regenerated output
        setRegeneratePhase("idle");
      }, 1000);
    }, 1000);
  };

  // Handle Search Submission from bottom bar
  const handleSearch = (typedQuery) => {
    handleRegenerate(typedQuery);
  };

  // Handle Category Selection via Chips
  const handleSelectCategory = (catId) => {
    if (catId === "all") {
      handleRegenerate("All Software");
    } else {
      const target = categoriesList.find((c) => c.id === catId);
      if (target) {
        handleRegenerate(target.name);
      }
    }
  };

  // Handle Sub-Type Selection
  const handleSelectSubType = (subType) => {
    setActiveSubType(subType);
    showToast(`Filtered by ${subType}`, "info");
  };

  // Back to All Software
  const handleBackToAll = () => {
    handleRegenerate("All Software");
  };

  // Currency Toggle (USD <-> INR)
  const handleToggleCurrency = () => {
    const next = currency === "USD" ? "INR" : "USD";
    setCurrency(next);
    updateUrlParams(currentQuery, activeCategory.id === "all" ? null : activeCategory.id, next === "INR" ? "IN" : null);
    showToast(`Currency converted to ${next === "INR" ? "Indian Rupee (₹)" : "US Dollar ($)"}`);
  };

  // Compare Toggle
  const handleToggleCompare = (vendor) => {
    if (!vendor) {
      setSelectedForCompare([]);
      return;
    }

    const exists = selectedForCompare.some((v) => v.id === vendor.id);
    if (exists) {
      setSelectedForCompare(selectedForCompare.filter((v) => v.id !== vendor.id));
    } else {
      if (selectedForCompare.length >= 3) {
        showToast("Maximum 3 vendors can be compared simultaneously", "error");
        return;
      }
      setSelectedForCompare([...selectedForCompare, vendor]);
    }
  };

  // Remove vendor from compare
  const handleRemoveFromCompare = (vendorId) => {
    setSelectedForCompare(selectedForCompare.filter((v) => v.id !== vendorId));
  };

  // Filter and Rank Vendors
  const displayedVendors = useMemo(() => {
    let list = filterVendors(vendorsList, {
      categoryId: activeCategory.id,
      subType: activeSubType,
    });

    if (activeCategory.id === "all" && activeSubType === "All") {
      const topPicks = [];
      const seenCats = new Set();
      for (const v of vendorsList) {
        if (!seenCats.has(v.categoryId)) {
          seenCats.add(v.categoryId);
          topPicks.push(v);
        }
      }
      list = topPicks;
    }

    if (Object.keys(guidedAnswers).length > 0) {
      list = rankVendors(list, guidedAnswers, activeCategory.id);
    }

    return list;
  }, [vendorsList, activeCategory, activeSubType, guidedAnswers]);

  const topRecommendation = useMemo(() => {
    if (Object.keys(guidedAnswers).length > 0 && displayedVendors.length > 0) {
      return displayedVendors[0];
    }
    return null;
  }, [displayedVendors, guidedAnswers]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground bg-grid-subtle transition-colors">
      {/* Global Header */}
      <Header
        categoryName={activeCategory.name}
        categoryId={activeCategory.id}
        currency={currency}
        onCurrencyToggle={handleToggleCurrency}
        onOpenVendorDesk={() => setVendorDeskOpen(true)}
        onResetAll={handleBackToAll}
        vendorCount={vendorsList.length}
        onShowToast={showToast}
      />

      {/* Main Content Area - Center Single Column with Responsive Desktop Layout */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-36 space-y-4 sm:space-y-6">
        {/* FR-1: Query Bubble with ChatGPT/Gemini style regeneration trigger */}
        <QueryBubble
          query={currentQuery}
          onUpdateQuery={handleSearch}
          onRegenerate={handleRegenerate}
          isRegenerating={regeneratePhase !== "idle"}
          onShowToast={showToast}
        />

        {/* Regeneration State (Refined Linear-grade Minimalist Loading) */}
        {regeneratePhase === "generating" ? (
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-md space-y-5 text-center animate-in fade-in duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted border border-border text-foreground shadow-2xs">
              <Loader2 className="w-6 h-6 animate-spin text-foreground" />
            </div>
            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-foreground">
                Synthesizing Pricing Intelligence
              </h3>
              <p className="text-xs text-muted-foreground">
                Recalculating rate sheets and benchmark models for &ldquo;{currentQuery}&rdquo;...
              </p>
            </div>
            {/* Minimalist Shimmer Lines */}
            <div className="space-y-2 max-w-xs mx-auto pt-2">
              <div className="h-1.5 bg-muted rounded-full w-full animate-pulse" />
              <div className="h-1.5 bg-muted/70 rounded-full w-3/4 mx-auto animate-pulse" />
            </div>
          </div>
        ) : (
          /* Primary Dynamic Content Container with 1s dissolving clearing transition */
          <div
            className={`space-y-6 transition-all ease-in-out ${
              regeneratePhase === "clearing"
                ? "duration-1000 opacity-0 -translate-y-4 blur-xs scale-[0.98] pointer-events-none"
                : "duration-700 opacity-100 translate-y-0 blur-none scale-100"
            }`}
          >
            {/* FR-2: Summary Section */}
            <SummarySection
              summaryText={activeCategory.summaryTemplate}
              sources={activeCategory.sources}
              vendors={displayedVendors}
              query={currentQuery}
              categoryName={activeCategory.name}
              currency={currency}
              onShowToast={showToast}
            />

            {/* FR-4: Video Section with Chapters */}
            <VideoSection video={activeCategory.video} category={activeCategory} />

            {/* FR-5 & FR-6: Subcategory & Sub-type Chips */}
            <CategoryChips
              categories={categoriesList}
              activeCategory={activeCategory}
              activeSubType={activeSubType}
              onSelectCategory={handleSelectCategory}
              onSelectSubType={handleSelectSubType}
              onBackToAll={handleBackToAll}
            />

            {/* FR-7: Hero Tool (Pricing Cost Calculator) */}
            <PricingCalculator
              vendors={displayedVendors}
              currency={currency}
              activeVendorId={displayedVendors[0]?.id}
            />

            {/* FR-8: Guided Conversation (4 Questions) */}
            <GuidedFlow
              activeAnswers={guidedAnswers}
              onAnswersChange={setGuidedAnswers}
              topRecommendation={topRecommendation}
              onShowToast={showToast}
            />

            {/* FR-9: Software Result Cards & Floating Compare Bar */}
            <ResultCards
              vendors={displayedVendors}
              selectedForCompare={selectedForCompare}
              onToggleCompare={handleToggleCompare}
              onOpenDetails={(vendor) => setDetailVendor(vendor)}
              currency={currency}
              onOpenComparePanel={() => setComparePanelOpen(true)}
              onShowToast={showToast}
            />

            {/* FR-17: Bonus Financial Toolkit */}
            <SaaSBonusToolkit currency={currency} />

            {/* FR-13: Price Watch Newsletter Signup */}
            <PriceWatchNewsletter onShowToast={showToast} />

            {/* FR-14: Follow-up Questions & Answer Toolbar */}
            <FollowUpQuestions questions={activeCategory.followUps} />

            <AnswerToolbar
              summaryText={activeCategory.summaryTemplate}
              onRefresh={() => {
                handleRegenerate(currentQuery);
              }}
              onShowToast={showToast}
            />

            {/* FR-12: Mandatory Pricing Disclaimer */}
            <Disclaimer />
          </div>
        )}
      </main>

      {/* FR-10: Comparison Panel Modal / Side Sheet */}
      {comparePanelOpen && (
        <ComparisonPanel
          vendors={selectedForCompare}
          onRemoveVendor={handleRemoveFromCompare}
          onClose={() => setComparePanelOpen(false)}
          currency={currency}
          billingCycle="annual"
        />
      )}

      {/* FR-11: Vendor Detail Sheet */}
      {detailVendor && (
        <VendorDetailSheet
          vendor={detailVendor}
          onClose={() => setDetailVendor(null)}
          currency={currency}
        />
      )}

      {/* FR-18: Bonus Searchable Vendor Side Desk */}
      <VendorSideDesk
        vendors={vendorsList}
        isOpen={vendorDeskOpen}
        onClose={() => setVendorDeskOpen(false)}
        onSelectVendor={(v) => {
          setDetailVendor(v);
        }}
      />

      {/* FR-15: Fixed Search Bar at Bottom */}
      <FixedSearchBar
        placeholder={activeCategory.searchPlaceholder}
        onSubmitSearch={handleSearch}
        currentQuery={currentQuery}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
