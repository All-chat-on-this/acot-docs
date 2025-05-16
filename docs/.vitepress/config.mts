import {defineConfig} from 'vitepress'
import {DefaultTheme} from "vitepress/theme";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ACOT Documentation",
    description: "ACOT Website Instructions",

    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/ai-agent.svg'}],
        ['link', {rel: 'icon', type: 'image/png', href: '/vitepress-logo-mini.png'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:site_name', content: 'ACOT Docs'}]
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: {src: '/book.svg', width: 24, height: 24},

        nav: nav(),

        sidebar: {
            '/': {base: '/', items: sidebarUsage()}
        },

        search: {provider: 'local', options: searchOptions()},

        socialLinks: [
            {icon: 'github', link: 'https://github.com/All-chat-on-this'}
        ],

        docFooter: {
            prev: 'Previous Page',
            next: 'Next Page'
        },

        outline: {
            label: 'On This Page'
        },

        lastUpdated: {
            text: 'Last Updated'
        },

        notFound: {
            title: 'Page Not Found',
            quote:
                'But if you don\'t change your direction, and if you keep looking, you may end up where you are heading.',
            linkLabel: 'Go to home',
            linkText: 'Take me home'
        },

        langMenuLabel: 'Languages',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        skipToContentLabel: 'Skip to content'
    },
    locales: {
        root: {
            label: 'English',
            lang: 'en-US',
        },
        zh: {
            label: '简体中文',
            lang: 'zh-CN',
        },
    },
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Home',
            link: '/',
            activeMatch: '/'
        },
        {
            text: 'Instructions',
            link: '/what-is-acot',
            activeMatch: '/'
        },
        {
            text: 'Usage',
            link: '/usage-of-configuration',
            activeMatch: '/'
        },
        {
            text: 'Security',
            link: '/about-security',
            activeMatch: '/'
        }
    ]
}

function sidebarUsage(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Usage',
            collapsed: false,
            items: [
                {text: 'What is ACOT?', link: 'what-is-acot'},
                {text: 'Writing Configuration', link: 'usage-of-configuration'}
            ]
        },
        {
            text: 'Security',
            collapsed: false,
            items: [
                {text: 'About Security', link: 'about-security'}
            ]
        }
    ]
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
    return {
        placeholder: 'Search Documentation',
        translations: {
            button: {
                buttonText: 'Search Documentation',
                buttonAriaLabel: 'Search Documentation'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: 'Clear the query',
                    resetButtonAriaLabel: 'Clear the query',
                    cancelButtonText: 'Cancel',
                    cancelButtonAriaLabel: 'Cancel'
                },
                startScreen: {
                    recentSearchesTitle: 'Search History',
                    noRecentSearchesText: 'No search history',
                    saveRecentSearchButtonTitle: 'Save to search history',
                    removeRecentSearchButtonTitle: 'Remove from search history',
                    favoriteSearchesTitle: 'Favorite',
                    removeFavoriteSearchButtonTitle: 'Remove from favorites'
                },
                errorScreen: {
                    titleText: 'Unable to fetch results',
                    helpText: 'You might want to check your network connection'
                },
                footer: {
                    selectText: 'Select',
                    navigateText: 'Navigate',
                    closeText: 'Close',
                    searchByText: 'Search provider'
                },
                noResultsScreen: {
                    noResultsText: 'No results for',
                    suggestedQueryText: 'You might try',
                    reportMissingResultsText: 'Believe this query should return results?',
                    reportMissingResultsLinkText: 'Give feedback'
                }
            }
        }
    }
}