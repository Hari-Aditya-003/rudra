"use client";

import Image from "next/image";

export default function LibraryPage() {
  return (
    <main className="bg-gray-100 min-h-screen py-12">
      {/* Card Section */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-8 grid md:grid-cols-2 gap-8">
          {/* Left Side - Info + Buttons */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Public Library</h2>
            <p className="mt-2 text-gray-600">Explore books, digital resources, and more.</p>

            <div className="mt-6 grid gap-3">
              <LibraryButton color="bg-yellow-500" hover="hover:bg-yellow-600" text="Account Login" />
              <LibraryButton color="bg-yellow-400" hover="hover:bg-yellow-500" text="Catalog" />
              <LibraryButton color="bg-orange-400" hover="hover:bg-orange-500" text="PIN / Password Reset" />
              <LibraryButton color="bg-blue-500" hover="hover:bg-blue-600" text="Contact Us" />
              <LibraryButton color="bg-blue-500" hover="hover:bg-blue-600" text="PowerPac" />
              <LibraryButton color="bg-blue-600" hover="hover:bg-blue-700" text="Library Hours and Locations" />
              <LibraryButton color="bg-blue-600" hover="hover:bg-blue-700" text="Event Calendar" />
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/library-building.jpg"
              alt="Library Building"
              width={500}
              height={350}
              className="rounded-lg shadow-md object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function LibraryButton({
  color,
  hover,
  text,
}: {
  color: string;
  hover: string;
  text: string;
}) {
  return (
    <button
      type="button"
      className={`w-full rounded-md ${color} px-4 py-2 font-semibold text-white ${hover}`}
    >
      {text}
    </button>
  );
}
