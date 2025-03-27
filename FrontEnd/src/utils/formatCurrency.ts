export const formatCurrency = ({ amount, currency = 'USD' }: FormatCurrencyProps) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};