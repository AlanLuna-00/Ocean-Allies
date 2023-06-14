import Link from "next/link";

function Navigation() {
    return (
        <nav class="bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex-shrink-0">
                        <Link href="/" class="text-white text-lg font-bold">
                            Ocean Allies
                        </Link>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/home"
                                class="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                class="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/shop"
                                class="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/contact"
                                class="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
