import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Moon, Sun, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";

/**
 * Mobile-only header component
 */
function MobileHeader({ activeTab, onToggleSidebar, isDarkMode, onToggleDarkMode, nsfwMode, onToggleNsfwMode }) {
    const { t } = useTranslation();

    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
            {/* Background extension for safe area */}
            <div className="absolute inset-x-0 top-0 bg-background/80 backdrop-blur-md border-b pointer-events-none" style={{ height: 'calc(100% + env(safe-area-inset-top, 0px))' }} />

            {/* Header content */}
            <div
                className="relative flex items-center justify-between px-4 bg-background/80 backdrop-blur-md border-b"
                style={{
                    paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
                    paddingBottom: '1rem'
                }}
            >
                {/* Left button */}
                <Button
                    variant="ghost"
                    onClick={onToggleSidebar}
                    className="flex items-center gap-2 h-11"
                >
                    <Clock size={20} />
                    <span className="text-sm font-medium">
                        {activeTab === 'history' ? t('header.history') : t('header.gallery')}
                    </span>
                </Button>

                {/* Centered title */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-foreground pointer-events-none">
                    {t('app.title')}
                </h1>

                {/* Right buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleNsfwMode}
                        className={nsfwMode ? "text-primary hover:text-primary/90" : "text-muted-foreground"}
                        title={nsfwMode ? "Disable NSFW blur" : "Enable NSFW blur"}
                    >
                        {nsfwMode ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleDarkMode}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;
