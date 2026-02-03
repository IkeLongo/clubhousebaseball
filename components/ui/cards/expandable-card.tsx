"use client";
import { IconChevronRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRoleModal, type Role } from "@/lib/providers/role-modal-provider";

export function ExpandableCardOnClick() {
  const { open } = useRoleModal();

  const items = [
    {
      title: "Parents",
      description:
        "Explore local select baseball organizations, understand coaching philosophy, and find tryouts without relying on scattered posts or guesswork.",
      src: "/parents_watching_baseball_game.webp",
      content: (
        <div className="space-y-2">
          <p className="text-sm">✓ Browse verified organizations in your area</p>
          <p className="text-sm">✓ Read coaching philosophies and team expectations</p>
          <p className="text-sm">✓ View upcoming tryout schedules</p>
          <p className="text-sm">✓ Connect directly with coaches</p>
        </div>
      ),
      cta: "Get Notified >",
    },
    {
      title: "Organizations",
      description:
        "Share your program, promote tryouts, and connect with players who align with your coaching philosophy and expectations.",
      src: "/players_listening_to_coach_after_game.webp",
      content: (
        <div className="space-y-2">
          <p className="text-sm">✓ Create a comprehensive organization profile</p>
          <p className="text-sm">✓ Post tryout dates and requirements</p>
          <p className="text-sm">✓ Showcase your coaching staff and achievements</p>
          <p className="text-sm">✓ Attract committed players and families</p>
        </div>
      ),
      cta: "List My Organization >",
    },
    {
      title: "Tournament Directors",
      description:
        "Reach active select teams, increase visibility for your events, and reduce last-minute roster scrambling.",
      src: "/tournament_director_answering_questions.webp",
      content: (
        <div className="space-y-2">
          <p className="text-sm">✓ List tournaments with full details</p>
          <p className="text-sm">✓ Reach teams actively searching for events</p>
          <p className="text-sm">✓ Manage registrations efficiently</p>
          <p className="text-sm">✓ Fill brackets faster with targeted promotion</p>
        </div>
      ),
      cta: "Promote my Tournament >",
    },
  ];
  const [active, setActive] = useState<null | (typeof items)[number]>(null);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setActive(null);
  });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const titleToRole = (title: string): Role => {
    const t = title.toLowerCase();
    if (t.includes("parent")) return "parent";
    if (t.includes("organization")) return "org";
    return "director";
  };

  return (
    <div className="relative h-full w-full">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-2 sm:grid-cols-2 lg:grid-cols-3 md:px-8 md:py-2"> 
        {/* Removed dark overlay on card expand */}
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              key={active.title}
              className="max-w-sm rounded-2xl bg-white shadow-md"
            >
              <motion.div layoutId={`image-${active.title}`}> 
                <img
                  src={active.src}
                  alt={active.title}
                  width={500}
                  height={500}
                  className="h-60 rounded-2xl object-cover"
                />
              </motion.div>
              <div className="flex flex-col items-start p-6">
                <motion.p
                  layoutId={`title-${active.title}`}
                  className="text-lg font-bold text-black"
                >
                  {active.title}
                </motion.p>
                <motion.p
                  layoutId={`description-${active.title}`}
                  className="text-sm text-neutral-700"
                >
                  {active.description}
                </motion.p>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-neutral-800"
                >
                  {active.content}
                </motion.div>
                {/* ✅ CTA opens GLOBAL role modal */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const role = titleToRole(active.title);

                    open(role, {
                      source: "expandable-card",
                      cardTitle: active.title,
                      ctaText: active.cta,
                    });

                    // optional: close expanded card after opening form
                    setActive(null);
                  }}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-field-green-500 py-2.5 text-sm font-semibold text-white transition hover:bg-field-green-600"
                >
                  <span>{active.cta.replace(/\s*>$/, "")}</span>
                  <IconChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {items.map((item) => (
          <motion.div
            layoutId={`card-${item.title}`}
            onClick={() => setActive(item)}
            key={item.title}
            className="cursor-pointer rounded-2xl bg-white shadow-md flex flex-col justify-between"
          >
            <motion.div layoutId={`image-${item.title}`}> 
              <img
                src={item.src}
                alt={item.title}
                width={500}
                height={500}
                className="h-60 rounded-2xl object-cover"
              />
            </motion.div>
            <div className="flex flex-col items-start p-6 flex-1 w-full">
              <motion.p
                layoutId={`title-${item.title}`}
                className="text-lg font-bold text-black"
              >
                {item.title}
              </motion.p>
              <motion.p
                layoutId={`description-${item.title}`}
                className="text-sm text-neutral-700"
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
