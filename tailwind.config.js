/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './hooks/**/*.{js,ts,jsx,tsx,mdx}',
      './utils/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          anton: ['Anton', 'sans-serif'], // For the logo
        },
        colors: {
          // Design system colors from Figma
          text: {
            DEFAULT: '#151C26', // Text-1000 (main)
            light: '#FFFFFF', // Text-000
          },
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          // Complete neutral scale from Figma design system
          neutral: {
            50: '#FAFAFB',
            100: '#F8F8FA', // Fill-100
            200: '#F0F0F5', // Fill-200
            300: '#D9DAE3', // Fill-300
            400: '#BCBDC6', // Fill-400
            500: '#999AA3', // Fill-500
            600: '#75767F', // Fill-600
            700: '#5E5F68', // Fill-700
            800: '#474851', // Fill-800
            900: '#33343D', // Fill-900
            1000: '#151C26', // Fill-1000
          },
          // Base colors
          white: '#FFFFFF', // Grey 000 (White)
          // Deprecated: Use neutral-1000 instead of black/imperial for consistency
          // black: '#151C26', // DEPRECATED - Use neutral-1000
          // imperial: '#151C26', // DEPRECATED - Use neutral-1000
          // Brand colors from Figma design system
          brand: {
            parisDaisy: '#EEFF41', // Fill-Daisy
            dodgerBlue: '#017FFF', // Fill-Blue
            purple: '#B40AFF', // Fill-Purple (corrected from #EE41FF)
          },
          blue: {
            100: '#E9F3FE', // Fill-Blue-100
            200: '#CCE5FF', // Fill-Blue-200
          },
          purple: {
            100: '#FBF3FF',
          },
          // State colors from Figma design system
          state: {
            success: '#79F29C', // Success state
            warning: '#FFE678', // Warning state
            error: '#FF8F8F', // Error state
          },
          // Icon colors from Figma design system
          icon: {
            states: {
              error: '#FF8F8F', // Icon-Error state
            },
          },
        },
        spacing: {
          // Design system spacing tokens from Figma
          xs: '16px', // Padding xs from Figma
          sm: '12px', // spacing-sm from Figma
          '2xs': '12px',
          lg: '32px',
        },
        fontSize: {
          // Typography system matching Figma specifications exactly
          sm: '15px',
          h1: [
            '70px', // Desktop/H1: size 70, weight 500 (Medium)
            {
              lineHeight: '70px',
              letterSpacing: '0%',
              fontWeight: '500',
            },
          ],
          h2: [
            '36px', // Desktop/H2: size 36, weight 400 (Regular)
            {
              lineHeight: '42px',
              letterSpacing: '-3%',
              fontWeight: '400',
            },
          ],
          h3: [
            '18px', // Desktop/H3: size 18, weight 800 (Extra Bold)
            {
              lineHeight: '100%',
              letterSpacing: '0%',
              fontWeight: '800',
              textTransform: 'uppercase',
            },
          ],
          h4: [
            '15px', // Desktop/H4: size 15, weight 600 (Semi Bold)
            {
              lineHeight: '100%',
              letterSpacing: '-2%',
              fontWeight: '600',
            },
          ],
          body: [
            '15px', // Desktop/Body default: size 15, weight 400 (Regular)
            {
              lineHeight: '140%', // 1.399999976158142 ≈ 140%
              letterSpacing: '0%',
              fontWeight: '400',
            },
          ],
          small: [
            '12px', // Desktop/Body small: size 12, weight 400 (Regular)
            {
              lineHeight: '100%',
              letterSpacing: '0%',
              fontWeight: '400',
            },
          ],
          big: [
            '26px', // Desktop/Body big: size 18, weight 400 (Regular)
            {
              lineHeight: '140%',
              letterSpacing: '-1%',
              fontWeight: '400',
            },
          ],
        },
        borderRadius: {
          full: '9999px',
          lg: '16px',
          md: '8px',
          cards: '32px', // Cards radius from Figma design
        },
        padding: {
          '2xs': '12px',
        },
        // Animation configurations for components
        animation: {
          in: 'in 0.2s ease-out',
          out: 'out 0.2s ease-in',
        },
        keyframes: {
          in: {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          out: {
            '0%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '0', transform: 'scale(0.95)' },
          },
        },
        lineHeight: {
          120: '120%',
        },
      },
    },
    plugins: [
      // Add animation plugin functionality
      function ({ addUtilities }) {
        const utilityDefinitions = [
          { className: '.animate-in', animationName: 'in', timingFunction: 'ease-out' },
          { className: '.animate-out', animationName: 'out', timingFunction: 'ease-in' },
          { className: '.fade-in-0', animationName: 'fade-in', timingFunction: 'ease-out' },
          { className: '.fade-out-0', animationName: 'fade-out', timingFunction: 'ease-in' },
          { className: '.zoom-in-95', animationName: 'zoom-in-95', timingFunction: 'ease-out' },
          { className: '.zoom-out-95', animationName: 'zoom-out-95', timingFunction: 'ease-in' },
          { className: '.slide-in-from-top-2', animationName: 'slide-in-from-top-2', timingFunction: 'ease-out' },
          { className: '.slide-in-from-bottom-2', animationName: 'slide-in-from-bottom-2', timingFunction: 'ease-out' },
          { className: '.slide-in-from-left-2', animationName: 'slide-in-from-left-2', timingFunction: 'ease-out' },
          { className: '.slide-in-from-right-2', animationName: 'slide-in-from-right-2', timingFunction: 'ease-out' },
        ];
        const newUtilities = Object.fromEntries(
          utilityDefinitions.map(({ className, animationName, timingFunction }) => [
            className,
            {
              'animation-name': animationName,
              'animation-duration': '0.2s',
              'animation-timing-function': timingFunction,
              'animation-fill-mode': 'both',
            },
          ])
        );
  
        const keyframes = {
          '@keyframes fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          '@keyframes fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
          '@keyframes zoom-in-95': {
            '0%': { opacity: '0', transform: 'scale(0.95)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          '@keyframes zoom-out-95': {
            '0%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '0', transform: 'scale(0.95)' },
          },
          '@keyframes slide-in-from-top-2': {
            '0%': { opacity: '0', transform: 'translateY(-8px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          '@keyframes slide-in-from-bottom-2': {
            '0%': { opacity: '0', transform: 'translateY(8px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          '@keyframes slide-in-from-left-2': {
            '0%': { opacity: '0', transform: 'translateX(-8px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          '@keyframes slide-in-from-right-2': {
            '0%': { opacity: '0', transform: 'translateX(8px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
        };
  
        addUtilities({ ...newUtilities, ...keyframes });
      },
    ],
  };
  