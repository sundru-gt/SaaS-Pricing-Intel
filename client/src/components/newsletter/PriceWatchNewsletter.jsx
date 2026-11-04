import { useState } from "react";
import { Mail, Check, AlertCircle, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { subscribeNewsletterApi } from "../../lib/api.js";

export default function PriceWatchNewsletter({ onShowToast }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [persistedLocation, setPersistedLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }

    if (!consent) {
      setErrorMsg("Consent checkbox is required to subscribe.");
      return;
    }

    setStatus("loading");

    try {
      const res = await subscribeNewsletterApi(email, consent);
      if (res && res.success) {
        setPersistedLocation(res.persisted || "server");
        setStatus("success");
        onShowToast?.("Subscribed to The Price Watch digest!");
      } else {
        setErrorMsg(res.message || "Subscription could not be processed.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Failed to connect to subscription service.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4 transition-all relative overflow-hidden">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground flex-shrink-0">
          <Mail className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider font-mono">
            The Price Watch
          </h3>
          <p className="text-xs text-muted-foreground">
            Weekly digest of B2B SaaS pricing movements, plan restructuring, and contract inflation.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="p-4 rounded-xl bg-muted/50 border border-border text-foreground space-y-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
            <span>Subscription Confirmed</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Registered work email <strong>{email}</strong> ({persistedLocation === "mongodb" ? "MongoDB Atlas" : "In-Memory Store"}). Zero spam, unsubscribe anytime with one click.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
              Work Email Address
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="you@company.com"
                className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm outline-none focus:border-foreground/50 transition-colors placeholder:text-muted-foreground font-mono"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-4 py-2 rounded-xl bg-[#8E2631] text-white dark:bg-[#7C3AED] dark:text-white dark:shadow-[0_0_12px_rgba(124,58,237,0.4)] text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs flex-shrink-0 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2 pt-0.5">
            <input
              type="checkbox"
              id="price-watch-consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errorMsg) setErrorMsg("");
              }}
              className="mt-0.5 w-4 h-4 rounded border-border accent-foreground cursor-pointer"
            />
            <label
              htmlFor="price-watch-consent"
              className="text-[11px] sm:text-xs text-muted-foreground cursor-pointer select-none leading-relaxed"
            >
              I consent to receiving SaaS pricing intelligence updates. No promotional ads or third-party sharing.
            </label>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
