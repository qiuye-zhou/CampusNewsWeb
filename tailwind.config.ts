/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            screens: {
                'light-mode': { raw: '(prefers-color-scheme: light)' },
                'dark-mode': { raw: '(prefers-color-scheme: dark)' },

                'w-screen': '100vw',
                'h-screen': '100vh'
            },
            maxWidth: {
                screen: '100vw'
            },
            width: {
                screen: '100vw'
            },
            height: {
                screen: '100vh'
            },
            maxHeight: {
                screen: '100vh'
            },

            colors: {
                themed: {
                    bg_opacity: 'var(--bg-opacity)'
                }
            }
        }
    }
}
