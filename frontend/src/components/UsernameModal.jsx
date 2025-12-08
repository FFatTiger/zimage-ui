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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border">
                {/* Header */}
                <div className="p-6 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                            <User size={24} className="text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Welcome!</h2>
                            <p className="text-sm text-muted-foreground">Set your display name</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-card">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            autoFocus
                            className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                        <p className="text-xs text-muted-foreground">
                            This name will be shown when you share creations to the gallery. It's stored locally in your browser only.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="flex-1 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-md shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
