"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={24}
                width={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label.split(" ")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
