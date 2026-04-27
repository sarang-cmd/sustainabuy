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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    // Track Mouse for Liquid Effect
    useEffect(() => {
        if (!isLiquidMode) return;
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isLiquidMode]);

    const toggleLiquidMode = () => setIsLiquidMode(prev => !prev);

    return (
        <UIContext.Provider value={{ isLiquidMode, setLiquidMode: setIsLiquidMode, toggleLiquidMode }}>
            <div className={isLiquidMode ? "liquid-mode" : ""}>
                {isLiquidMode && (
                    <>
                        <div 
                            className="liquid-blob bg-cerulean-500 w-[500px] h-[500px] -top-20 -left-20 transition-transform duration-1000 ease-out" 
                            style={{ transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` }}
                        />
                        <div 
                            className="liquid-blob bg-tropical-teal-500 w-[600px] h-[600px] top-1/2 -right-40 transition-transform duration-700 ease-out" 
                            style={{ transform: `translate(${-mousePos.x * 0.03}px, ${-mousePos.y * 0.03}px)` }}
                        />
                        <div 
                            className="liquid-blob bg-tea-green-500 w-[400px] h-[400px] -bottom-20 left-1/3 transition-transform duration-1000 ease-out" 
                            style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
                        />
                        {/* Mouse Follower Blob */}
                        <div 
                            className="fixed w-96 h-96 bg-cerulean-500/20 rounded-full blur-[100px] pointer-events-none z-[-1] transition-transform duration-300 ease-out"
                            style={{ 
                                left: mousePos.x - 192, 
                                top: mousePos.y - 192,
                            }}
                        />
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
