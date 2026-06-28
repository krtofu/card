import "./globals.css";
import Providers from "./providers";
import GlobalHeader from "@/components/GlobalHeader";

export const metadata = {
  title: "세카이 두부도감",
  description: "프로젝트 세카이 한국서버 미래시 & 카드 체크리스트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>
          {/* 🌟 분리한 상단바 컴포넌트가 들어갑니다 */}
          <GlobalHeader />

          <main className="w-full">{children}</main>

          <footer className="mx-auto w-full max-w-[1920px] px-4 md:px-8 pb-10 pt-6 text-xs text-zinc-500">
            개인 제작 사이트 · 데이터/이미지의 권리는 각 권리자에게 있습니다.
          </footer>
        </Providers>
      </body>
    </html>
  );
}