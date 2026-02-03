import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "About",
      href: "#",
    },
    {
      title: "Contact",
      href: "#",
    },
    {
      title: "Privacy",
      href: "#",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden border-t border-neutral-100 bg-field-green-500 px-8 py-20">
      <div className="mx-auto max-w-7xl items-start justify-between text-sm text-white md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mr-0 mb-4 md:mr-4 md:flex">
            <Logo />
          </div>

          <ul className="flex list-none flex-col gap-4 text-white transition-colors sm:flex-row">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors"
                  href="#"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="mx-auto mt-8 max-w-7xl" />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between sm:flex-row">
          <p className="mb-8 text-white sm:mb-0">
            &copy; Clubhouse LLC
          </p>
          <div className="flex gap-4">
            {/* <Link href="#">
              <IconBrandTwitter className="h-6 w-6 text-neutral-500" />
            </Link>
            <Link href="#">
              <IconBrandLinkedin className="h-6 w-6 text-neutral-500" />
            </Link>
            <Link href="#">
              <IconBrandGithub className="h-6 w-6 text-neutral-500" />
            </Link>
            <Link href="#">
              <IconBrandFacebook className="h-6 w-6 text-neutral-500" />
            </Link>
            <Link href="#">
              <IconBrandInstagram className="h-6 w-6 text-neutral-500" />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/clubhouse_baseball_logo (2).webp"
        alt="logo"
        width={200}
        height={200}
      />
    </Link>
  );
};
