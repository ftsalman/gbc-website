import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

const ToastContext = createContext(() => {});

/** Usage: const toast = useToast(); toast({ type: "success" | "error", title, message }) */
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  // Content is kept after closing so it can fade out.
  const [toast, setToast] = useState({ open: false, type: "success", title: "", message: "", id: 0 });

  const show = useCallback(
    ({ type = "success", title = "", message = "" }) =>
      setToast((current) => ({ open: true, type, title, message, id: current.id + 1 })),
    [],
  );
  const close = () => setToast((current) => ({ ...current, open: false }));

  useEffect(() => {
    if (!toast.open) return;
    const timer = setTimeout(close, 5000);
    return () => clearTimeout(timer);
  }, [toast.open, toast.id]);

  const isError = toast.type === "error";

  return (
    <ToastContext.Provider value={show}>
      {children}
      {/* Portalled to body so no transformed ancestor can offset it */}
      {createPortal(
        <div
          role={isError ? "alert" : "status"}
          aria-live={isError ? "assertive" : "polite"}
          className={`fixed top-6 left-1/2 z-[10000] w-full max-w-md -translate-x-1/2 px-4 transition-all duration-300 ease-out ${
            toast.open
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-6 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`flex w-full items-start gap-3 rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur-md ${
              isError ? "border-[#fecaca]" : "border-[#e5e5e5]"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                isError ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#f5f5f5] text-bordeaux"
              }`}
            >
              {isError ? <CircleAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className={`text-sm font-semibold ${isError ? "text-[#b91c1c]" : "text-black"}`}>
                {toast.title}
              </h4>
              <p className="mt-0.5 text-xs text-[#666666]">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close notification"
              className="rounded-lg p-1 text-[#666666] transition hover:bg-[#f5f5f5] hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
