"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UIContextType {
    isLiquidMode: boolean;
    setLiquidMode: (enabled: boolean) => void;
    toggleLiquidMode: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isLiquidMode, setIsLiquidMode] = useState(true);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("sb-ui-liquid");
        if (saved !== null) {
            setIsLiquidMode(saved === "true");
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("sb-ui-liquid", isLiquidMode.toString());
    }, [isLiquidMode]);

    const toggleLiquidMode = () => setIsLiquidMode(prev => !prev);

    return (
        <UIContext.Provider value={{ isLiquidMode, setLiquidMode: setIsLiquidMode, toggleLiquidMode }}>
            <div className={isLiquidMode ? "liquid-mode" : ""}>
                {isLiquidMode && (
                    <>
                        <div className="liquid-blob bg-cerulean-500 w-[500px] h-[500px] -top-20 -left-20" />
                        <div className="liquid-blob bg-tropical-teal-500 w-[600px] h-[600px] top-1/2 -right-40" />
                        <div className="liquid-blob bg-tea-green-500 w-[400px] h-[400px] -bottom-20 left-1/3" />
                    </>
                )}
                {children}
            </div>
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within a UIProvider");
    return context;
}
