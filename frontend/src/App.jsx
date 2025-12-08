import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Controls from './components/Controls';
import Preview from './components/Preview';
import QuickInput from './components/QuickInput';
import UsernameModal from './components/UsernameModal';
import MobileHeader from './components/MobileHeader';
import { useResponsive } from './hooks/useResponsive';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useImageGeneration } from './hooks/useImageGeneration';
import { useHistory } from './hooks/useHistory';
import { useGallery } from './hooks/useGallery';

function App() {
    const { t } = useTranslation();

    // Custom hooks
    const isMobile = useResponsive(1024);
    const [isDarkMode, toggleDarkMode] = useTheme();
    const [username, setUsername] = useLocalStorage('comfyui_username', '');
    const { history, addToHistory, deleteHistoryItem } = useHistory();
    const { gallery, shareToGallery } = useGallery();
    const { isGenerating, progress, statusText, currentImage, lastTimeTaken, elapsedTime, setCurrentImage, generate } = useImageGeneration();

    // UI state
    const [showSidebar, setShowSidebar] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [showQuickInput, setShowQuickInput] = useState(true);
    const [activeTab, setActiveTab] = useState('history'); // 'history' or 'gallery'
    const [showUsernameModal, setShowUsernameModal] = useState(!username);
    const [nsfwMode, setNsfwMode] = useLocalStorage('nsfw_mode', true);

    // Generation parameters
    const [params, setParams] = useState({
        prompt: '',
        negative_prompt: 'ugly, blurry, low quality',
        seed: Math.floor(Math.random() * 1000000),
        steps: 9,
        cfg: 1.0,
        width: 1024,
        height: 1024,
        denoise: 1.0
    });

    // Handle username save
    const handleUsernameSave = useCallback((name) => {
        setUsername(name);
        setShowUsernameModal(false);
    }, [setUsername]);

    // Share to gallery wrapper
    const handleShareToGallery = useCallback(async (historyItem) => {
        await shareToGallery(historyItem, username, t);
    }, [shareToGallery, username, t]);

    // Generate function wrapper
    const handleGenerate = useCallback(async () => {
        const result = await generate(params, t);
        if (result) {
            // Add to history
            const historyItem = {
                id: result.id,
                prompt: params.prompt,
                negative_prompt: params.negative_prompt,
                imageUrl: result.imageUrl,
                timestamp: result.timestamp,
                timeTaken: result.timeTaken,
                params: { ...params }
            };
            addToHistory(historyItem);
        }

        // Close mobile controls after generation
        if (isMobile) {
            setShowControls(false);
        }
    }, [generate, params, t, addToHistory, isMobile]);

    const quickGenerate = useCallback(() => {
        handleGenerate();
    }, [handleGenerate]);

    const randomizeSeed = useCallback(() => {
        setParams(prev => ({ ...prev, seed: Math.floor(Math.random() * 1000000) }));
    }, []);

    const loadHistoryItem = useCallback((item) => {
        setParams({
            prompt: item.prompt,
            negative_prompt: item.negative_prompt,
            ...item.params
        });
        setCurrentImage(item.imageUrl);

        if (isMobile) {
            setShowSidebar(false);
        }
    }, [isMobile, setCurrentImage]);

    const handleToggleSidebar = useCallback(() => {
        setShowSidebar(prev => !prev);
    }, []);

    const handleToggleNsfwMode = useCallback(() => {
        setNsfwMode(prev => !prev);
    }, []);

    // Close sidebar/controls when switching from mobile to desktop
    React.useEffect(() => {
        if (!isMobile) {
            setShowSidebar(false);
            setShowControls(false);
        }
    }, [isMobile]);

    return (
        <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-background text-foreground pt-[72px] lg:pt-0">
            {/* Username Modal */}
            {showUsernameModal && (
                <UsernameModal onSave={handleUsernameSave} />
            )}

            {/* Header - Mobile Only */}
            <MobileHeader
                activeTab={activeTab}
                showSidebar={showSidebar}
                onToggleSidebar={handleToggleSidebar}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                nsfwMode={nsfwMode}
                onToggleNsfwMode={handleToggleNsfwMode}
            />

            {/* Sidebar with tabs */}
            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                history={history}
                loadHistoryItem={loadHistoryItem}
                deleteHistoryItem={deleteHistoryItem}
                shareToGallery={handleShareToGallery}
                gallery={gallery}
                loadGalleryItem={loadHistoryItem}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                nsfwMode={nsfwMode}
                onToggleNsfwMode={handleToggleNsfwMode}
            />

            {/* Controls */}
            <Controls
                showControls={showControls}
                params={params}
                setParams={setParams}
                randomizeSeed={randomizeSeed}
                generate={handleGenerate}
                isGenerating={isGenerating}
            />

            {/* Preview */}
            <Preview
                currentImage={currentImage}
                isGenerating={isGenerating}
                progress={progress}
                statusText={statusText}
                lastTimeTaken={lastTimeTaken}
                elapsedTime={elapsedTime}
                setShowControls={setShowControls}
                showControls={showControls}
                nsfwMode={nsfwMode}
            />

            {/* Quick Input - Mobile Only */}
            <QuickInput
                isMobile={isMobile}
                showQuickInput={showQuickInput}
                showSidebar={showSidebar}
                params={params}
                setParams={setParams}
                quickGenerate={quickGenerate}
                isGenerating={isGenerating}
                showControls={showControls}
                setShowControls={setShowControls}
                randomizeSeed={randomizeSeed}
            />
        </div>
    );
}

export default App;
