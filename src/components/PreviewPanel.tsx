"use client";

import { motion } from "framer-motion";
import type { CheckDef } from "./types";

interface Props {
  safetyChecks: CheckDef[];
  vulnChecks: CheckDef[];
  /** "left" or "right" side for enter animation */
  side: "left" | "right";
}

function PreviewList({
  checks,
  label,
  side,
}: {
  checks: CheckDef[];
  label: string;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1.5"
    >
      <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      {checks.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <span className="w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <Icon className="w-3 h-3 text-gray-400" />
            </span>
            <p className="text-[12px] text-gray-500 dark:text-gray-400">
              {c.name}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function PreviewPanel({ safetyChecks, vulnChecks, side }: Props) {
  const checks = side === "left" ? safetyChecks : vulnChecks;
  const label = side === "left" ? "Safety checks" : "Vulnerability checks";
  return <PreviewList checks={checks} label={label} side={side} />;
}
