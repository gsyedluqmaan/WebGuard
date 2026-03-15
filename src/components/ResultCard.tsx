"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import {
  type ScanResult,
  type Severity,
  BADGE,
  BAR_COLOR,
  SEVERITY_DOT,
} from "./types";

interface Props {
  result: ScanResult;
}

export function ResultCard({ result }: Props) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(0);
    let current = 0;
    const target = result.score;
    const step = Math.ceil(target / 32);
    const t = setInterval(() => {
      current = Math.min(current + step, target);
      setScore(current);
      if (current >= target) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [result]);

  const items =
    result.mode === "safety_check" ? result.dangers : result.vulnerabilities;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Score header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold tabular-nums text-gray-900 dark:text-white">
              {score}
            </span>
            <span className="text-sm text-gray-400">/100</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {result.mode === "vulnerability_scan"
              ? `${result.pagesFound ?? 0} pages scanned`
              : "User safety score"}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${BADGE[result.safety]}`}
        >
          {result.safety}
        </span>
      </div>

      {/* Score bar */}
      <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800">
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${BAR_COLOR[result.safety]}`}
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-gray-400">Dangerous</span>
          <span className="text-[10px] text-gray-400">Safe</span>
        </div>
      </div>

      {/* Findings */}
      <div className="px-5 py-4 flex-1">
        {items && items.length > 0 ? (
          <>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-3">
              Findings
            </p>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3 py-2.5"
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${SEVERITY_DOT[item.severity as Severity]}`}
                  />
                  <div>
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">
                      {item.type}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 capitalize">
                      {item.severity} severity
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </>
        ) : (
          <div className="py-8 text-center">
            <Shield className="w-8 h-8 text-[#0790e8] mx-auto mb-2.5 opacity-40" />
            <p className="text-sm text-gray-400">No issues detected</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
