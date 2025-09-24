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
                    'brand-bg-main': '#1e2126',      // Main chat window background
                    'brand-bg-sidebar': '#282b30', // Sidebar background
                    'brand-bg-header': '#2c2f34',  // Chat Header & Input background
                    'brand-bg-input': '#35393e',   // Search bar and message input field

                    'brand-primary': '#4a75dd',     // Active chat item background
                    'brand-accent': '#5c85e7',      // Sent message bubble

                    'brand-text-light': '#ffffff',  // Main text
                    'brand-text-dim': '#8e9297',    // Secondary text (timestamps, placeholders)
                    'brand-text-online': '#2dc770', // Online status text

                    'brand-divider': '#222529',     // Borders
                },
            },
        },
        plugins: [],
    }