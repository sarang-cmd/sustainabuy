export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="animate-pulse space-y-12">
                <div className="space-y-4">
                    <div className="h-4 w-32 bg-white/5 rounded-full" />
                    <div className="h-16 w-1/2 bg-white/5 rounded-2xl" />
                    <div className="h-6 w-1/3 bg-white/5 rounded-xl" />
                </div>

                <div className="flex gap-4 overflow-x-hidden">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-12 w-32 bg-white/5 rounded-2xl shrink-0" />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-[4/5] bg-white/5 rounded-3xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
