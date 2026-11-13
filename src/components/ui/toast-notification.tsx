import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({
      title,
      description,
      type = "success",
      duration = 4000,
    }: {
      title: string;
      description?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, description, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, description?: string) => addToast({ title, description, type: "success" }),
    [addToast]
  );
  const error = useCallback(
    (title: string, description?: string) => addToast({ title, description, type: "error" }),
    [addToast]
  );
  const warning = useCallback(
    (title: string, description?: string) => addToast({ title, description, type: "warning" }),
    [addToast]
  );
  const info = useCallback(
    (title: string, description?: string) => addToast({ title, description, type: "info" }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, warning, info }}>
      {children}
      {/* Toast Notification Container with Mobile Safe-Area Spacing */}
      <aside
        aria-live="polite"
        aria-atomic="false"
        className="fixed z-[100] pointer-events-none flex flex-col gap-2.5 max-w-md bottom-[max(1rem,env(safe-area-inset-bottom,16px))] left-3 right-3 items-center sm:bottom-6 sm:right-6 sm:left-auto sm:items-end sm:w-[calc(100vw-3rem)]"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 w-full sm:w-auto max-w-sm sm:max-w-md ${
              t.type === "success"
                ? "bg-slate-900/95 text-white border-emerald-500/50 shadow-emerald-950/20"
                : t.type === "error"
                ? "bg-slate-900/95 text-white border-rose-500/50 shadow-rose-950/20"
                : t.type === "warning"
                ? "bg-slate-900/95 text-white border-amber-500/50 shadow-amber-950/20"
                : "bg-slate-900/95 text-white border-blue-500/50 shadow-blue-950/20"
            }`}
          >
            {/* Small vertically aligned icon */}
            <span className="shrink-0 flex items-center justify-center">
              {t.type === "success" && <CheckCircle2 className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-emerald-400" />}
              {t.type === "error" && <XCircle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-rose-400" />}
              {t.type === "warning" && <AlertTriangle className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-amber-400" />}
              {t.type === "info" && <Info className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-sky-400" />}
            </span>

            {/* Vertically aligned message text */}
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="font-semibold text-xs sm:text-sm tracking-tight text-white leading-tight">
                {t.title}
              </h5>
              {t.description && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-snug line-clamp-2">
                  {t.description}
                </p>
              )}
            </div>

            {/* Clearly visible close 'X' button on right */}
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition-colors p-1.5 -mr-1 rounded-lg hover:bg-slate-800/80 active:bg-slate-700 shrink-0 flex items-center justify-center min-w-[28px] min-h-[28px]"
              aria-label="Close notification"
            >
              <X size={15} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

