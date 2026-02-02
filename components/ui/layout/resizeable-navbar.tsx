"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

export function SimpleNavbarWithHoverEffects() {
  return <Navbar />;
}

const Navbar = () => {
  const navItems = [
    { name: "Parents", link: "#" },
    { name: "Organizations", link: "#" },
    { name: "Tournaments", link: "#" },
    { name: "About", link: "#" },
  ];

  return (
    <div className="w-full sticky inset-x-0 top-10 z-[60]">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-off-white-500 px-4 py-2 lg:flex border border-gray-200",
        "",
      )}
    >
      <Logo />
      <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem: any, idx: number) => (
          <Link
            onMouseEnter={() => setHovered(idx)}
            className="relative px-4 py-2 text-soft-navy-500"
            key={`link=${idx}`}
            href={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </div>
      <button className="hidden rounded-full bg-field-green-500 px-8 py-2 text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] md:block">
        Get Listed
      </button>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{ borderRadius: open ? "4px" : "2rem" }}
        key={String(open)}
        className="sticky top-0 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-off-white-500 border border-gray-200 px-4 py-2 lg:hidden z-[60]"
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          {open ? (
            <IconX
              className="text-soft-navy-500"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-soft-navy-500"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className="relative text-soft-navy-500"
                >
                  <motion.span className="block">{navItem.name} </motion.span>
                </Link>
              ))}
              <button className="w-full rounded-lg bg-field-green-500 px-8 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset]">
                Get Listed
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
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
