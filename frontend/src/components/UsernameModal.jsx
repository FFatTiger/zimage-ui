import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, X } from 'lucide-react';

export default function UsernameModal({ onSave }) {
    const { t } = useTranslation();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-dark-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                            <User size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Welcome!</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Set your display name</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white dark:bg-dark-800">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            autoFocus
                            className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-300 dark:border-dark-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            This name will be shown when you share creations to the gallery. It's stored locally in your browser only.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium shadow-md shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
