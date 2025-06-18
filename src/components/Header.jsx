export default function Header() {
  return (
    <header className="bg-[#E6F4EA] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Site Name or Logo */}
        <div className="text-2xl font-bold text-[#34A853] cursor-pointer">
          FoodFacts
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <a
            href="/"
            className="hover:text-[#34A853] cursor-pointer transition"
          >
            Products
          </a>
          <a
            href="/about"
            className="hover:text-[#34A853] cursor-pointer transition"
          >
            About
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-[#34A853] focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
