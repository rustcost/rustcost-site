import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "@/shared/components/ThemeToggle";
import BrandLogo from "@/shared/components/BrandLogo";
import LangSelect from "@/app/layouts/components/LangSelect";
import {
  buildLanguagePrefix,
  normalizeLanguageCode,
  replaceLanguageInPath,
} from "@/constants/language";
import { NAVIGATION_LINKS } from "@/constants/routes";
import type { LanguageCode } from "@/types/i18n";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { t } = useTranslation();
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const activeLanguage = normalizeLanguageCode(params["lng"]);
  const prefix = buildLanguagePrefix(activeLanguage);
  const [open, setOpen] = useState(false);

  const navLinkClass =
    "hover:text-yellow-400 transition-colors px-4 py-2 text-lg font-semibold";

  const buildLinkPath = (segment: string) =>
    segment ? `${prefix}/${segment}` : `${prefix}/`;

  const handleLangChange = (newLang: LanguageCode) => {
    const nextPath = replaceLanguageInPath(location.pathname, newLang);
    const fullPath = `${nextPath}${location.search ?? ""}${
      location.hash ?? ""
    }`;
    navigate(fullPath, { replace: true });
  };

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-gray-50/90 dark:bg-gray-900/80 backdrop-blur shadow-md select-none">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 lg:px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to={buildLinkPath("")} className="inline-flex items-center">
            <BrandLogo className="h-12 w-12 rounded-full shadow-sm" />
            <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
              RustCost
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-2 xl:gap-6 text-gray-700 dark:text-gray-300">
          {NAVIGATION_LINKS.map((link) => (
            <NavLink
              key={`desktop-${link.key}`}
              to={buildLinkPath(link.segment)}
              end={link.exact}
              className={navLinkClass}
            >
              {t(link.i18nKey)}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Toggle */}
          <LangSelect value={activeLanguage} onChange={handleLangChange} />

          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-gray-950">
          <div className="min-h-screen bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <Link
                  to={buildLinkPath("")}
                  className="inline-flex items-center"
                >
                  <BrandLogo className="h-12 w-12 rounded-full" />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    RustCost
                  </span>
                </Link>
              </div>
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>

            <div className="px-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <LangSelect
                  value={activeLanguage}
                  onChange={handleLangChange}
                />

                <ThemeToggle />
              </div>
            </div>

            <nav className="mt-6 flex flex-col items-stretch gap-2 px-4">
              {NAVIGATION_LINKS.map((link) => (
                <NavLink
                  key={`mobile-${link.key}`}
                  to={buildLinkPath(link.segment)}
                  end={link.exact}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `w-full rounded-xl px-5 py-4 text-2xl font-bold transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/80"
                    }`
                  }
                >
                  {t(link.i18nKey)}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
