import Link from "next/link";

function Navigation() {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <h1 className="text-white text-xl font-bold">Ocean Allies</h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-auto flex items-baseline space-x-4">
                            <Link
                                href="/home"
                                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/shop"
                                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
