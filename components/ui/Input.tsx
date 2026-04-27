interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className={`
            w-full bg-jet-black-800/50 border border-white/10 rounded-xl px-4 py-2.5 
            text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500/50 focus:border-cerulean-500
            transition-all duration-200 backdrop-blur-sm
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
