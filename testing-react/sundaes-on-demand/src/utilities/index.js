/**
 *
 * @function formatCurrency
 * Format number as currency (US dollars)
 *
 * @param {number} amount
 * @returns {string} number formatted as  currency
 *
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 *
 * @example
 *    formatCurrency(1.5)
 *    // => $1.50
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(amount);
}
