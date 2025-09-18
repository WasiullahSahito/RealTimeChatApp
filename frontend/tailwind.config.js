// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // New Professional Color Palette
                'sidebar-bg': '#1f2937',      // Dark Slate Gray
                'chat-bg': '#f9fafb',        // Very Light Gray
                'header-bg': '#ffffff',      // White
                'accent': '#3b82f6',         // Vibrant Blue
                'accent-hover': '#2563eb',   // Darker Blue for hover
                'text-primary': '#f9fafb',   // Off-white for dark backgrounds
                'text-secondary': '#9ca3af', // Gray for subtitles, timestamps
                'text-dark': '#111827',      // Dark text for light backgrounds
                'divider': '#374151',        // Divider color for dark sidebar
                'divider-light': '#e5e7eb',  // Divider color for light areas
                'message-sent': '#3b82f6',   // Blue for sent messages
                'message-received': '#ffffff',// White for received messages
            },
        },
    },
    plugins: [],
}