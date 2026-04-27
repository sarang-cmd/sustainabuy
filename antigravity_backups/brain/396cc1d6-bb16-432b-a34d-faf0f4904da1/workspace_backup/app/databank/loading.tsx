export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse space-y-16">
                <div className="space-y-6 text-center">
                    <div className="h-12 w-64 bg-white/5 rounded-2xl mx-auto" />
                    <div className="h-6 w-96 bg-white/5 rounded-xl mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-64 bg-white/5 rounded-[40px]" />
                    ))}
                </div>
            </div>
        </div>
    );
}
