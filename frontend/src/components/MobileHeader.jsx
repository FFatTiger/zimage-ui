import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Moon, Sun, Eye, EyeOff } from 'lucide-react';

/**
 * Mobile-only header component
 */
function MobileHeader({ activeTab, showSidebar, onToggleSidebar, isDarkMode, onToggleDarkMode, nsfwMode, onToggleNsfwMode }) {
    const { t } = useTranslation();

    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
            {/* Background extension for safe area */}
            <div className="absolute inset-x-0 top-0 bg-white dark:bg-dark-800 pointer-events-none" style={{ height: 'calc(100% + env(safe-area-inset-top, 0px))' }} />

            {/* Header content */}
            <div
                className="relative flex items-center justify-between px-4 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700"
                style={{
                    paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
                    paddingBottom: '1rem'
                }}
            >
                {/* Left button */}
                <button
                    onClick={onToggleSidebar}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors touch-manipulation text-gray-700 dark:text-gray-300 z-10"
                    style={{ minHeight: '44px', minWidth: '44px' }}
                >
                    <Clock size={20} />
                    <span className="text-sm font-medium">
                        {activeTab === 'history' ? t('header.history') : t('header.gallery')}
                    </span>
                </button>

                {/* Centered title */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900 dark:text-white pointer-events-none">
                    {t('app.title')}
                </h1>

                {/* Right buttons */}
                <div className="flex items-center gap-2 z-10">
                    <button
                        onClick={onToggleNsfwMode}
                        className={`flex items-center justify-center p-2 rounded-lg transition-colors ${nsfwMode ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'}`}
                        style={{ minHeight: '44px', minWidth: '44px' }}
                        title={nsfwMode ? "Disable NSFW blur" : "Enable NSFW blur"}
                    >
                        {nsfwMode ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <button
                        onClick={onToggleDarkMode}
                        className="flex items-center justify-center p-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
                        style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                        {isDarkMode ? <Sun size={20} className="text-gray-300" /> : <Moon size={20} className="text-gray-700" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;
