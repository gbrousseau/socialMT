/**
 * Constants for commonly used Tailwind classes with dark mode variants
 * Use these to maintain consistent dark mode styling across components
 */

// Background colors
export const BG_CLASSES = {
  PAGE: 'bg-gray-50 dark:bg-gray-900',
  CARD: 'bg-white dark:bg-gray-800',
  CARD_SECONDARY: 'bg-gray-50 dark:bg-gray-700',
  FORM: 'bg-white dark:bg-gray-700',
  INPUT: 'dark:bg-gray-700 dark:border-gray-600',
  BUTTON_LIGHT: 'bg-gray-100 dark:bg-gray-700',
  HIGHLIGHT: 'bg-purple-100 dark:bg-purple-900',
};

// Text colors
export const TEXT_CLASSES = {
  PRIMARY: 'text-black dark:text-white',
  SECONDARY: 'text-gray-700 dark:text-gray-300',
  MUTED: 'text-gray-500 dark:text-gray-400',
  ACCENT: 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300',
  SUCCESS: 'text-green-500 dark:text-green-400',
  ERROR: 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300',
};

// Border colors
export const BORDER_CLASSES = {
  DEFAULT: 'border-gray-200 dark:border-gray-700',
  FOCUS: 'focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-400',
  INPUT: 'border-gray-300 dark:border-gray-600',
  HIGHLIGHT: 'border-purple-500 dark:border-purple-400',
};

// Combined common element classes
export const ELEMENT_CLASSES = {
  CARD: `${BG_CLASSES.CARD} rounded-xl shadow-md`,
  CARD_SECTION: `${BG_CLASSES.CARD_SECONDARY} rounded-lg`,
  HEADING: `font-semibold ${TEXT_CLASSES.PRIMARY}`,
  BUTTON_PRIMARY: 'bg-purple-600 text-white hover:bg-purple-700',
  BUTTON_SECONDARY: `border ${BORDER_CLASSES.INPUT} ${TEXT_CLASSES.SECONDARY} hover:bg-gray-100 dark:hover:bg-gray-700`,
  INPUT: `w-full px-4 py-2 border rounded-lg ${BORDER_CLASSES.FOCUS} ${BORDER_CLASSES.INPUT} ${BG_CLASSES.INPUT} ${TEXT_CLASSES.PRIMARY}`,
}; 