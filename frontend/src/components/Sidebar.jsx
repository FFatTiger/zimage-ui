import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Trash2, Clock, Share2, Moon, Sun, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Sidebar({ showSidebar, setShowSidebar, history, loadHistoryItem, deleteHistoryItem, shareToGallery, onSwitchToGallery, isDarkMode, toggleDarkMode, nsfwMode, onToggleNsfwMode }) {
    const { t } = useTranslation();

    const sidebarContent = (
        <div className="flex flex-col h-full bg-background text-foreground">
            <div className="p-6 border-b bg-background">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">
                        {t('sidebar.myCreations')}
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
                <Tabs defaultValue="history" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="history">{t('sidebar.history')}</TabsTrigger>
                        <TabsTrigger value="gallery" onClick={onSwitchToGallery}>{t('sidebar.gallery')}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {history.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-10">
                            <p>{t('sidebar.noHistory')}</p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-card rounded-xl overflow-hidden cursor-pointer border hover:shadow-md transition-all duration-200"
                                onClick={() => loadHistoryItem(item)}
                            >
                                <div className="aspect-square w-full relative overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        className={cn(
                                            "w-full h-full object-cover transition-all",
                                            nsfwMode ? 'blur-md hover:blur-none' : '',
                                            "opacity-90 group-hover:opacity-100"
                                        )}
                                        loading="lazy"
                                        alt={item.prompt}
                                    />

                                    {/* Action Buttons */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                shareToGallery(item);
                                            }}
                                            title="Share to Gallery"
                                        >
                                            <Share2 size={14} />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteHistoryItem(item.id);
                                            }}
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6">
                                        <p className="text-xs text-white line-clamp-2 font-medium mb-1.5 drop-shadow-sm">{item.prompt}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-white/80 flex items-center gap-1">
                                                <Clock size={10} />
                                                {item.timestamp}
                                            </span>
                                            <Badge variant="secondary" className="text-[10px] h-4 px-1 py-0 bg-white/20 text-white hover:bg-white/30 border-0">
                                                {item.timeTaken}s
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
                <SheetContent side="left" className="p-0 w-80 border-r-0">
                    {sidebarContent}
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-80 flex-col border-r h-full bg-background">
                {sidebarContent}
            </aside>
        </>
    );
}
