'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface Reel {
  _id: string
  title: string
  category: string
  videoUrl: string
}

export default function Home() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReels() {
      try {
        const query = `*[_type == "reel"] | order(_createdAt desc) {
          _id,
          title,
          category,
          "videoUrl": videoFile.asset->url
        }`
        const data = await client.fetch(query)
        setReels(data)
      } catch (error) {
        console.error('Error fetching reels:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReels()
  }, [])

  // Extract unique categories (defaults to 'Featured' if category is blank)
  const categories = Array.from(
    new Set(reels.map((r) => r.category || 'Featured'))
  )

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16 md:px-20 max-w-7xl mx-auto">
      {/* Minimalist Header */}
      <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 pb-12">
        <div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mt-2 text-zinc-900">
            AKHIL <span className="font-normal text-zinc-400">THOMAS</span>
          </h1>
          <p className="text-zinc-500 font-light mt-3 text-base max-w-md">
            Precision Video Editing. Turning complex visual concepts into crisp, high-impact short-form content.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 text-xs font-medium tracking-wider uppercase">
          <a 
            href="mailto:kodikattuakhil@gmail.com"
            className="group inline-flex items-center gap-2 text-black border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-all"
          >
            kodikattuakhil@gmail.com
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a 
            href="tel:+97156151045"
            className="text-zinc-400 hover:text-black transition-colors"
          >
            +971 56 151 045
          </a>
        </div>
      </header>

      {/* Categorized Video Sections */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[9/16] bg-zinc-100 rounded-xl animate-pulse border border-zinc-200" />
          ))}
        </div>
      ) : reels.length === 0 ? (
        <div className="text-center py-32 border border-zinc-200 rounded-2xl bg-zinc-50/50">
          <p className="text-zinc-400 text-sm font-light">No reels published yet.</p>
          <p className="text-xs text-zinc-400 mt-2">
            Upload via <code className="text-black bg-zinc-100 px-2 py-1 rounded">/studio</code>
          </p>
        </div>
      ) : (
        <div className="space-y-24">
          {categories.map((category) => {
            const categoryReels = reels.filter(
              (r) => (r.category || 'Featured') === category
            )

            return (
              <section key={category}>
                <div className="border-b border-zinc-100 pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-900">
                    {category}
                  </h2>
                  <span className="text-xs text-zinc-400">
                    {categoryReels.length} {categoryReels.length === 1 ? 'Video' : 'Videos'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {categoryReels.map((reel) => (
                    <div key={reel._id} className="group flex flex-col">
                      <div className="relative aspect-[9/16] bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 shadow-sm group-hover:shadow-xl transition-all duration-500">
                        <video
                          src={reel.videoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-medium text-sm text-zinc-900 tracking-tight">
                          {reel.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Minimalist Footer */}
      <footer className="mt-32 pt-12 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 font-light gap-4">
        <p>© 2026 Akhil Thomas. All rights reserved.</p>
        <p className="tracking-wide">DESIGNED FOR SPEED & IMPACT</p>
      </footer>
    </main>
  )
}