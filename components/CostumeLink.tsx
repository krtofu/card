"use client";

export default function CostumeLink() {
  return (
    <section>
      <a
        href="#"
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          ▶
        </span>
        <div>
          <div className="font-semibold">의상/헤어 구경하러 가기</div>
          <div className="text-sm text-zinc-400">
            (나중에 내부 페이지 또는 외부 링크로 연결)
          </div>
        </div>
      </a>
    </section>
  );
}