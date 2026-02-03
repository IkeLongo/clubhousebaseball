"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRoleModal } from "@/lib/providers/role-modal-provider";

type NavItem =
  | { name: string; type: "role"; role: "parent" | "org" | "director" }
  | { name: string; type: "link"; link: string };

export function SimpleNavbarWithHoverEffects() {
  return <Navbar />;
}

const Navbar = () => {
  const navItems: NavItem[] = [
    { name: "Parents", type: "role", role: "parent" },
    { name: "Organizations", type: "role", role: "org" },
    { name: "Tournaments", type: "role", role: "director" },
    { name: "About", type: "link", link: "#why-clubhouse-baseball" },
  ];

  return (
    <div className="w-full sticky inset-x-0 top-10 z-[60]">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems }: { navItems: NavItem[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { open } = useRoleModal();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-off-white-500 px-4 py-2 lg:flex border border-gray-200",
      )}
    >
      <Logo />

      <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem, idx) => {
          const commonClass = "relative px-4 py-2 text-soft-navy-500";

          // ROLE item => BUTTON opens modal
          if (navItem.type === "role") {
            return (
              <button
                key={`nav-${navItem.name}-${idx}`}
                type="button"
                onMouseEnter={() => setHovered(idx)}
                onClick={() =>
                  open(navItem.role, { source: "navbar-desktop", label: navItem.name })
                }
                className={commonClass}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                  />
                )}
                <span className="relative z-20">{navItem.name}</span>
              </button>
            );
          }

          // LINK item => normal Link
          return (
            <Link
              key={`nav-${navItem.name}-${idx}`}
              href={navItem.link}
              onMouseEnter={() => setHovered(idx)}
              className={commonClass}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                />
              )}
              <span className="relative z-20">{navItem.name}</span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => open("org", { source: "navbar-desktop", label: "Get Listed" })}
        className="hidden rounded-full bg-field-green-500 px-8 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] md:block"
      >
        Get Listed
      </button>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: { navItems: NavItem[] }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { open } = useRoleModal();

  return (
    <motion.div
      animate={{ borderRadius: openMenu ? "4px" : "2rem" }}
      key={String(openMenu)}
      className="sticky top-0 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-off-white-500 border border-gray-200 px-4 py-2 lg:hidden z-[60]"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <Logo />
        {openMenu ? (
          <IconX className="text-soft-navy-500" onClick={() => setOpenMenu(false)} />
        ) : (
          <IconMenu2 className="text-soft-navy-500" onClick={() => setOpenMenu(true)} />
        )}
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-off-white-500 border border-gray-200 px-4 py-8"
          >
            {navItems.map((navItem, idx) => {
              if (navItem.type === "role") {
                return (
                  <button
                    key={`mobile-${navItem.name}-${idx}`}
                    type="button"
                    className="relative text-soft-navy-500"
                    onClick={() => {
                      open(navItem.role, {
                        source: "navbar-mobile",
                        label: navItem.name,
                      });
                      setOpenMenu(false);
                    }}
                  >
                    <motion.span className="block">{navItem.name}</motion.span>
                  </button>
                );
              }

              return (
                <Link
                  key={`mobile-${navItem.name}-${idx}`}
                  href={navItem.link}
                  className="relative text-soft-navy-500"
                  onClick={() => setOpenMenu(false)}
                >
                  <motion.span className="block">{navItem.name}</motion.span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                open("org", { source: "navbar-mobile", label: "Get Listed" });
                setOpenMenu(false);
              }}
              className="w-full rounded-lg bg-field-green-500 px-8 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset]"
            >
              Get Listed
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/clubhouse_baseball_logo_trans.webp"
        alt="Clubhouse Baseball Logo"
        width={80}
        height={70}
      />
    </Link>
  );
};
