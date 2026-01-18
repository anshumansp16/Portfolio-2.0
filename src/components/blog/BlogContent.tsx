'use client'

import { useEffect, useState, useRef } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface BlogContentProps {
  content: string
}

interface TOCItem {
  id: string
  text: string
  level: number
}

// Code Block Component with syntax highlighting
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      {/* Language badge */}
      <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 bg-accent-gold/20 rounded-full">
        <span className="text-xs font-mono text-accent-gold uppercase">{language || 'code'}</span>
      </div>

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-silver/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      <Highlight theme={themes.nightOwl} code={code.trim()} language={language || 'typescript'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} rounded-xl border border-white/[0.06] p-4 pt-8 overflow-x-auto text-sm`}
            style={{ ...style, background: 'rgba(13, 17, 23, 0.8)' }}
          >
            <code className="font-mono">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell pr-4 text-right text-graphite/40 select-none text-xs w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}

// Callout component for tips, warnings, etc.
function Callout({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) {
  const styles = {
    tip: 'border-green-500/30 bg-green-500/5',
    warning: 'border-amber-500/30 bg-amber-500/5',
    info: 'border-blue-500/30 bg-blue-500/5',
  }
  const icons = {
    tip: '💡',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div className={`border-l-4 ${styles[type]} p-4 my-6 rounded-r-lg`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  )
}

export function BlogContent({ content }: BlogContentProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [readingProgress, setReadingProgress] = useState(0)
  const [toc, setToc] = useState<TOCItem[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  // Extract TOC from content
  useEffect(() => {
    const headings = content.match(/^##+ .+$/gm) || []
    const tocItems: TOCItem[] = headings.map((heading, index) => {
      const level = (heading.match(/^#+/) || [''])[0].length
      const text = heading.replace(/^#+\s*/, '')
      const id = `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return { id, text, level }
    })
    setToc(tocItems)
  }, [content])

  // Track reading progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))

      // Find active section
      const sections = document.querySelectorAll('[data-section]')
      let current = ''
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150) {
          current = section.getAttribute('data-section') || ''
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parse and render content
  const renderContent = () => {
    let sectionIndex = 0

    // Split by code blocks first to handle them separately
    const parts = content.split(/(```[\s\S]*?```)/g)

    return parts.map((part, partIndex) => {
      // Handle code blocks
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/)
        if (match) {
          const [, language, code] = match
          return <CodeBlock key={partIndex} language={language || 'text'} code={code} />
        }
        return null
      }

      // Process non-code content
      const lines = part.split('\n')
      const elements: React.ReactNode[] = []
      let currentList: string[] = []
      let listType: 'ul' | 'ol' | null = null

      const flushList = () => {
        if (currentList.length > 0) {
          const ListTag = listType === 'ol' ? 'ol' : 'ul'
          elements.push(
            <ListTag key={`list-${elements.length}`} className={`mb-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} pl-6 text-silver/80 space-y-2`}>
              {currentList.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ListTag>
          )
          currentList = []
          listType = null
        }
      }

      lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim()
        if (!trimmedLine) {
          flushList()
          return
        }

        // Headers
        if (trimmedLine.startsWith('## ')) {
          flushList()
          const text = trimmedLine.replace(/^## /, '')
          const id = `section-${sectionIndex}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          sectionIndex++
          elements.push(
            <h2
              key={`h2-${lineIndex}`}
              id={id}
              data-section={id}
              className="text-headline-md font-display text-platinum mt-16 mb-6 scroll-mt-32"
            >
              {text}
            </h2>
          )
          return
        }

        if (trimmedLine.startsWith('### ')) {
          flushList()
          const text = trimmedLine.replace(/^### /, '')
          const id = `section-${sectionIndex}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          sectionIndex++
          elements.push(
            <h3
              key={`h3-${lineIndex}`}
              id={id}
              data-section={id}
              className="text-headline-sm font-display text-platinum mt-10 mb-4 scroll-mt-32"
            >
              {text}
            </h3>
          )
          return
        }

        // Horizontal rule
        if (trimmedLine === '---') {
          flushList()
          elements.push(<hr key={`hr-${lineIndex}`} className="border-white/[0.06] my-12" />)
          return
        }

        // Lists
        if (trimmedLine.startsWith('- ')) {
          if (listType !== 'ul') {
            flushList()
            listType = 'ul'
          }
          currentList.push(trimmedLine.replace(/^- /, ''))
          return
        }

        if (/^\d+\. /.test(trimmedLine)) {
          if (listType !== 'ol') {
            flushList()
            listType = 'ol'
          }
          currentList.push(trimmedLine.replace(/^\d+\. /, ''))
          return
        }

        // Tables
        if (trimmedLine.startsWith('|')) {
          flushList()
          // Collect all table rows
          const tableLines: string[] = [trimmedLine]
          let nextIdx = lineIndex + 1
          while (nextIdx < lines.length && lines[nextIdx].trim().startsWith('|')) {
            tableLines.push(lines[nextIdx].trim())
            nextIdx++
          }

          if (tableLines.length > 1) {
            const headerCells = tableLines[0].split('|').filter(Boolean).map(c => c.trim())
            const bodyRows = tableLines.slice(2).map(row =>
              row.split('|').filter(Boolean).map(c => c.trim())
            )

            elements.push(
              <div key={`table-${lineIndex}`} className="overflow-x-auto my-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {headerCells.map((cell, i) => (
                        <th key={i} className="text-left text-platinum p-3 border-b border-white/10 font-medium">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-white/[0.02]">
                        {row.map((cell, ci) => (
                          <td key={ci} className="text-silver/80 p-3 border-b border-white/[0.06]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          return
        }

        // Skip separator rows
        if (/^\|[-\s|]+\|$/.test(trimmedLine)) {
          return
        }

        // Regular paragraphs
        flushList()
        if (!trimmedLine.startsWith('<') && !trimmedLine.startsWith('|')) {
          elements.push(
            <p
              key={`p-${lineIndex}`}
              className="text-body text-silver/80 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: formatInline(trimmedLine) }}
            />
          )
        }
      })

      flushList()
      return elements
    })
  }

  // Format inline elements (bold, italic, code, links)
  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-platinum font-medium">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-noir-subtle px-1.5 py-0.5 rounded text-accent-gold/80 text-sm font-mono">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-gold hover:underline">$1</a>')
  }

  return (
    <div className="relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-noir-subtle z-50">
        <div
          className="h-full bg-gradient-to-r from-accent-gold to-accent-gold/60 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="flex gap-12">
        {/* Main Content */}
        <article ref={contentRef} className="flex-1 min-w-0">
          {renderContent()}
        </article>

        {/* Sidebar - Table of Contents */}
        <aside className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <p className="text-label text-graphite mb-4">ON THIS PAGE</p>
            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-body-sm transition-colors duration-200 ${
                    item.level === 3 ? 'pl-4' : ''
                  } ${
                    activeSection === item.id
                      ? 'text-accent-gold'
                      : 'text-silver/50 hover:text-silver/80'
                  }`}
                  style={{
                    borderLeft: activeSection === item.id ? '2px solid' : '2px solid transparent',
                    paddingLeft: item.level === 3 ? '1.5rem' : '0.75rem',
                  }}
                >
                  {item.text}
                </a>
              ))}
            </nav>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-white/[0.06]">
              <p className="text-label text-graphite mb-4">SHARE</p>
              <div className="flex gap-3">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-4 h-4 text-silver/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 text-silver/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Copy link"
                >
                  <svg className="w-4 h-4 text-silver/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Reading Progress */}
            <div className="mt-8">
              <p className="text-label text-graphite mb-2">PROGRESS</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-gold/60 transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-xs text-silver/40 font-mono">{Math.round(readingProgress)}%</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
