import {defineConfig} from 'vitepress'
import {DefaultTheme} from "vitepress/theme";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ACOT Documentation",
    description: "ACOT Website Instructions",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: nav(),

        sidebar: {
            '/': { base: '/', items: sidebarUsage() }
        },

        search: {options: searchOptions()},

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
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
    search: {
        provider: "local",
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
            text: 'Usage',
            link: '/what-is-acot',
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
                { text: 'What is ACOT?', link: 'what-is-acot' },
                { text: 'Writing Configuration', link: 'usage-of-configuration' }
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