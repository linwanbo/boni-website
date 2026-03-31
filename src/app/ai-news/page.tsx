
import Link from "next/link";
import { getAllAiNews } from "@/lib/content";

export default function AiNewsPage() {
  const aiNews = getAllAiNews();

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
              <Link href="/growth" className="text-gray-600 hover:text-red-600 transition-colors">
                学习日志
              </Link>
              <Link href="/essays" className="text-gray-600 hover:text-red-600 transition-colors">
                思考随笔
              </Link>
              <Link href="/ai-news" className="text-red-600 font-medium">
                AI 精选
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-red-600 transition-colors">
                AI 活动
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI 精选</h1>
            <p className="text-xl text-gray-600">
              精选 AI 领域的重要新闻和动态
            </p>
          </div>

          <div className="space-y-6">
            {aiNews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-gray-600">还没有 AI 精选，正在收集中...</p>
              </div>
            ) : (
              aiNews.map((news) => (
                <article key={news.slug} className="p-6 bg-white rounded-2xl border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">{news.date}</span>
                    {news.source && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {news.source}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {news.excerpt}
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
