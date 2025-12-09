import React, { useState } from 'react';
import { Download, Image as ImageIcon, Clock, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export default function Preview({ currentImage, isGenerating, progress, statusText, lastTimeTaken, elapsedTime, setShowControls, showControls, nsfwMode }) {
    const { t } = useTranslation();
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // Determine what time to show: real-time elapsed or final lastTimeTaken
    const displayTime = isGenerating ? elapsedTime : lastTimeTaken;

    return (
        <div className="flex-1 bg-muted/30 relative flex items-center justify-center p-4 lg:p-10 overflow-hidden order-2 lg:order-2">

            {/* Real-time Timer - Top Left */}
            {(isGenerating || displayTime) && (
                <div className="absolute top-16 lg:top-4 left-4 z-20 px-4 py-2 bg-background/80 backdrop-blur border border-border rounded-full shadow-sm flex items-center gap-2 transition-all duration-300">
                    <Clock size={16} className={`${isGenerating ? "animate-pulse text-primary" : "text-muted-foreground"}`} />
                    <span className={`font-mono font-medium ${isGenerating ? "text-primary" : "text-foreground"}`}>
                        {displayTime}{t('time.seconds')}
                    </span>
                </div>
            )}

            {/* Placeholder */}
            {!currentImage && !isGenerating && (
                <div className="text-center text-muted-foreground">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-card border-2 border-dashed border-border flex items-center justify-center">
                        <ImageIcon size={40} className="text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium text-foreground">{t('preview.readyToCreate')}</p>
                    <p className="text-sm hidden lg:block text-muted-foreground">{t('preview.configureSettings')}</p>
                    <p className="text-sm lg:hidden text-muted-foreground">{t('preview.useQuickInput')}</p>
                </div>
            )}

            {/* Loading */}
            {isGenerating && (
                <div className="w-full max-w-2xl">
                    <div className="relative w-full aspect-square bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col items-center justify-center">
                        <div className="w-64 h-3 bg-muted rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-primary font-mono text-sm font-semibold">{statusText}</p>
                        <p className="text-muted-foreground text-xs mt-2">{progress}%</p>
                    </div>
                </div>
            )}

            {/* Result Image */}
            {currentImage && !isGenerating && (
                <>
                    <div className="relative group max-h-full max-w-full">
                        <div
                            className="relative cursor-zoom-in"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <img
                                src={currentImage}
                                className={`max-h-[80vh] max-w-full rounded-lg shadow-xl border border-border object-contain transition-all duration-300 group-hover:brightness-95 ${nsfwMode ? 'blur-xl hover:blur-none' : ''}`}
                                alt="Generated Image"
                            />

                            {/* 点击放大提示 */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 rounded-lg">
                                <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <Maximize2 size={18} className="text-primary" />
                                    <span className="text-sm font-medium text-foreground">点击查看大图</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 flex gap-2 items-start opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Download button - visible on hover */}
                            <a
                                href={currentImage}
                                download="generated.png"
                                className="p-2 bg-background/90 backdrop-blur rounded-lg hover:bg-muted text-foreground transition-all shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Download size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Lightbox 图片查看器 */}
                    <Lightbox
                        open={lightboxOpen}
                        close={() => setLightboxOpen(false)}
                        slides={[{ src: currentImage }]}
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
            )}
        </div>
    );
}
