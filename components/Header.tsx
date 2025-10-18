'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [translateMenuOpen, setTranslateMenuOpen] = useState(false);
  const [translateLoaded, setTranslateLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  ];

  useEffect(() => {
    // Initialize Google Translate
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,fr,es,pt,sw,rw',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }
      window.googleTranslateElementInit = googleTranslateElementInit;
    `;
    document.head.appendChild(script);

    const translateScript = document.createElement('script');
    translateScript.type = 'text/javascript';
    translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    translateScript.async = true;
    translateScript.onload = () => setTranslateLoaded(true);
    document.head.appendChild(translateScript);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadGoogleTranslate = (languageCode: string) => {
    if (typeof window !== 'undefined') {
      const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          const option = iframeDoc.querySelector(`option[value="${languageCode}"]`) as HTMLOptionElement;
          if (option) {
            option.selected = true;
            const event = new Event('change', { bubbles: true });
            iframeDoc.querySelector('select')?.dispatchEvent(event);
          }
        }
      } else {
        // Fallback method
        const combobox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (combobox) {
          combobox.value = languageCode;
          combobox.dispatchEvent(new Event('change'));
        }
      }
      setTranslateMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    return pathname?.startsWith(path) ?? false;
  };

  const getLinkClass = (path: string) => {
    const baseClass = `flex items-center gap-1 transition font-medium text-sm`;
    const activeClass = isActive(path)
      ? isScrolled
        ? 'text-yellow-200'
        : 'text-indigo-600'
      : isScrolled
      ? 'text-white hover:text-yellow-200'
      : 'text-gray-700 hover:text-indigo-600';
    
    return `${baseClass} ${activeClass}`;
  };

  const getMobileLink = (path: string) => {
    const baseClass = `block px-4 py-2 rounded-lg transition font-medium text-sm`;
    const activeClass = isActive(path)
      ? isScrolled
        ? 'bg-indigo-400 text-white'
        : 'bg-indigo-100 text-indigo-600'
      : isScrolled
      ? 'text-white hover:bg-indigo-400'
      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600';
    
    return `${baseClass} ${activeClass}`;
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className={`text-xl sm:text-3xl font-bold transition-colors duration-300 whitespace-nowrap ${
            isScrolled ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            StudentNest
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-3 xl:gap-8 items-center">
            <li><Link href="/find" className={getLinkClass('/find')}><span className="text-base sm:text-lg">🏠</span> <span className="hidden xl:inline">Housing</span></Link></li>
            <li><Link href="/buy" className={getLinkClass('/buy')}><span className="text-base sm:text-lg">🛒</span> <span className="hidden xl:inline">Marketplace</span></Link></li>
            <li><Link href="/opportunity" className={getLinkClass('/opportunity')}><span className="text-base sm:text-lg">📚</span> <span className="hidden xl:inline">Opportunities</span></Link></li>
            <li><Link href="/ask" className={getLinkClass('/ask')}><span className="text-base sm:text-lg">🤖</span> <span className="hidden xl:inline">Wiki</span></Link></li>

            <li><Link href="/auth/login" className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm ${
              isScrolled 
                ? 'text-white border-2 border-white hover:bg-white hover:text-indigo-600'
                : 'text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}>Sign In</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition text-sm ${
              isScrolled
                ? 'bg-white text-indigo-600'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {mobileMenuOpen ? '✕' : '☰'} <span className="hidden sm:inline">Menu</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t shadow-lg ${
            isScrolled ? 'bg-indigo-500 border-indigo-400' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 space-y-2">
              <Link
                href="/find"
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileLink('/find')}
              >
                <span className="text-base">🏠</span> Housing
              </Link>
              <Link
                href="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileLink('/buy')}
              >
                <span className="text-base">🛒</span> Marketplace
              </Link>
              <Link
                href="/opportunity"
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileLink('/opportunity')}
              >
                <span className="text-base">📚</span> Opportunities
              </Link>
              <Link
                href="/ask"
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileLink('/ask')}
              >
                <span className="text-base">🤖</span> Wiki
              </Link>

              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 border-2 rounded-lg transition font-semibold text-center text-sm ${
                  isScrolled
                    ? 'text-indigo-600 bg-white border-white hover:bg-gray-100'
                    : 'text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }} />
    </>
  );
}
