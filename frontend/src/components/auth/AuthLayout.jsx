export default function AuthLayout({
    title,
    subtitle,
    children,
    maxWidth = "max-w-md",
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <div
                className={`
          w-full ${maxWidth}
          rounded-2xl bg-white
          p-6 sm:p-8
          shadow-lg
        `}
            >
                {/* Header */}
                {(title || subtitle) && (
                    <div className="text-center">
                        {title && (
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {title}
                            </h1>
                        )}

                        {subtitle && (
                            <p className="mt-2 text-sm text-gray-500">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="mt-6 space-y-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
