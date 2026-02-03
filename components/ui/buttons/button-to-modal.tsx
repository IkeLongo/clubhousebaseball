"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

import type { Role, FieldConfig, RoleConfig } from "@/lib/types/types";
import { ROLE_CONFIG } from "@/lib/role-config";

type Props = {
  children?: React.ReactNode;
};

export function RoleModalProvider({ children }: Props) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const config = useMemo<RoleConfig | null>(() => {
    if (!activeRole) return null;
    return ROLE_CONFIG[activeRole];
  }, [activeRole]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveRole(null);
    }

    document.body.style.overflow = activeRole ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeRole]);

  useOutsideClick(ref, () => setActiveRole(null));

  return (
    <>
      {/* EXPOSE THESE BUTTON HELPERS ANYWHERE YOU WANT */}
      <div className="hidden" aria-hidden>
        {/* This is just to show you the function. In practice, export a hook or pass setActiveRole down. */}
      </div>

      {/* Your page content */}
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
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="w-full max-w-[520px] rounded-3xl bg-white overflow-hidden shadow-xl"
            >
              <div className="p-5 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{config.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{config.description}</p>
                  </div>

                  <button
                    onClick={() => setActiveRole(null)}
                    className="rounded-full h-9 w-9 grid place-items-center bg-neutral-100 hover:bg-neutral-200"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-5">
                <RoleForm
                  config={config}
                  onSuccess={() => setActiveRole(null)}
                />
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Example usage buttons (put these in navbar / hero / anywhere) */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-[1]">
        <button
          onClick={() => setActiveRole("parent")}
          className="px-3 py-2 rounded-full bg-neutral-900 text-white text-sm"
        >
          Parents
        </button>
        <button
          onClick={() => setActiveRole("org")}
          className="px-3 py-2 rounded-full bg-neutral-900 text-white text-sm"
        >
          Org
        </button>
        <button
          onClick={() => setActiveRole("director")}
          className="px-3 py-2 rounded-full bg-neutral-900 text-white text-sm"
        >
          Director
        </button>
      </div>
    </>
  );
}

function RoleForm({
  config,
  onSuccess,
}: {
  config: RoleConfig;
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
      // TODO: replace with your endpoint
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: config.role,
          ...payload,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      onSuccess();
    } catch (err) {
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

      <p className="text-xs text-neutral-500">
        Discovery mode only. No spam.
      </p>
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
