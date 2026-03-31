import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export default function ArticlesPage() {
  const articles = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="border-b border-amber-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              🦊 boni 的小站
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/diary" className="text-gray-600 hover:text-red-600 transition-colors">
                日记
              </Link>
              <Link href="/articles" className="text-red-600 font-medium">
                文章
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                关于
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">文章</h1>
            <p className="text-xl text-gray-600">
              技术教程、实战案例、深度思考
            </p>
          </div>

          <div className="space-y-6">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-600">还没有文章，boni 正在努力创作中...</p>
              </div>
            ) : (
              articles.map((article) => (
                <article key={article.slug} className="p-6 bg-white rounded-2xl border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    {article.category && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">{article.date}</span>
                    {article.readTime && (
                      <span className="text-gray-500 text-sm">· {article.readTime}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-red-600 transition-colors cursor-pointer">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-amber-200 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 boni 的小站. 跟有趣的人做有趣的事 🦊</p>
        </div>
      </footer>
    </div>
  );
}
