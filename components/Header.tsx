'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [translateMenuOpen, setTranslateMenuOpen] = useState(false);
  const [translateLoaded, setTranslateLoaded] = useState(false);

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

  return (
    <>
      <nav className="sticky top-0 z-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            StudentNest
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 items-center">
            <li><Link href="/find" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium">🏠 Housing</Link></li>
            <li><Link href="/food" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium">🍽️ Food</Link></li>
            <li><Link href="/buy" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium">🛒 Marketplace</Link></li>

            {/* Language Selector */}
            {/* <li className="relative">
              <button
                onClick={() => setTranslateMenuOpen(!translateMenuOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                🌐 Languages
              </button>
              {translateMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => loadGoogleTranslate(lang.code)}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium flex items-center gap-2"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li> */}

            <li><Link href="/auth/login" className="px-4 py-2 text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition font-semibold">Sign In</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {mobileMenuOpen ? '✕' : '☰'} Menu
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
              <Link
                href="/find"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition font-medium"
              >
                🏠 Housing
              </Link>
              <Link
                href="/food"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition font-medium"
              >
                🍽️ Food
              </Link>
              <Link
                href="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition font-medium"
              >
                🛒 Marketplace
              </Link>

              {/* Mobile Language Selector */}
              <div className="border-t pt-3 mt-3">
                <p className="text-xs font-semibold text-gray-600 px-4 mb-2">Languages</p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        loadGoogleTranslate(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition font-medium flex items-center gap-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition font-semibold text-center"
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
