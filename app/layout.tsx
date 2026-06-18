import "./globals.css";
import Link from "next/link";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "세카이 두부도감",
  description: "프로젝트 세카이 한국서버 미래시 & 카드 체크리스트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>
          <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur dark:bg-zinc-950/70">
            {/* 🌟 수정됨: max-w-6xl -> w-full max-w-[1920px] 로 변경하여 상단바도 와이드하게! */}
            <div className="mx-auto flex h-14 w-full max-w-[1920px] items-center justify-between px-4 md:px-8">
              <Link href="/" className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold tracking-tight">Sekard</span>
                <span className="text-xs text-zinc-400">I 두부도감</span>
              </Link>

              <nav className="flex items-center gap-2 text-sm">
                <Link
                  href="/cards"
                  className="rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                >
                  내 카드
                </Link>
                <Link
                  href="/future"
                  className="rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                >
                  미래시
                </Link>

                <ThemeToggle />
              </nav>
            </div>
          </header>

          {/* 🌟 수정됨: max-w-6xl 족쇄 삭제! page.tsx가 화면 전체를 자유롭게 쓸 수 있도록 w-full 적용 */}
          <main className="w-full">{children}</main>

          {/* 🌟 수정됨: 푸터도 와이드 화면에 맞게 제한을 풀었습니다 */}
          <footer className="mx-auto w-full max-w-[1920px] px-4 md:px-8 pb-10 pt-6 text-xs text-zinc-500">
            개인 제작 사이트 · 데이터/이미지의 권리는 각 권리자에게 있습니다.
          </footer>
        </Providers>
      </body>
    </html>
  );
}