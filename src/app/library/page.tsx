export default function LibraryPage() {
  return (
    <main className="bg-gray-100 min-h-screen py-12">
      {/* Other sections above */}

      {/* Card Section */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-8 grid md:grid-cols-2 gap-8">
          
          {/* Left Side - Info + Buttons */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Public Library</h2>
            <p className="mt-2 text-gray-600">Explore books, digital resources, and more.</p>

            <div className="mt-6 grid gap-3">
              <button className="w-full rounded-md bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600">
                Account Login
              </button>
              <button className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-white hover:bg-yellow-500">
                Catalog
              </button>
              <button className="w-full rounded-md bg-orange-400 px-4 py-2 font-semibold text-white hover:bg-orange-500">
                PIN / Password Reset
              </button>
              <button className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                Contact Us
              </button>
              <button className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
                PowerPac
              </button>
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                Library Hours and Locations
              </button>
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                Event Calendar
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center">
            <img
              src="/library-building.jpg" // replace with your image in /public folder
              alt="Library Building"
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}