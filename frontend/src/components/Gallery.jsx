import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, User, Users, Moon, Sun, Maximize2, Eye, EyeOff } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export default function Gallery({ showSidebar, setShowSidebar, gallery, loadGalleryItem, onSwitchToHistory, isDarkMode, toggleDarkMode, nsfwMode, setNsfwMode }) {
    const { t } = useTranslation();
    const [viewerImage, setViewerImage] = useState(null);
    return (
        <>
            {/* Backdrop */}
            {showSidebar && (
                <div
                    onClick={() => setShowSidebar(false)}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            <aside
                className={`fixed md:relative top-0 left-0 bottom-0 md:top-auto md:left-auto md:bottom-auto w-full md:w-80 bg-background border-r border-border flex flex-col transition-transform duration-300 z-[60] h-full ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                <div className="p-6 border-b border-border bg-background">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-bold tracking-tight">
                            {t('gallery.sharedCreations')}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => nsfwMode !== undefined && setNsfwMode ? setNsfwMode(!nsfwMode) : null}
                                className="hidden md:flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-muted"
                                title={nsfwMode ? "Disable NSFW blur" : "Enable NSFW blur"}
                            >
                                {nsfwMode ? <EyeOff size={18} className="text-primary" /> : <Eye size={18} className="text-muted-foreground" />}
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className="hidden md:flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-muted"
                                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDarkMode ? <Sun size={18} className="text-muted-foreground" /> : <Moon size={18} className="text-muted-foreground" />}
                            </button>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="md:hidden text-muted-foreground hover:text-foreground"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex gap-2 bg-muted p-1 rounded-lg">
                        <button
                            onClick={onSwitchToHistory}
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-background"
                        >
                            {t('sidebar.history')}
                        </button>
                        <button
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all bg-background text-foreground shadow-sm"
                        >
                            {t('sidebar.gallery')}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                    {gallery.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-10">
                            <Users size={48} className="mx-auto mb-3 text-muted-foreground/50" />
                            <p className="text-sm">{t('gallery.noCreations')}</p>
                            <p className="text-xs mt-2">{t('gallery.shareFromHistory')}</p>
                        </div>
                    ) : (
                        gallery.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all duration-200"
                            >
                                <div
                                    className="relative cursor-pointer aspect-square w-full"
                                    onClick={(e) => {
                                        // 如果点击的是图片区域，打开lightbox
                                        if (e.target.tagName === 'IMG' || e.target.closest('.image-area')) {
                                            e.stopPropagation();
                                            setViewerImage(item.imageUrl);
                                        }
                                    }}
                                >
                                    <img
                                        src={item.imageUrl}
                                        className={`image-area w-full h-full object-cover transition-all ${nsfwMode ? 'blur-md hover:blur-none' : ''}`}
                                        loading="lazy"
                                        alt={item.prompt}
                                    />
                                </div>

                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 cursor-pointer"
                                    onClick={() => loadGalleryItem(item)}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <User size={12} className="text-primary-foreground" />
                                        </div>
                                        <span className="text-xs font-medium text-white truncate">
                                            {item.username || t('gallery.anonymous')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white line-clamp-2 font-medium mb-1 drop-shadow-sm">{item.prompt}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-[10px] text-white/80">
                                            {new Date(item.timestamp).toLocaleDateString()}
                                        </span>
                                        <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">
                                            {item.timeTaken}s
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </aside>

            {/* Lightbox 图片查看器 */}
            <Lightbox
                open={!!viewerImage}
                close={() => setViewerImage(null)}
                slides={viewerImage ? [{ src: viewerImage }] : []}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 3,
                    scrollToZoom: true,
                }}
                controller={{ closeOnBackdropClick: true }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
            />
        </>
    );
}
