import { DeliveryInfo } from "@/types";

export const trucateString = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
};

export function getDeliveryDateInfo(deliveryDay?: number): DeliveryInfo {
  let delivery = new Date();

  // If no admin date → add 10 days
  if (deliveryDay) {
    delivery.setDate(delivery.getDate() + deliveryDay);
  } else {
    delivery.setDate(delivery.getDate() + 10);
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const dayOfWeek = dayNames[delivery.getDay()];

  const dateStr = delivery.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return { date: dateStr, dayOfWeek };
}

// Format selling price to always show ".99"
export const formatPrice = (price: number) => {

  const str = price.toString().trim();

  // 💡 Case 1: Price contains decimals
  if (str.includes(".")) {
    const [integer, decimal] = str.split(".");

    // Protect empty decimal or integer
    return {
      integer: integer ,
      decimal: (decimal)
    };
  }

  // 💡 Case 2: Integer price → force `.99`
  return {
    integer: str,
    decimal: "00"
  };
};
