# @hua-labs/i18n-formatters

Date, Number, and Currency formatting utilities for the HUA i18n ecosystem.

## Installation

```bash
npm install @hua-labs/i18n-formatters @hua-labs/i18n-core
```

## Usage

```tsx
// All formatters
import { formatDate, formatNumber, formatCurrency } from '@hua-labs/i18n-formatters';

// Subpath imports for tree-shaking
import { useDateFormatter } from '@hua-labs/i18n-formatters/date';
import { useNumberFormatter } from '@hua-labs/i18n-formatters/number';
import { useCurrencyFormatter } from '@hua-labs/i18n-formatters/currency';
```

## License

MIT
