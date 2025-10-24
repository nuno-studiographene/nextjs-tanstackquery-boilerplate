import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/assets/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1>Stack Guardian</h1>
      </main>
    </div>
  );
}
