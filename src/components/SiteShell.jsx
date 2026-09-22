'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/blog/', label: 'Blog' },
  { href: '/projects/', label: 'Projects' },
  { href: '/now/', label: 'Now' },
];

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [is_sidebar_open, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className={`ui vertical inverted sidebar menu ${is_sidebar_open ? 'visible' : ''}`}>
        {navigation.map((item) => (
          <a
            className={`item ${isActive(pathname, item.href) ? 'active' : ''}`}
            href={item.href}
            key={item.href}
            onClick={() => setIsSidebarOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>

      {is_sidebar_open && (
        <button
          aria-label="Close navigation"
          className="sidebar-dimmer"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <div className={`pusher ${is_sidebar_open ? 'dimmed' : ''}`}>
        <nav className="ui large top fixed secondary pointing menu site-navigation">
          <div className="ui container navigation-container">
            <button
              aria-expanded={is_sidebar_open}
              aria-label="Open navigation"
              className="toc item navigation-toggle"
              onClick={() => setIsSidebarOpen(true)}
              type="button"
            >
              <i className="sidebar icon" />
            </button>
            <div className="center menu">
              {navigation.map((item) => (
                <a
                  className={`item ${isActive(pathname, item.href) ? 'active' : ''}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
}
