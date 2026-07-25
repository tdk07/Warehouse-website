export function buildWhatsAppMessage(cartItems, storeName) {
  const MAX_LISTED_ITEMS = 15; // keep the encoded URL within safe practical limits

  const lines = cartItems.slice(0, MAX_LISTED_ITEMS).map(
    (item) => `• ${item.name} x${item.quantity} — ${item.currency} ${(item.price * item.quantity).toFixed(2)}`
  );

  if (cartItems.length > MAX_LISTED_ITEMS) {
    lines.push(`…and ${cartItems.length - MAX_LISTED_ITEMS} more item(s)`);
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    `Hi ${storeName}, I'd like to order:`,
    '',
    ...lines,
    '',
    `Total: ${cartItems[0]?.currency ?? 'USD'} ${total.toFixed(2)}`,
  ].join('\n');
}

export function buildWhatsAppUrl(phoneE164, message) {
  // phoneE164 must be digits only, no '+', spaces, or leading zeros, e.g. "10000000000"
  const digitsOnly = phoneE164.replace(/[^\d]/g, '');
  return `https://api.whatsapp.com/send?phone=${digitsOnly}&text=${encodeURIComponent(message)}`;
}
