'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/leads', label: 'Leads' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/case-studies', label: 'Case Studies' },
  ]

  return (
    <nav className="border-b border-border-subtle bg-surface">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="text-h4 font-semibold text-text-primary hover:text-orange transition-colors"
            >
              Ario Studio Admin
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-body-sm font-medium transition-colors ${
                      isActive
                        ? 'text-orange'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-body-sm font-medium text-text-secondary hover:text-orange transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

