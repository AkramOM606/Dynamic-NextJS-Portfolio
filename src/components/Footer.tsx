"use client";

import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SettingsFetcher from "./ParentFooter";
import { SettingsDocument } from "../../prismicio-types";

type FooterProps = {
  settings: SettingsDocument<string>; // Replace 'any' with the type of your settings
};

export default function Footer({ settings }: FooterProps) {
  const pathname = usePathname();
  const client = createClient();
  // const settings = await client.getSingle("settings");

  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 lg:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          {pathname.startsWith("/blog") || pathname.startsWith("/projects") ? (
            <Link
              href={`/`}
              className="cursor-pointer text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-red-400"
            >
              {settings.data.name}
            </Link>
          ) : (
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-50}
              delay={0}
              duration={200}
              aria-label="Home Page"
              className="cursor-pointer text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-red-400"
            >
              {settings.data.name}
            </ScrollLink>
          )}

          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            |
          </span>
          <p className=" text-sm text-slate-300 ">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex flex-col items-center gap-1 sm:flex-row">
            {settings.data.nav_item.map(({ link, label, linksp }, index) => (
              <React.Fragment key={label}>
                <li>
                  {pathname.startsWith("/blog") ||
                  pathname.startsWith("/projects") ? (
                    <Link
                      href={`/#${linksp}`}
                      className={clsx(
                        "group relative block cursor-pointer overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-red-400",
                      )}
                    >
                      {label}
                    </Link>
                  ) : (
                    <ScrollLink
                      to={linksp as string}
                      spy={true}
                      smooth={true}
                      offset={-50}
                      delay={0}
                      duration={200}
                      className={clsx(
                        "group relative block cursor-pointer overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-red-400",
                      )}
                    >
                      {label}
                    </ScrollLink>
                  )}
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="hidden text-4xl font-thin leading-[0] text-slate-400 sm:block"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="cursor-pointer p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-red-400"
              aria-label={settings.data.name + " on GitHub"}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.x_link) && (
            <PrismicNextLink
              field={settings.data.x_link}
              className="cursor-pointer p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-red-400"
              aria-label={settings.data.name + " on X"}
            >
              <FaSquareXTwitter />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="cursor-pointer p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-red-400"
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}
