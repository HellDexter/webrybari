'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Edit, Trash2, ExternalLink, Search, Filter } from 'lucide-react'
import { deleteArticle } from './actions'

type Article = any // Můžete nahradit konkrétním typem z vaší DB

export default function ArticlesTableClient({ articles }: { articles: Article[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [authorFilter, setAuthorFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all') // 'all', 'newest', 'oldest'

  // Získání unikátních autorů pro filtr
  const authors = useMemo(() => {
    const uniqueAuthors = new Map()
    articles.forEach(a => {
      if (a.author) {
        uniqueAuthors.set(a.author.id, `${a.author.first_name} ${a.author.last_name}`)
      }
    })
    return Array.from(uniqueAuthors.entries())
  }, [articles])

  // Získání unikátních kategorií pro filtr
  const categories = useMemo(() => {
    const uniqueCats = new Set<string>()
    articles.forEach(a => {
      if (a.category?.name) uniqueCats.add(a.category.name)
    })
    return Array.from(uniqueCats)
  }, [articles])

  // Filtrace a řazení
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Filtr podle hledaného textu (název)
      if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      // Filtr podle autora
      if (authorFilter !== 'all' && article.author?.id !== authorFilter) {
        return false
      }

      // Filtr podle kategorie
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'none' && article.category?.name) return false
        if (categoryFilter !== 'none' && article.category?.name !== categoryFilter) return false
      }

      // Filtr podle stavu
      if (statusFilter !== 'all') {
        const isPublished = statusFilter === 'published'
        if (article.published !== isPublished) return false
      }

      return true
    }).sort((a, b) => {
      // Řazení podle data
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      if (dateFilter === 'oldest') {
        return dateA - dateB
      }
      return dateB - dateA // default 'newest'
    })
  }, [articles, searchTerm, authorFilter, categoryFilter, statusFilter, dateFilter])

  return (
    <div className="space-y-4">
      {/* Filtrační lišta */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
            placeholder="Hledat článek podle názvu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400 hidden lg:block" />
          
          <select 
            className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 text-gray-900 focus:ring-green-500 focus:border-green-500 bg-white"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="all">Všichni autoři</option>
            {authors.map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          <select 
            className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 text-gray-900 focus:ring-green-500 focus:border-green-500 bg-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Všechny kategorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="none">Nezařazeno</option>
          </select>

          <select 
            className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 text-gray-900 focus:ring-green-500 focus:border-green-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Jakýkoliv stav</option>
            <option value="published">Publikováno</option>
            <option value="draft">Koncept</option>
          </select>

          <select 
            className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 text-gray-900 bg-white focus:ring-green-500 focus:border-green-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="newest">Nejnovější</option>
            <option value="oldest">Nejstarší</option>
          </select>
        </div>
      </div>

      {/* Tabulka */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Název</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategorie</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stav</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Akce</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    <div className="text-sm text-gray-500">/{article.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.author?.first_name} {article.author?.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {article.category?.name ? (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {article.category.name}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Nezařazeno</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${article.published ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                      {article.published ? 'Publikováno' : 'Koncept'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link href={`/aktuality/${article.slug}`} className="text-gray-400 hover:text-gray-600" title="Zobrazit na webu" target="_blank">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link href={`/admin/clanky/${article.id}`} className="text-blue-600 hover:text-blue-900" title="Upravit článek">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <form action={deleteArticle.bind(null, article.id)}>
                        <button type="submit" className="text-red-600 hover:text-red-900" title="Smazat">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                  Zadaným filtrům nevyhovuje žádný článek.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
