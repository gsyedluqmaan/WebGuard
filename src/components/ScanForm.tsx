"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Loader2 } from "lucide-react";
import type { ScanMode } from "./types";

interface Props {
  url: string;
  scanning: boolean;
  scanMode: ScanMode | null;
  onChange: (v: string) => void;
  onScan: (mode: ScanMode) => void;
  /** When true, form is in "side" mode (left-aligned, smaller) */
  compact: boolean;
}

export function ScanForm({
  url,
  scanning,
  scanMode,
  onChange,
  onScan,
  compact,
}: Props) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 ${
        compact ? "w-full" : "w-full max-w-md mx-auto"
      }`}
    >
      {/* Logo */}
      <motion.div layout className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 bg-[#0790e8] rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            WebGuard
          </p>
          <p className="text-[11px] text-gray-400">
            Detect vulnerabilities instantly
          </p>
        </div>
      </motion.div>

      {/* Hero text — hidden in compact mode */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-5"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1.5">
            Scan any website for risks
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
            WebGuard runs security checks including headers, XSS, SQL injection,
            exposed endpoints, and suspicious scripts — giving you a full
            picture in seconds.
          </p>
        </motion.div>
      )}

      {/* URL input */}
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        disabled={scanning}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onScan("safety")}
        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white outline-none focus:border-[#0790e8] focus:ring-2 focus:ring-[#0790e8]/10 transition-all disabled:opacity-50 font-mono"
      />

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onScan("safety")}
          disabled={scanning || !url}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium rounded-lg border border-[#0790e8] text-[#0790e8] hover:bg-[#0790e8]/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {scanning && scanMode === "safety" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Shield className="w-3.5 h-3.5" />
          )}
          Safety check
        </button>
        <button
          onClick={() => onScan("vulnerability")}
          disabled={scanning || !url}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium rounded-lg bg-[#0790e8] text-white hover:bg-[#0681d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {scanning && scanMode === "vulnerability" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5" />
          )}
          Vuln scan
        </button>
      </div>

      {/* Compact: show current scan label */}
      {compact && scanMode && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-gray-400 mt-3 text-center"
        >
          {scanMode === "safety" ? "5 safety checks" : "7 vulnerability checks"}
        </motion.p>
      )}
    </motion.div>
  );
}
