import React, { useState } from "react";
import { Copy, Check, BookOpen, Code, Sparkles, Terminal, ShieldCheck, Database, FileText } from "lucide-react";
import { FLUTTER_DART_CODE, FLUTTER_CODE_EXPLAINER, FIRESTORE_RULES, DART_DATABASE_SERVICE, BACKEND_REPORT_FUNCTION } from "../data/flutterCode";

export default function FlutterCodeViewer() {
  const [activeTab, setActiveTab] = useState<"code" | "database" | "rules" | "backend" | "guide">("code");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let textToCopy = "";
    if (activeTab === "code") textToCopy = FLUTTER_DART_CODE;
    else if (activeTab === "database") textToCopy = DART_DATABASE_SERVICE;
    else if (activeTab === "rules") textToCopy = FIRESTORE_RULES;
    else if (activeTab === "backend") textToCopy = BACKEND_REPORT_FUNCTION;
    else textToCopy = FLUTTER_CODE_EXPLAINER;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case "code": return "lib/main.dart (Flutter UI Screens)";
      case "database": return "lib/database_service.dart (Firebase Transactions)";
      case "rules": return "firestore.rules (Firestore Security)";
      case "backend": return "functions/index.js (Scheduled PDF Generator)";
      case "guide": return "Getting Started Guide";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* Code Header with Actions & Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-[#0052CC]/10 p-1.5 rounded-lg">
            <Code className="h-5 w-5 text-[#0052CC]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-[#0A2540] text-sm md:text-base">
              {getActiveTabTitle()}
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Corner Streams Business architecture modules
            </p>
          </div>
        </div>

        {/* Copy trigger and Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 ${
              copied
                ? "bg-[#00875A] text-white"
                : "bg-[#0052CC] text-white hover:bg-[#0052CC]/90 active:scale-95"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied Component!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy File</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex bg-slate-50/50 border-b border-slate-200 px-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("code")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            activeTab === "code"
              ? "border-[#0052CC] text-[#0052CC]"
              : "border-transparent text-slate-500 hover:text-[#0A2540]"
          }`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>main.dart</span>
        </button>

        <button
          onClick={() => setActiveTab("database")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            activeTab === "database"
              ? "border-[#0052CC] text-[#0052CC]"
              : "border-transparent text-slate-500 hover:text-[#0A2540]"
          }`}
        >
          <Database className="h-3.5 w-3.5" />
          <span>database_service.dart</span>
        </button>

        <button
          onClick={() => setActiveTab("rules")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            activeTab === "rules"
              ? "border-[#0052CC] text-[#0052CC]"
              : "border-transparent text-slate-500 hover:text-[#0A2540]"
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>firestore.rules</span>
        </button>

        <button
          onClick={() => setActiveTab("backend")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            activeTab === "backend"
              ? "border-[#0052CC] text-[#0052CC]"
              : "border-transparent text-slate-500 hover:text-[#0A2540]"
          }`}
        >
          <Terminal className="h-3.5 w-3.5" />
          <span>functions/index.js</span>
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            activeTab === "guide"
              ? "border-[#0052CC] text-[#0052CC]"
              : "border-transparent text-slate-500 hover:text-[#0A2540]"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Getting Started Guide</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto font-mono text-xs p-5 bg-[#0A2540]/5 min-h-[480px]">
        {activeTab === "code" ? (
          <div className="relative">
            <pre className="text-[#0A2540] whitespace-pre overflow-x-auto leading-relaxed select-text p-1 font-mono">
              {FLUTTER_DART_CODE.split("\n").map((line, idx) => {
                let renderedLine: React.ReactNode = line;
                if (line.startsWith("//") || line.startsWith("///") || line.includes("/*") || line.includes("*/")) {
                  renderedLine = <span className="text-slate-400 italic">{line}</span>;
                } else if (line.trim().startsWith("class ") || line.trim().startsWith("extends ") || line.trim().startsWith("implements ")) {
                  const parts = line.split(" ");
                  renderedLine = (
                    <span>
                      {parts.map((p, i) => {
                        if (["class", "extends", "implements", "const", "final"].includes(p)) {
                          return <span key={i} className="text-pink-600 font-bold">{p} </span>;
                        }
                        if (p.endsWith("Screen") || p.endsWith("App") || p.endsWith("State") || p.endsWith("Painter") || p.endsWith("Delegate") || p === "CustomPainter" || p === "StatelessWidget" || p === "StatefulWidget" || p === "BuildContext" || p === "MaterialApp" || p === "Widget") {
                          return <span key={i} className="text-[#0052CC] font-semibold">{p} </span>;
                        }
                        return p + " ";
                      })}
                    </span>
                  );
                }
                return (
                  <div key={idx} className="flex hover:bg-slate-200/50 px-1 py-0.5 rounded">
                    <span className="w-8 text-right select-none pr-3 text-slate-400 font-sans text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-left">{renderedLine}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        ) : activeTab === "database" ? (
          <div className="relative">
            <pre className="text-[#0A2540] whitespace-pre overflow-x-auto leading-relaxed select-text p-1 font-mono">
              {DART_DATABASE_SERVICE.split("\n").map((line, idx) => {
                let renderedLine: React.ReactNode = line;
                if (line.trim().startsWith("//") || line.trim().startsWith("///")) {
                  renderedLine = <span className="text-slate-400 italic">{line}</span>;
                } else if (line.trim().startsWith("class ") || line.trim().startsWith("Future<") || line.trim().startsWith("Stream<")) {
                  renderedLine = <span className="text-[#0052CC] font-semibold">{line}</span>;
                }
                return (
                  <div key={idx} className="flex hover:bg-slate-200/50 px-1 py-0.5 rounded">
                    <span className="w-8 text-right select-none pr-3 text-slate-400 font-sans text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-left">{renderedLine}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        ) : activeTab === "rules" ? (
          <div className="relative">
            <pre className="text-[#0A2540] whitespace-pre overflow-x-auto leading-relaxed select-text p-1 font-mono">
              {FIRESTORE_RULES.split("\n").map((line, idx) => {
                let renderedLine: React.ReactNode = line;
                if (line.trim().startsWith("//") || line.trim().startsWith("/*")) {
                  renderedLine = <span className="text-slate-400 italic">{line}</span>;
                } else if (line.includes("allow ") || line.includes("match ")) {
                  renderedLine = <span className="text-[#0052CC] font-bold">{line}</span>;
                }
                return (
                  <div key={idx} className="flex hover:bg-slate-200/50 px-1 py-0.5 rounded">
                    <span className="w-8 text-right select-none pr-3 text-slate-400 font-sans text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-left">{renderedLine}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        ) : activeTab === "backend" ? (
          <div className="relative">
            <pre className="text-[#0A2540] whitespace-pre overflow-x-auto leading-relaxed select-text p-1 font-mono">
              {BACKEND_REPORT_FUNCTION.split("\n").map((line, idx) => {
                let renderedLine: React.ReactNode = line;
                const trimmed = line.trim();
                if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
                  renderedLine = <span className="text-slate-400 italic">{line}</span>;
                } else if (trimmed.startsWith("const ") || trimmed.startsWith("let ") || trimmed.startsWith("exports.") || line.includes("require(")) {
                  renderedLine = <span className="text-[#0052CC] font-semibold">{line}</span>;
                }
                return (
                  <div key={idx} className="flex hover:bg-slate-200/50 px-1 py-0.5 rounded">
                    <span className="w-8 text-right select-none pr-3 text-slate-400 font-sans text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-left">{renderedLine}</span>
                  </div>
                );
              })}
            </pre>
          </div>
        ) : (
          <div className="font-sans text-slate-600 leading-relaxed max-w-2xl mx-auto space-y-6 pt-2">
            <div className="bg-blue-50 border border-blue-200/60 p-4 rounded-xl flex gap-3">
              <Sparkles className="h-5 w-5 text-[#0052CC] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0A2540] text-sm">
                  Smart Transaction decrement Built-In!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  The provided Dart code implements atomic transactions using Cloud Firestore. When recording checkout operations on the digital register, stock values are safely verified and decremented server-side, preventing overselling in high-concurrency environments!
                </p>
              </div>
            </div>

            {/* Expander description details */}
            <div className="space-y-4 text-left">
              <h4 className="font-display font-bold text-[#0A2540] text-sm flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-slate-600" />
                <span>Pubspec dependency manifest</span>
              </h4>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-[11px] space-y-1">
                <p className="text-slate-500"># pubspec.yaml</p>
                <p className="text-teal-400">dependencies:</p>
                <p className="text-teal-300">  flutter:</p>
                <p className="text-amber-500">    sdk: flutter</p>
                <p className="text-[#60A5FA]">  firebase_core: ^2.24.0</p>
                <p className="text-[#60A5FA]">  firebase_auth: ^4.15.0</p>
                <p className="text-[#60A5FA]">  cloud_firestore: ^4.13.0</p>
                <p className="text-[#60A5FA]">  google_fonts: ^6.1.0</p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="font-display font-bold text-[#0A2540] text-sm flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#00875A]" />
                <span>Security Rules Enforcement Checks</span>
              </h4>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-2">
                <li>
                  <strong className="text-slate-700">Authenticated Scope Only</strong>: Rejects read or write requests unless <code className="font-mono bg-slate-100 text-[#0052CC] px-1 py-0.5 rounded text-[10px]">request.auth</code> is non-null.
                </li>
                <li>
                  <strong className="text-slate-700">User ID Matching Isolation</strong>: Guarantees users can only access document lists where the <code className="font-mono bg-slate-100 text-[#0052CC] px-1.5 py-0.5 rounded text-[10px]">userId</code> field matches they own authenticated token.
                </li>
                <li>
                  <strong className="text-slate-700">Safe Creation Bounds</strong>: Prevents users from fabricating transaction papers under other vendor names or user IDs.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Code Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-between items-center text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00875A] inline-block animate-pulse"></span>
          <span>Security & Data Sync Subsystem Connected</span>
        </span>
        <span>Version 1.1</span>
      </div>
    </div>
  );
}
