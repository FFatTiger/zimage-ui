import React, { useState } from 'react';
import { Dice5, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Resolution presets - keys for translation
const RESOLUTION_PRESETS = [
    { key: '720p', name: '720p', width: 1280, height: 720 },
    { key: '1080p_landscape', name: '1080p（横屏）', width: 1920, height: 1080 },
    { key: '1080p_portrait', name: '1080p（竖屏）', width: 1080, height: 1920 },
    { key: '2k', name: '2K', width: 2560, height: 1440 },
    { key: '4k', name: '4K', width: 3840, height: 2160 },
    { key: 'square512', name: 'Square 512', width: 512, height: 512 },
    { key: 'square1024', name: 'Square 1024', width: 1024, height: 1024 },
];

export default function Controls({ showControls, params, setParams, randomizeSeed, generate, isGenerating }) {
    const { t } = useTranslation();
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setParams(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    // Handle resolution preset change
    const handleResolutionChange = (preset) => {
        setParams(prev => ({
            ...prev,
            width: preset.width,
            height: preset.height
        }));
    };

    // Check if current resolution matches a preset
    const getCurrentPreset = () => {
        return RESOLUTION_PRESETS.find(
            preset => preset.width === params.width && preset.height === params.height
        );
    };

    const currentPreset = getCurrentPreset();

    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleEnhance = async () => {
        if (!params.prompt || isEnhancing) return;

        try {
            setIsEnhancing(true);
            const response = await fetch('/api/enhance_prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: params.prompt }),
            });

            if (!response.ok) throw new Error('Failed to enhance prompt');

            const data = await response.json();
            if (data.enhanced_prompt) {
                setParams(prev => ({ ...prev, prompt: data.enhanced_prompt }));
            }
        } catch (error) {
            console.error('Error enhancing prompt:', error);
        } finally {
            setIsEnhancing(false);
        }
    };


    return (
        <div
            className={`w-full lg:w-[400px] xl:w-[450px] bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 overflow-hidden order-1 lg:order-1 transition-all duration-300 flex flex-col fixed lg:relative bottom-0 lg:bottom-auto left-0 right-0 z-50 lg:z-10 rounded-t-3xl lg:rounded-none shadow-lg lg:shadow-none max-h-[60vh] lg:max-h-none ${showControls ? 'translate-y-full lg:translate-y-0' : 'translate-y-full lg:translate-y-0'
                }`}
        >
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Prompt */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t('controls.positivePrompt')}</label>
                        <button
                            onClick={handleEnhance}
                            disabled={!params.prompt || isEnhancing}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-all ${isEnhancing
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 animate-pulse'
                                : 'bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20'
                                }`}
                        >
                            <Sparkles size={12} className={isEnhancing ? 'animate-spin' : ''} />
                            {isEnhancing ? t('controls.enhancing') : t('controls.aiEnhance')}
                        </button>
                    </div>
                    <textarea
                        name="prompt"
                        value={params.prompt}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-xl p-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={t('controls.promptPlaceholder')}
                    ></textarea>
                </div>

                {/* Negative Prompt */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t('controls.negativePrompt')}</label>
                    <textarea
                        name="negative_prompt"
                        value={params.negative_prompt}
                        onChange={handleChange}
                        rows="2"
                        className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-xl p-3 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder={t('controls.negativePromptPlaceholder')}
                    ></textarea>
                </div>

                {/* Resolution Presets */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{t('controls.resolution')}</label>
                    <div className="grid grid-cols-3 gap-2">
                        {RESOLUTION_PRESETS.map((preset) => (
                            <button
                                key={preset.key}
                                onClick={() => handleResolutionChange(preset)}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${currentPreset?.name === preset.name
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-dark-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                                    }`}
                            >
                                <div className="font-bold">{t(`controls.resolutionPresets.${preset.key}`)}</div>
                                <div className="text-[10px] opacity-75">{preset.width}×{preset.height}</div>
                            </button>
                        ))}
                    </div>
                    {/* Show custom resolution if not matching presets */}
                    {!currentPreset && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('controls.custom')}: {params.width}×{params.height}
                        </div>
                    )}
                </div>

                {/* Other Settings Grid */}
                {/* Other Settings Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-600 dark:text-gray-400">{t('controls.steps')}</label>
                        <input
                            type="number"
                            name="steps"
                            value={params.steps}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-600 dark:text-gray-400">{t('controls.cfgScale')}</label>
                        <input
                            type="number"
                            name="cfg"
                            value={params.cfg}
                            onChange={handleChange}
                            step="0.1"
                            className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <label className="text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                            <span>{t('controls.seed')}</span>
                            <button
                                onClick={randomizeSeed}
                                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium"
                            >
                                <Dice5 size={14} />
                                {t('controls.randomize')}
                            </button>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="seed"
                                value={params.seed}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    onClick={generate}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all mt-4"
                >
                    {isGenerating ? t('controls.generating') : t('controls.generate')}
                </button>
            </div>
        </div>
    );
}
