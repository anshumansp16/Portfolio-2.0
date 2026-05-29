'use client'

import { useState, useEffect } from 'react'
import { useContent, defaultContent, SiteContent } from '@/lib/content'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = 'anshuman2024' // Change this

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(59,130,246,0.12)', background: 'rgba(9,9,18,0.9)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-platinum text-sm">{title}</span>
        <span className="text-graphite" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▲
        </span>
      </button>
      {open && <div className="p-5 pt-0">{children}</div>}
    </div>
  )
}

function Field({ label, value, onChange, textarea }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-mono mb-1.5" style={{ color: 'rgba(96,165,250,0.7)', letterSpacing: '0.05em' }}>
        {label.toUpperCase()}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg text-sm text-platinum bg-transparent resize-none focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '10px 12px',
            color: 'rgba(238,237,245,0.85)',
            lineHeight: 1.6,
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg text-sm text-platinum bg-transparent focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '9px 12px',
            color: 'rgba(238,237,245,0.85)',
          }}
        />
      )}
    </div>
  )
}

export default function AdminPage() {
  const { content, updateContent, resetContent, isAdmin, setAdmin } = useContent()
  const [password, setPassword] = useState('')
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  // Login
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#020204' }}>
        <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: 'rgba(9,9,18,0.95)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h1 className="text-xl font-display text-platinum font-medium">Admin Panel</h1>
            <p className="text-body-sm text-graphite mt-1" style={{ fontWeight: 300 }}>Enter password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && password === ADMIN_PASSWORD && setAdmin(true)}
            placeholder="Password"
            className="w-full rounded-lg text-sm mb-4 focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '11px 14px',
              color: 'rgba(238,237,245,0.85)',
            }}
          />
          <button
            onClick={() => password === ADMIN_PASSWORD ? setAdmin(true) : alert('Wrong password')}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  function save() {
    // Content is already saved via updateContent — just show toast
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#020204' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4" style={{
        background: 'rgba(5,5,10,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-platinum">Admin Panel</span>
          <span className="text-label text-graphite">· Content Manager</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { resetContent(); setSaved(true); setTimeout(() => setSaved(false), 2000) }}
            className="text-body-sm text-graphite hover:text-silver transition-colors px-3 py-1.5 rounded-lg"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            Reset to defaults
          </button>
          <a href="/" target="_blank" className="btn-ghost !py-1.5 !px-4 !text-sm">
            View site ↗
          </a>
          {saved && (
            <span className="text-body-sm" style={{ color: 'rgba(52,211,153,0.8)' }}>✓ Saved</span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-headline-md font-display text-platinum mb-2" style={{ fontWeight: 400 }}>Content Manager</h1>
          <p className="text-body-sm text-graphite" style={{ fontWeight: 300 }}>
            All changes auto-save to your browser. They persist until you reset. No server needed.
          </p>
          <div className="mt-3 p-3 rounded-lg text-body-sm" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', color: 'rgba(96,165,250,0.8)' }}>
            💡 Changes are stored in localStorage and reflected instantly site-wide.
          </div>
        </div>

        {/* Hero */}
        <Section title="Hero Section">
          <Field label="Badge text" value={content.hero.badge} onChange={(v) => updateContent({ hero: { ...content.hero, badge: v } })} />
          <Field label="Headline line 1" value={content.hero.headline1} onChange={(v) => updateContent({ hero: { ...content.hero, headline1: v } })} />
          <Field label="Headline line 2 (gradient)" value={content.hero.headline2} onChange={(v) => updateContent({ hero: { ...content.hero, headline2: v } })} />
          <Field label="Subtext" value={content.hero.subtext} onChange={(v) => updateContent({ hero: { ...content.hero, subtext: v } })} textarea />
          <Field label="CTA 1 label" value={content.hero.cta1} onChange={(v) => updateContent({ hero: { ...content.hero, cta1: v } })} />
          <Field label="CTA 2 label" value={content.hero.cta2} onChange={(v) => updateContent({ hero: { ...content.hero, cta2: v } })} />
        </Section>

        {/* About */}
        <Section title="About">
          <Field label="Tagline" value={content.about.tagline} onChange={(v) => updateContent({ about: { ...content.about, tagline: v } })} />
          <Field label="Short bio" value={content.about.bio} onChange={(v) => updateContent({ about: { ...content.about, bio: v } })} textarea />
          <Field label="Location" value={content.about.location} onChange={(v) => updateContent({ about: { ...content.about, location: v } })} />
        </Section>

        {/* Metrics */}
        <Section title="Stats / Metrics">
          {content.metrics.map((m, i) => (
            <div key={i} className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-xs text-graphite mb-3 font-mono">Metric {i + 1}</p>
              <Field label="Number" value={m.number} onChange={(v) => {
                const next = [...content.metrics]; next[i] = { ...next[i], number: v };
                updateContent({ metrics: next })
              }} />
              <Field label="Label" value={m.label} onChange={(v) => {
                const next = [...content.metrics]; next[i] = { ...next[i], label: v };
                updateContent({ metrics: next })
              }} />
              <Field label="Sub-label" value={m.sublabel} onChange={(v) => {
                const next = [...content.metrics]; next[i] = { ...next[i], sublabel: v };
                updateContent({ metrics: next })
              }} />
            </div>
          ))}
        </Section>

        {/* CTA */}
        <Section title="Final CTA Section">
          <Field label="Headline" value={content.cta.headline} onChange={(v) => updateContent({ cta: { ...content.cta, headline: v } })} />
          <Field label="Subtext" value={content.cta.subtext} onChange={(v) => updateContent({ cta: { ...content.cta, subtext: v } })} textarea />
          <Field label="Primary button" value={content.cta.primaryBtn} onChange={(v) => updateContent({ cta: { ...content.cta, primaryBtn: v } })} />
          <Field label="Secondary button" value={content.cta.secondaryBtn} onChange={(v) => updateContent({ cta: { ...content.cta, secondaryBtn: v } })} />
        </Section>

        {/* Testimonials */}
        <Section title="Testimonials">
          {content.testimonials.map((t, i) => (
            <div key={i} className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-xs text-graphite mb-3 font-mono">Testimonial {i + 1}</p>
              <Field label="Quote" value={t.quote} onChange={(v) => {
                const next = [...content.testimonials]; next[i] = { ...next[i], quote: v };
                updateContent({ testimonials: next })
              }} textarea />
              <Field label="Author" value={t.author} onChange={(v) => {
                const next = [...content.testimonials]; next[i] = { ...next[i], author: v };
                updateContent({ testimonials: next })
              }} />
              <Field label="Avatar initials" value={t.avatar} onChange={(v) => {
                const next = [...content.testimonials]; next[i] = { ...next[i], avatar: v };
                updateContent({ testimonials: next })
              }} />
            </div>
          ))}
        </Section>

        {/* FAQ */}
        <Section title="FAQ">
          {content.faq.map((f, i) => (
            <div key={i} className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-xs text-graphite mb-3 font-mono">Question {i + 1}</p>
              <Field label="Question" value={f.q} onChange={(v) => {
                const next = [...content.faq]; next[i] = { ...next[i], q: v };
                updateContent({ faq: next })
              }} />
              <Field label="Answer" value={f.a} onChange={(v) => {
                const next = [...content.faq]; next[i] = { ...next[i], a: v };
                updateContent({ faq: next })
              }} textarea />
            </div>
          ))}
        </Section>

        {/* Footer */}
        <Section title="Footer">
          <Field label="Tagline" value={content.footer.tagline} onChange={(v) => updateContent({ footer: { ...content.footer, tagline: v } })} />
          <Field label="Copyright name" value={content.footer.copyright} onChange={(v) => updateContent({ footer: { ...content.footer, copyright: v } })} />
        </Section>

        <div className="text-center mt-8 text-body-sm text-graphite" style={{ fontWeight: 300 }}>
          Changes save automatically · Stored in browser localStorage · No server needed
        </div>
      </div>
    </div>
  )
}
