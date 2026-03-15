"use client";

import { motion } from "framer-motion";
import type { CheckDef, CheckResult } from "./types";
import { CheckItem } from "./CheckItem";

interface Props {
  checks: CheckDef[];
  checkResults: Record<string, CheckResult>;
  scanning: boolean;
  /** "left" animates in from left, "right" from right */
  side: "left" | "right";
}

export function CheckPanel({ checks, checkResults, scanning, side }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-2"
    >
      <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        {scanning ? "Running checks" : "Completed checks"}
      </p>
      {checks.map((check, i) => (
        <CheckItem
          key={check.id}
          check={check}
          result={checkResults[check.id]}
          index={i}
        />
      ))}
    </motion.div>
  );
}
