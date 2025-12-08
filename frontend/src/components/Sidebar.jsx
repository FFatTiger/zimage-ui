import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2, Clock, Share2, Moon, Sun, Eye, EyeOff } from 'lucide-react';

export default function Sidebar({ showSidebar, setShowSidebar, history, loadHistoryItem, deleteHistoryItem, shareToGallery, onSwitchToGallery, isDarkMode, toggleDarkMode, nsfwMode, onToggleNsfwMode }) {
    const { t } = useTranslation();
    return (
        <>
            {/* Backdrop */}
            {showSidebar && (
                <div
                    onClick={() => setShowSidebar(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            <aside
                className={`fixed md:relative top-0 left-0 bottom-0 md:top-auto md:left-auto md:bottom-auto w-full md:w-80 bg-gray-50 dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col transition-transform duration-300 z-[60] h-full ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="p-6 border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {t('sidebar.myCreations')}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onToggleNsfwMode}
                                className="hidden md:block p-2 rounded-lg transition-colors"
                                title={nsfwMode ? "Disable NSFW blur" : "Enable NSFW blur"}
                            >
                                {nsfwMode ? <EyeOff size={18} className="text-primary" /> : <Eye size={18} className="text-gray-500" />}
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="hidden md:block p-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
                                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDarkMode ? <Sun size={18} className="text-gray-300" /> : <Moon size={18} className="text-gray-700" />}
                            </button>
                            <button onClick={() => setShowSidebar(false)} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex gap-2 bg-gray-100 dark:bg-dark-900 p-1 rounded-lg">
                        <button
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                        >
                            {t('sidebar.history')}
                        </button>
                        <button
                            onClick={onSwitchToGallery}
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-dark-700"
                        >
                            {t('sidebar.gallery')}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-dark-800">
                    {history.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            <p>{t('sidebar.noHistory')}</p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white dark:bg-dark-700 rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-dark-600 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-primary/20 transition-all duration-200"
                                onClick={() => loadHistoryItem(item)}
                            >
                                <img
                                    src={item.imageUrl}
                                    className={`w-full h-40 object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-all ${nsfwMode ? 'blur-md hover:blur-none' : ''}`}
                                    loading="lazy"
                                    alt={item.prompt}
                                />

                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {/* Share Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            shareToGallery(item);
                                        }}
                                        className="p-1.5 bg-white/90 dark:bg-dark-800/90 hover:bg-primary hover:text-white text-gray-700 dark:text-gray-300 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all shadow-sm"
                                        title="Share to Gallery"
                                    >
                                        <Share2 size={16} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteHistoryItem(item.id);
                                        }}
                                        className="p-1.5 bg-white/90 dark:bg-dark-800/90 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all shadow-sm"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-black/90 via-white/95 dark:via-transparent to-transparent p-3">
                                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 font-medium dark:font-normal">{item.prompt}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Clock size={10} />
                                            {item.timestamp}
                                        </span>
                                        <span className="text-[10px] bg-blue-50 dark:bg-primary/20 text-primary dark:text-primary px-1.5 py-0.5 rounded font-medium">
                                            {item.timeTaken}s
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </>
    );
}
