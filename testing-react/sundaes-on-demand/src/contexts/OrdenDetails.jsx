import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }
  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });
  useEffect(() => {
    const scoopSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopSubtotal + toppingSubtotal;
    setTotals({
      scoops: formatCurrency(scoopSubtotal),
      toppings: formatCurrency(toppingSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItems(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts };

      // update options count fvot his item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionsCounts);
    }
    // getter: object containing options counts for scoops and toppings, subttotal
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItems];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
