"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import type { CheckDef, CheckResult, CheckStatus } from "./types";

// ─── Icon badge ───────────────────────────────────────────────────────────────

function StatusIcon({
  status,
  Icon,
}: {
  status: CheckStatus;
  Icon: React.ElementType;
}) {
  const base =
    "w-[28px] h-[28px] rounded-lg flex items-center justify-center flex-shrink-0";

  if (status === "running")
    return (
      <span className={`${base} bg-blue-50 dark:bg-blue-950/60`}>
        <Loader2 className="w-3.5 h-3.5 text-[#0790e8] animate-spin" />
      </span>
    );
  if (status === "pass")
    return (
      <span className={`${base} bg-emerald-50 dark:bg-emerald-950/60`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      </span>
    );
  if (status === "warn")
    return (
      <span className={`${base} bg-amber-50 dark:bg-amber-950/60`}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
      </span>
    );
  if (status === "fail")
    return (
      <span className={`${base} bg-red-50 dark:bg-red-950/60`}>
        <XCircle className="w-3.5 h-3.5 text-red-500" />
      </span>
    );
  return (
    <span className={`${base} bg-gray-100 dark:bg-gray-800`}>
      <Icon className="w-3.5 h-3.5 text-gray-400" />
    </span>
  );
}

// ─── Border / background per status ──────────────────────────────────────────

function itemClass(status: CheckStatus) {
  if (status === "running")
    return "border-[#0790e8]  bg-blue-50/40    dark:bg-blue-950/10";
  if (status === "pass")
    return "border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/10 dark:border-emerald-800/60";
  if (status === "warn")
    return "border-amber-200  bg-amber-50/30   dark:bg-amber-950/10  dark:border-amber-800/60";
  if (status === "fail")
    return "border-red-200    bg-red-50/30     dark:bg-red-950/10    dark:border-red-800/60";
  return "border-gray-100 dark:border-gray-800/80";
}

// ─── Status message ───────────────────────────────────────────────────────────

function StatusMsg({
  status,
  check,
  finding,
}: {
  status: CheckStatus;
  check: CheckDef;
  finding?: string;
}) {
  const map: Record<CheckStatus, string> = {
    idle: "",
    running: "text-[#0790e8]",
    pass: "text-emerald-600",
    warn: "text-amber-500",
    fail: "text-red-500",
  };
  const text =
    status === "running"
      ? check.runningMsg
      : status === "pass"
        ? (finding ?? "No issues found")
        : status === "warn"
          ? (finding ?? "Possible concern")
          : status === "fail"
            ? (finding ?? "Issue detected")
            : "";

  if (!text) return null;
  return (
    <motion.p
      key={status}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-[11px] font-medium mt-1.5 ${map[status]}`}
    >
      {text}
    </motion.p>
  );
}

// ─── CheckItem ────────────────────────────────────────────────────────────────

interface Props {
  check: CheckDef;
  result: CheckResult | undefined;
  index: number;
}

export function CheckItem({ check, result, index }: Props) {
  const status: CheckStatus = result?.status ?? "idle";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 p-3 rounded-xl border transition-colors duration-300 ${itemClass(status)}`}
    >
      <StatusIcon status={status} Icon={check.icon} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-900 dark:text-white leading-tight">
          {check.name}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">
          {check.shortDesc}
        </p>
        <AnimatePresence mode="wait">
          {status !== "idle" && (
            <StatusMsg
              key={status}
              status={status}
              check={check}
              finding={result?.finding}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
