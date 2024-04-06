"use client";

import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";
import React, { useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./Button";
import { usePathname } from "next/navigation";
import path from "path";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between bg-slate-50 px-4 py-2  md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {settings.data.nav_item.map(({ link, label, linksp }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <Link
                  href={clsx("/", linksp).replace(/\s/g, "")}
                  className={clsx(
                    "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900 "
                  )}
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-12 rounded bg-red-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname.includes(asLink(link) as string)
                        ? "translate-y-6"
                        : "translate-y-18"
                    )}
                  />
                  <span className="relative">{label}</span>
                </Link>
              </li>
              {index < settings.data.nav_item.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
          <li>
            <Link
              href="#contact"
              className={clsx(
                "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-500  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105 ml-3"
              )}
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full translate-y-9 bg-red-600 transition-transform  duration-300 ease-in-out group-hover:translate-y-0"
                )}
              />
              <span className="relative flex items-center justify-center gap-2">
                {settings.data.cta_label}
                {true && <MdArrowOutward className="inline-block" />}
              </span>
            </Link>
          </li>
        </div>
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home Page"
      className="text-2xl font-extrabold tracking-tighter text-slate-900"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {settings.data.nav_item.map(({ link, label, linksp }, index) => (
        <React.Fragment key={label}>
          <li>
            <Link
              href={clsx("/", linksp).replace(/\s/g, "")}
              className={clsx(
                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900"
              )}
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-red-500 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(asLink(link) as string)
                    ? "translate-y-6"
                    : "translate-y-8"
                )}
              />
              <span className="relative">{label}</span>
            </Link>
          </li>
          {index < settings.data.nav_item.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              |
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Link
          href="#contact"
          className={clsx(
            "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-500  px-4 py-2 font-bold transition-transform ease-out  hover:scale-105 ml-3"
          )}
        >
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full translate-y-9 bg-red-600 transition-transform  duration-300 ease-in-out group-hover:translate-y-0"
            )}
          />
          <span className="relative flex items-center justify-center gap-2">
            {settings.data.cta_label}
            {true && <MdArrowOutward className="inline-block" />}
          </span>
        </Link>
      </li>
    </div>
  );
}
