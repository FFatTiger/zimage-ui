import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Share2, Trash2, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ImageList({
    items,
    variant = 'history', // 'history' | 'gallery'
    onItemClick,
    onImageClick,
    onShare,
    onDelete,
    nsfwMode,
    emptyMessage
}) {
    const { t } = useTranslation();

    if (items.length === 0) {
        return (
            <div className="text-center text-muted-foreground mt-10">
                <p>{emptyMessage || t('sidebar.noHistory')}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all duration-200"
                    onClick={() => !onImageClick && onItemClick?.(item)}
                >
                    {/* Image Container */}
                    <div
                        className={cn(
                            "relative w-full pb-[100%]",
                            onImageClick ? "cursor-pointer" : ""
                        )}
                        onClick={(e) => {
                            if (onImageClick) {
                                e.stopPropagation();
                                onImageClick(item);
                            }
                        }}
                    >
                        <img
                            src={item.imageUrl}
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover transition-all duration-300",
                                nsfwMode ? 'blur-md group-hover:blur-none' : ''
                            )}
                            loading="lazy"
                            alt={item.prompt}
                        />

                        {/* History Actions (Delete/Share) - Only for History Variant */}
                        {variant === 'history' && (
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onShare?.(item);
                                    }}
                                    title={t('sidebar.shareToGallery') || "Share"}
                                >
                                    <Share2 size={14} />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.(item.id);
                                    }}
                                    title={t('common.delete') || "Delete"}
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Metadata Overlay */}
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-8 cursor-pointer pointer-events-none"
                    >
                        {/* Wrapper for pointer events to allow clicking prompt */}
                        <div className="pointer-events-auto" onClick={(e) => {
                            if (onImageClick) { // If image click is handled separately, footer click triggers item click
                                e.stopPropagation();
                                onItemClick?.(item);
                            }
                        }}>
                            {/* Gallery: User Info */}
                            {variant === 'gallery' && (
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <User size={12} className="text-primary-foreground" />
                                    </div>
                                    <span className="text-xs font-medium text-white truncate shadow-black drop-shadow-sm">
                                        {item.username || t('gallery.anonymous')}
                                    </span>
                                </div>
                            )}

                            {/* Prompt */}
                            <p className="text-xs text-white line-clamp-2 font-medium mb-1.5 drop-shadow-md leading-tight">
                                {item.prompt}
                            </p>

                            {/* Footer Row */}
                            <div className="flex justify-between items-center text-white/90">
                                <span className="text-[10px] flex items-center gap-1 drop-shadow-sm font-medium opacity-90">
                                    {variant === 'history' && <Clock size={10} />}
                                    {variant === 'history' ? item.timestamp : new Date(item.timestamp).toLocaleDateString()}
                                </span>
                                <Badge variant="secondary" className="text-[10px] h-4 px-1 py-0 bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm">
                                    {item.timeTaken}s
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
