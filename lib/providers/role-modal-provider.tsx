"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export type Role = "parent" | "org" | "director";

type FieldType = "text" | "email" | "select" | "textarea";

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

type RoleConfig = {
  role: Role;
  title: string;
  description: string;
  submitText: string;
  fields: FieldConfig[];
};

const ROLE_CONFIG: Record<Role, RoleConfig> = {
  parent: {
    role: "parent",
    title: "Parents",
    description: "Discovery mode—help us build something useful (no spam).",
    submitText: "Request info",
    fields: [
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      {
        name: "priority",
        label: "What matters most?",
        type: "select",
        options: [
          { label: "Schedules", value: "schedules" },
          { label: "Communication", value: "communication" },
          { label: "Tryouts", value: "tryouts" },
          { label: "Tournaments", value: "tournaments" },
        ],
      },
    ],
  },
  org: {
    role: "org",
    title: "Organizations",
    description: "Want your program listed? Drop your info and we’ll reach out.",
    submitText: "List my organization",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "orgName", label: "Organization name", type: "text", placeholder: "Optional" },
      { name: "city", label: "City", type: "text", placeholder: "Optional" },
    ],
  },
  director: {
    role: "director",
    title: "Tournaments",
    description: "Promote your tournament—let’s learn what you need first.",
    submitText: "Promote my tournament",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "eventName", label: "Tournament name", type: "text", placeholder: "Optional" },
      {
        name: "eventsPerYear",
        label: "Events per year",
        type: "select",
        options: [
          { label: "1–2", value: "1-2" },
          { label: "3–5", value: "3-5" },
          { label: "6+", value: "6plus" },
        ],
      },
      { name: "notes", label: "Anything we should know?", type: "textarea", placeholder: "Optional" },
    ],
  },
};

type RoleModalContextValue = {
  open: (role: Role, meta?: Record<string, any>) => void;
  close: () => void;
  activeRole: Role | null;
};

const RoleModalContext = createContext<RoleModalContextValue | null>(null);

export function useRoleModal() {
  const ctx = useContext(RoleModalContext);
  if (!ctx) throw new Error("useRoleModal must be used within RoleModalProvider");
  return ctx;
}

export function RoleModalProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [meta, setMeta] = useState<Record<string, any> | null>(null);

  const config = useMemo(() => (activeRole ? ROLE_CONFIG[activeRole] : null), [activeRole]);

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const open = (role: Role, meta?: Record<string, any>) => {
    setMeta(meta ?? null); // nice for tracking (source: "hero", etc.)
    setActiveRole(role);
  };
  const close = () => setActiveRole(null);

  useOutsideClick(ref, close);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.body.style.overflow = activeRole ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [activeRole]);

  return (
    <RoleModalContext.Provider value={{ open, close, activeRole }}>
      {children}

      {/* Overlay */}
      <AnimatePresence>
        {config && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {config ? (
          <div className="fixed inset-0 grid place-items-center z-[60] p-4">
            <motion.div
              ref={ref}
              layoutId={`role-modal-${config.role}-${id}`}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="w-full max-w-[520px] rounded-3xl bg-white shadow-xl overflow-hidden"
            >
              <div className="p-5 border-b flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{config.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{config.description}</p>
                </div>
                <button
                  onClick={close}
                  className="rounded-full h-9 w-9 grid place-items-center bg-neutral-100 hover:bg-neutral-200"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-5">
                <RoleForm
                  config={config}
                  meta={meta}
                  onSuccess={close}
                />
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </RoleModalContext.Provider>
  );
}

function RoleForm({
  config,
  meta,
  onSuccess,
}: {
  config: RoleConfig;
  meta: Record<string, any> | null;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: config.role,
          ...payload,
          meta, // includes source, placement, etc.
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {config.fields.map((field) => (
        <Field key={field.name} field={field} />
      ))}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-neutral-900 text-white py-3 font-semibold disabled:opacity-60"
      >
        {submitting ? "Sending..." : config.submitText}
      </button>

      <p className="text-xs text-neutral-500">Discovery mode only. No spam.</p>
    </form>
  );
}

function Field({ field }: { field: FieldConfig }) {
  const common =
    "w-full rounded-xl border border-neutral-200 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900/20";

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-neutral-800">
        {field.label}
        {field.required ? <span className="text-red-500"> *</span> : null}
      </label>

      {field.type === "select" ? (
        <select name={field.name} required={field.required} className={common} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          className={common}
          rows={4}
        />
      ) : (
        <input
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={common}
        />
      )}
    </div>
  );
}
