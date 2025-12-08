import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2, Clock, Share2, Moon, Sun, Eye, EyeOff, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ImageList from './ImageList';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Sidebar({
    showSidebar, setShowSidebar,
    activeTab, onTabChange, // Controlled tab state
    history, loadHistoryItem, deleteHistoryItem, shareToGallery,
    gallery, loadGalleryItem,
    isDarkMode, toggleDarkMode, nsfwMode, onToggleNsfwMode
}) {
    const { t } = useTranslation();
    const [viewerImage, setViewerImage] = useState(null);

    const sidebarContent = (
        <div className="flex flex-col h-full bg-background text-foreground">
            <div className="p-6 border-b bg-background">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">
                        {activeTab === 'history' ? t('sidebar.myCreations') : t('gallery.sharedCreations')}
                    </h2>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggleNsfwMode}
                            className="hidden md:flex h-8 w-8"
                            title={nsfwMode ? "Disable NSFW blur" : "Enable NSFW blur"}
                        >
                            {nsfwMode ? <EyeOff size={18} className="text-primary" /> : <Eye size={18} className="text-muted-foreground" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                            className="hidden md:flex h-8 w-8"
                            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDarkMode ? <Sun size={18} className="text-muted-foreground" /> : <Moon size={18} className="text-muted-foreground" />}
                        </Button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="history">{t('sidebar.history')}</TabsTrigger>
                        <TabsTrigger value="gallery">{t('sidebar.gallery')}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4">
                    {/* History Content */}
                    {activeTab === 'history' && (
                        <ImageList
                            items={history}
                            variant="history"
                            onItemClick={loadHistoryItem}
                            onShare={shareToGallery}
                            onDelete={deleteHistoryItem}
                            nsfwMode={nsfwMode}
                            emptyMessage={t('sidebar.noHistory')}
                        />
                    )}

                    {/* Gallery Content */}
                    {activeTab === 'gallery' && (
                        <>
                            <ImageList
                                items={gallery}
                                variant="gallery"
                                onItemClick={loadGalleryItem}
                                onImageClick={(item) => setViewerImage(item.imageUrl)}
                                nsfwMode={nsfwMode}
                                emptyMessage={t('gallery.noCreations')}
                            />
                            {gallery.length === 0 && (
                                <div className="text-center text-muted-foreground -mt-4">
                                    <p className="text-xs">{t('gallery.shareFromHistory')}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
                <SheetContent side="left" className="p-0 w-full sm:w-80 border-r-0">
                    {sidebarContent}
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-80 flex-col border-r h-full bg-background flex-shrink-0">
                {sidebarContent}
            </aside>

            {/* Lightbox for Gallery */}
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
