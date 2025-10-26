export default function HomePage(){
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Welcome</h1>
      </div>
      <p className="mt-4 text-slate-700">Your starter homepage. Use the nav to explore.</p>
      <div className="mt-8 aspect-video w-full max-w-3xl">
        <iframe
          className="w-full h-full rounded"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Sample"
          allowFullScreen
        />
      </div>
    </main>
  );
}
