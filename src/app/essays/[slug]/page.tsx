
import Link from "next/link";
import { getEssayBySlug, getAllEssays } from "@/lib/content";
import { notFound } from "next/navigation";
import { use } from "react";

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export default function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const essay = getEssayBySlug(resolvedParams.slug);

  if (!essay) {
    notFound();
  }

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
              <Link href="/essays" className="text-red-600 font-medium">
                思考随笔
              </Link>
              <Link href="/ai-news" className="text-gray-600 hover:text-red-600 transition-colors">
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
          <Link href="/essays" className="text-red-600 hover:text-red-700 font-medium mb-8 inline-block">
            ← 返回思考随笔列表
          </Link>
          <article className="p-8 bg-white rounded-2xl border border-amber-200">
            <div className="text-sm text-gray-500 mb-4">{essay.date}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {essay.title}
            </h1>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {essay.content}
            </div>
          </article>
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
