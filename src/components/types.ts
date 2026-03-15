import {
  Shield,
  Zap,
  Lock,
  Globe,
  Code2,
  FileWarning,
  Database,
  FormInput,
  Eye,
  Search,
} from "lucide-react";

export type Severity = "High" | "Medium" | "Low";
export type CheckStatus = "idle" | "running" | "pass" | "warn" | "fail";
export type ScanMode = "safety" | "vulnerability";
export type SafetyLabel = "SAFE" | "RISKY" | "DANGEROUS";

export interface CheckDef {
  id: string;
  name: string;
  shortDesc: string;
  runningMsg: string;
  icon: React.ElementType;
}

export interface CheckResult {
  status: CheckStatus;
  finding?: string;
}

export interface ScanResult {
  score: number;
  safety: SafetyLabel;
  mode: string;
  pagesFound?: number;
  dangers?: { type: string; severity: Severity }[];
  vulnerabilities?: { type: string; severity: Severity }[];
}

// ─── Check definitions ────────────────────────────────────────────────────────

export const SAFETY_CHECKS: CheckDef[] = [
  {
    id: "https",
    name: "HTTPS security",
    shortDesc: "Ensures the site uses an encrypted HTTPS connection.",
    runningMsg: "Checking connection protocol…",
    icon: Lock,
  },
  {
    id: "domain",
    name: "Suspicious domain keywords",
    shortDesc: "Flags phishing words like login, secure, verify.",
    runningMsg: "Analysing domain name patterns…",
    icon: Globe,
  },
  {
    id: "downloads",
    name: "Dangerous downloads",
    shortDesc: "Scans for .exe, .apk, .bat, .scr links.",
    runningMsg: "Scanning for executable links…",
    icon: FileWarning,
  },
  {
    id: "scripts",
    name: "Suspicious script detection",
    shortDesc: "Detects eval(), atob(), base64 — common in malware.",
    runningMsg: "Analysing script patterns…",
    icon: Code2,
  },
  {
    id: "trackers",
    name: "Tracking script detection",
    shortDesc: "Identifies Google Analytics, Facebook, DoubleClick trackers.",
    runningMsg: "Checking for tracker domains…",
    icon: Eye,
  },
];

export const VULN_CHECKS: CheckDef[] = [
  {
    id: "headers",
    name: "Security headers",
    shortDesc: "Verifies CSP, X-Frame-Options, HSTS, X-XSS-Protection.",
    runningMsg: "Fetching and parsing HTTP headers…",
    icon: Shield,
  },
  {
    id: "opendir",
    name: "Open directory detection",
    shortDesc: "Probes /uploads, /backups, /logs, /admin paths.",
    runningMsg: "Probing common directory paths…",
    icon: Search,
  },
  {
    id: "api",
    name: "Exposed API endpoints",
    shortDesc: "Checks /api, /graphql, /swagger, /openapi.json.",
    runningMsg: "Testing API endpoint accessibility…",
    icon: Globe,
  },
  {
    id: "xss",
    name: "Cross-site scripting (XSS)",
    shortDesc: "Injects payloads and checks for reflection.",
    runningMsg: "Sending XSS payloads and checking reflection…",
    icon: Code2,
  },
  {
    id: "sqli",
    name: "SQL injection",
    shortDesc: "Sends OR 1=1 payloads, watches for DB errors.",
    runningMsg: "Testing SQL injection payloads…",
    icon: Database,
  },
  {
    id: "jspatterns",
    name: "Suspicious JavaScript",
    shortDesc: "Finds eval(), document.write(), innerHTML, atob().",
    runningMsg: "Scanning JS for dangerous patterns…",
    icon: Zap,
  },
  {
    id: "forms",
    name: "Vulnerable form detection",
    shortDesc: "Detects forms exploitable for injection or theft.",
    runningMsg: "Inspecting form elements and inputs…",
    icon: FormInput,
  },
];

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_FINDINGS: Record<
  string,
  { status: CheckStatus; finding: string }
> = {
  https: {
    status: "pass",
    finding: "Site uses HTTPS — connection is encrypted",
  },
  domain: { status: "pass", finding: "No suspicious keywords in domain" },
  downloads: { status: "pass", finding: "No executable download links found" },
  scripts: {
    status: "warn",
    finding: "eval() usage detected — review manually",
  },
  trackers: {
    status: "warn",
    finding: "3 tracking scripts found (Analytics, Meta)",
  },
  headers: {
    status: "fail",
    finding: "Missing Content-Security-Policy header",
  },
  opendir: { status: "pass", finding: "No open directories found" },
  api: { status: "warn", finding: "/graphql endpoint is publicly accessible" },
  xss: { status: "fail", finding: "XSS payload reflected in query param" },
  sqli: { status: "pass", finding: "No SQL error patterns detected" },
  jspatterns: { status: "warn", finding: "document.write() usage detected" },
  forms: { status: "fail", finding: "Password form without CSRF protection" },
};

export const MOCK_RESULTS: Record<ScanMode, ScanResult> = {
  safety: {
    score: 72,
    safety: "RISKY",
    mode: "safety_check",
    dangers: [
      { type: "eval() usage detected", severity: "Medium" },
      { type: "3 tracking scripts found", severity: "Low" },
    ],
  },
  vulnerability: {
    score: 44,
    safety: "DANGEROUS",
    mode: "vulnerability_scan",
    pagesFound: 14,
    vulnerabilities: [
      { type: "XSS payload reflected in query param", severity: "High" },
      { type: "Exposed /graphql endpoint", severity: "High" },
      { type: "Missing Content-Security-Policy", severity: "Medium" },
      { type: "document.write() usage detected", severity: "Low" },
    ],
  },
};

// ─── Style maps ───────────────────────────────────────────────────────────────

export const SEVERITY_DOT: Record<Severity, string> = {
  High: "bg-red-500",
  Medium: "bg-amber-400",
  Low: "bg-[#0790e8]",
};

export const BADGE: Record<SafetyLabel, string> = {
  SAFE: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  RISKY: "bg-amber-50  text-amber-700  border border-amber-200",
  DANGEROUS: "bg-red-50    text-red-700    border border-red-200",
};

export const BAR_COLOR: Record<SafetyLabel, string> = {
  SAFE: "bg-emerald-500",
  RISKY: "bg-amber-400",
  DANGEROUS: "bg-red-500",
};

export function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
