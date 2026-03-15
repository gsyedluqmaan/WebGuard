"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SAFETY_CHECKS,
  VULN_CHECKS,
  MOCK_FINDINGS,
  MOCK_RESULTS,
  delay,
  type ScanMode,
  type CheckResult,
  type ScanResult,
} from "./types";
import { ScanForm } from "./ScanForm";
import { CheckPanel } from "./CheckPanel";
import { ResultCard } from "./ResultCard";
import { PreviewPanel } from "./PreviewPanel";

type Phase = "idle" | "scanning" | "done";

export default function Scanner() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<ScanMode | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [checkResults, setChecks] = useState<Record<string, CheckResult>>({});
  const [result, setResult] = useState<ScanResult | null>(null);
  const abortRef = useRef(false);

  const checks = mode === "safety" ? SAFETY_CHECKS : VULN_CHECKS;

  const startScan = async (scanMode: ScanMode) => {
    if (!url || phase === "scanning") return;
    abortRef.current = false;
    setMode(scanMode);
    setResult(null);
    setChecks({});
    setPhase("scanning");

    const defs = scanMode === "safety" ? SAFETY_CHECKS : VULN_CHECKS;

    for (const c of defs) {
      if (abortRef.current) break;
      setChecks((p) => ({ ...p, [c.id]: { status: "running" } }));
      await delay(480 + Math.random() * 580);
      if (abortRef.current) break;
      const mock = MOCK_FINDINGS[c.id] ?? {
        status: "pass",
        finding: "No issues found",
      };
      setChecks((p) => ({ ...p, [c.id]: mock }));
    }

    if (!abortRef.current) {
      // ── Replace with your real API call ──────────────────────────────────
      // try {
      //   const res = await fetch("http://localhost:5000/api/scan", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ url, mode: scanMode }),
      //   });
      //   setResult(await res.json());
      // } catch { alert("Scan failed"); }
      //
      setResult(MOCK_RESULTS[scanMode]);
      setPhase("done");
    }
  };

  const scanning = phase === "scanning";
  const started = phase === "scanning" || phase === "done";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 px-4 py-10">
      <AnimatePresence mode="wait">
        {/* ── Phase 0: idle — centered form + preview columns ─────────── */}
        {!started && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full mx-auto grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            {/* Left preview */}
            <PreviewPanel
              safetyChecks={SAFETY_CHECKS}
              vulnChecks={VULN_CHECKS}
              side="left"
            />

            {/* Center form */}
            <div className="w-[340px]">
              <ScanForm
                url={url}
                scanning={false}
                scanMode={null}
                onChange={setUrl}
                onScan={startScan}
                compact={false}
              />
            </div>

            {/* Right preview */}
            <PreviewPanel
              safetyChecks={SAFETY_CHECKS}
              vulnChecks={VULN_CHECKS}
              side="right"
            />
          </motion.div>
        )}

        {/* ── Phase 1 & 2: scanning / done — split layout ─────────────── */}
        {started && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full mx-auto grid grid-cols-[1fr_auto_1fr] gap-6 items-start"
          >
            {/* Left: checks list */}
            <CheckPanel
              checks={checks}
              checkResults={checkResults}
              scanning={scanning}
              side="left"
            />

            {/* Center: compact form */}
            <div className="w-[280px] sticky top-8">
              <ScanForm
                url={url}
                scanning={scanning}
                scanMode={mode}
                onChange={setUrl}
                onScan={startScan}
                compact={true}
              />

              {/* Scanning progress indicator */}
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 text-center"
                  >
                    <p className="text-[11px] text-gray-400">
                      {
                        Object.values(checkResults).filter(
                          (r) => r.status !== "running",
                        ).length
                      }
                      {" / "}
                      {checks.length} checks done
                    </p>
                    <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#0790e8] rounded-full"
                        animate={{
                          width: `${(
                            (Object.values(checkResults).filter(
                              (r) => r.status !== "running",
                            ).length /
                              checks.length) *
                            100
                          ).toFixed(0)}%`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* New scan button after done */}
              <AnimatePresence>
                {phase === "done" && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      abortRef.current = true;
                      setPhase("idle");
                      setMode(null);
                      setChecks({});
                      setResult(null);
                    }}
                    className="w-full mt-3 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    ← New scan
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Right: result card (or placeholder while scanning) */}
            <div>
              <AnimatePresence mode="wait">
                {result ? (
                  <ResultCard key="result" result={result} />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 p-8 text-center"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-[#0790e8]/30 border-t-[#0790e8] animate-spin mx-auto mb-3" />
                    <p className="text-xs text-gray-400">
                      Results will appear here
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
