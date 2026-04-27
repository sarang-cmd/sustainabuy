interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}: ButtonProps) {

    const baseStyles = "font-medium rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center";

    const variants = {
        primary: "bg-cerulean-500 hover:bg-cerulean-600 text-white shadow-lg shadow-cerulean-500/20",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10",
        outline: "border border-cerulean-500 text-cerulean-400 hover:bg-cerulean-500/10",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
