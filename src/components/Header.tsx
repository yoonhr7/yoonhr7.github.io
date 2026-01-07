"use client";

import Link from "next/link";
import { useState } from "react";
import { Asterisk } from "lucide-react";
import { menuData } from "@/data/menu";

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = false }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuEnter = (label: string) => {
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className={`header ${isHome ? "header--home" : "header--inner"}`}>
      <div className="header__container">
        <nav className="header__nav">
          <Link href="/" className="header__logo">
            YOONHR
            <Asterisk className="header__logo-icon" size={20} />
          </Link>

          <ul className="header__menu">
            {menuData.main.map((item) => (
              <li
                key={item.label}
                className="header__menu-item"
                onMouseEnter={() =>
                  item.children && handleMenuEnter(item.label)
                }
                onMouseLeave={handleMenuLeave}
              >
                <Link href={item.path} className="header__menu-link">
                  {item.label}
                </Link>

                {item.children && activeMenu === item.label && (
                  <ul className="header__submenu">
                    {item.children.map((child) => (
                      <li key={child.path} className="header__submenu-item">
                        <Link
                          href={child.path}
                          className="header__submenu-link"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
