export default function Disclaimer() {
  return (
    <div className="py-4 text-center space-y-1 border-t border-border/80">
      <p className="text-[11px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Independent software pricing intelligence and benchmark directory. Not an authorized reseller or broker.
        Published list rates checked as of 2026. Applicable taxes, VAT, and contract negotiations may vary.
      </p>

      <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground/70 pt-0.5">
        <button
          onClick={() => alert("Privacy Policy: All searches and comparisons are stored locally in your browser. No third-party tracking scripts are active.")}
          className="hover:underline hover:text-foreground"
        >
          Privacy Policy
        </button>
        <span>•</span>
        <button
          onClick={() => alert("Terms of Service: Benchmark estimates provided for organizational planning and evaluation purposes only.")}
          className="hover:underline hover:text-foreground"
        >
          Terms of Service
        </button>
      </div>
    </div>
  );
}
