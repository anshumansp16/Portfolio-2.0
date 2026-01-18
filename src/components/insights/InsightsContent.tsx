'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost } from '@/data/blogs'

interface InsightsContentProps {
  posts: BlogPost[]
  categories: string[]
}

// Search Icon
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

// Arrow Icon
const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

export function InsightsContent({ posts, categories }: InsightsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  // Get featured post (first one or most recent)
  const featuredPost = posts[0]
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug)

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length }
    posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1
    })
    return counts
  }, [posts])

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.p
          className="text-label text-accent-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          REFLECTIONS
        </motion.p>
        <motion.h1
          className="text-display-md md:text-display-lg font-display text-platinum mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Long-form Thinking
        </motion.h1>
        <motion.p
          className="text-body-lg text-silver/60 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          On AI systems, the philosophy of building, first principles thinking,
          and the discipline of creating things that last.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-silver/40">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-noir-subtle border border-white/[0.06] rounded-xl text-platinum placeholder:text-silver/40 focus:border-accent-gold/50 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-silver/40 hover:text-silver"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-body-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent-gold text-noir-primary font-medium'
                  : 'bg-white/[0.03] text-silver/60 hover:bg-white/[0.06] hover:text-silver'
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-60">
                ({categoryCounts[category] || 0})
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Article */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-label text-graphite mb-6">FEATURED</p>
          <Link href={`/insights/${featuredPost.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06]">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[16/10] md:aspect-auto">
                  <Image
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-noir-primary/80 via-noir-primary/40 to-transparent md:bg-gradient-to-l" />
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-accent-gold/10 rounded-full text-label text-accent-gold mb-4 w-fit">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-headline-lg md:text-display-sm font-display text-platinum mb-4 group-hover:text-accent-gold transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-body text-silver/70 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-body-sm text-silver/50">
                      <span>{featuredPost.date}</span>
                      <span className="text-graphite">·</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <span className="flex items-center gap-2 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article <ArrowIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-body-sm text-silver/50">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Articles Grid */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {(selectedCategory === 'All' && searchQuery === '' ? regularPosts : filteredPosts).map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/insights/${post.slug}`} className="group block h-full">
                  <article className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-primary via-noir-primary/20 to-transparent" />
                      <span className="absolute bottom-4 left-4 px-3 py-1 bg-noir-primary/80 backdrop-blur-sm rounded-full text-label-sm text-accent-gold">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-headline-sm font-display text-platinum mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-body-sm text-silver/60 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-label-sm text-graphite">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/[0.03] flex items-center justify-center">
              <SearchIcon />
            </div>
            <h3 className="text-headline-sm font-display text-platinum mb-2">
              No articles found
            </h3>
            <p className="text-body-sm text-silver/60 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="text-accent-gold hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Section */}
      <motion.div
        className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-accent-gold/10 via-accent-gold/5 to-transparent border border-accent-gold/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-headline-lg font-display text-platinum mb-4">
            Slow Ideas, Delivered Occasionally
          </h3>
          <p className="text-body text-silver/70 mb-8">
            Long-form thinking on AI, building, and the craft of creating things
            that matter. No hustle culture. No growth hacks. Just depth.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-noir-primary border border-white/[0.1] rounded-lg text-platinum placeholder:text-silver/40 focus:border-accent-gold/50 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent-gold text-noir-primary font-medium rounded-lg hover:bg-accent-gold/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-label-sm text-silver/40 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>

      {/* Topics Cloud */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-label text-graphite mb-6">WHAT I THINK ABOUT</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {[
            'First Principles',
            'Deep Work',
            'Simplicity',
            'AI Systems',
            'Long-term Thinking',
            'Minimalism',
            'Craft',
            'Systems Thinking',
            'Focus',
            'Building',
            'Constraints',
            'Decisions',
          ].map((topic) => (
            <span
              key={topic}
              className="px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-full text-body-sm text-silver/60 hover:text-silver hover:border-white/[0.1] transition-colors cursor-default"
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
