'use client'
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { Plus, Search, Play } from "lucide-react";
import Link from "next/link";

const Page = () => {
    const [activeTab, setActiveTab] = useState("my-workflows");

    return (
        <div className="flex w-full h-full">
            <Sidebar />

            <div className="w-full">
                <div className=" bg-[#0a0a0a] text-white p-8 font-sans">
                    {/* Header Banner */}
                    <div className="flex justify-between items-center w-full bg-[#111111] rounded-3xl p-10 overflow-hidden mb-8">
                        <div className="max-w-xl ">
                            <h1 className="text-4xl font-bold mb-2 tracking-tight">
                                Build your perfect Workflow
                            </h1>
                            <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                                Create custom node-based Workflows linking tools and models for
                                automated creative control
                            </p>
                            <Link href={'Untitledworkflow'}>
                                <button className="flex items-center gap-2 bg-transparent px-3 py-2 rounded-2xl font-medium transition-colors border-2 border-[#1d1c1c] hover:bg-[#111111] cursor-pointer">
                           
                                <Plus size={18} strokeWidth={3} />
                                Create New Workflow
                            </button>
                             </Link>
                        </div>

                        {/* Right Image */}
                        <div className=" w-110 hidden lg:block ">
                        <video src="https://imagine.animagic.art/imagine-one/workflows/dashboard/banner/banner-dark-169.webm" class="rounded-r-6 desktop:aspect-video tablet:aspect-4/3 ml-auto h-full translate-z-0" autoplay="" loop="" playsinline=""></video>
                        </div>
                          </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 bg-[#1a1a1a] w-fit p-1 rounded-2xl mb-10 border border-white/5">
                        <button
                            onClick={() => setActiveTab("my-workflows")}
                            className={`px-6 py-2 rounded-2xl text-sm font-medium transition-all ${activeTab === "my-workflows"
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            My Workflows
                        </button>

                        <button
                            onClick={() => setActiveTab("discover")}
                            className={`px-6 py-2 rounded-2xl text-sm font-medium transition-all ${activeTab === "discover"
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Discover
                        </button>
                    </div>

                    {/* Content */}
                    {activeTab === "my-workflows" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    {/* Main Video/Thumbnail Box */}
                                    <div className="aspect-video bg-[#111111] border border-white/5 rounded-2xl animate-pulse" />

                                    {/* Bottom Title Bar */}
                                    <div className="h-10 w-full bg-[#111111] border border-white/5 rounded-xl animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <DiscoverContent />
                    )}
                </div>
            </div>
        </div>
    );
};

/* -- Discover Section --- */

function DiscoverContent() {
    const categories = [
        "All",
        "Cinematic",
        "Advertising",
        "Fashion",
        "Branding",
        "Editing",
    ];

    return (
        <div className="space-y-12">
            {/* Getting Started */}
            <section>
                <h2 className="text-xl font-semibold mb-6">Getting Started</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StarterCard
                        title="Welcome to Workflows"
                        subtitle="Learn Basics, and Interface"
                        image="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400"
                    />
                    <StarterCard
                        title="Create Images"
                        subtitle="Shape every detail of images"
                        image="https://images.unsplash.com/photo-1558655146-d09347e92766?w=400"
                    />
                    <StarterCard
                        title="Create Videos"
                        subtitle="Direct your every video motion"
                        image="https://imagine.animagic.art/imagine-one/workflows/getting-started/1.png"
                        isVideo
                    />
                </div>
            </section>

            {/* Templates */}
            <section>
                <h2 className="text-xl font-semibold mb-6">Templates</h2>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${cat === "All"
                                    ? "bg-white text-black border-white"
                                    : "border-white/20 text-gray-400 hover:border-white/40 hover:bg-[#171717] cursor-pointer"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-xs">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30"
                        />
                    </div>
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg font-medium text-white mb-1">
                        No results found
                    </p>
                    <p className="text-gray-500 text-sm">
                        Try adjusting your search or check your spelling
                    </p>
                </div>
            </section>
        </div>
    );
}

/* ----- Starter Card ------- */

function StarterCard({
    title,
    subtitle,
    image,
    isVideo,
}: {
    title: string;
    subtitle: string;
    image: string;
    isVideo?: boolean;
}) {
    return (
        <div className="flex items-center gap-4 bg-[#111111] p-2 rounded-2xl border border-white/5 cursor-pointer hover:border-white/20 transition-all group">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play fill="white" size={20} />
                    </div>
                )}
            </div>

            <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    );
}

export default Page;