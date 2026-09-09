export const PROPERTY_TYPES = [
  { value: "terrain", label: "Terrain" },
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "boutique", label: "Boutique / Local commercial" },
  { value: "villa", label: "Villa" },
  { value: "immeuble", label: "Immeuble" },
];

export const TRANSACTION_TYPES = [
  { value: "vente", label: "À vendre" },
  { value: "location", label: "À louer" },
];

export const PROPERTY_STATUSES = [
  { value: "disponible", label: "Disponible" },
  { value: "reserve", label: "Réservé" },
  { value: "vendu", label: "Vendu / Loué" },
];

export const GUINEA_CITIES = [
  "Conakry",
  "Kindia",
  "Labé",
  "Kankan",
  "Nzérékoré",
  "Boké",
  "Mamou",
  "Faranah",
  "Siguiri",
  "Coyah",
  "Dubréka",
];

export const CONTACT_STATUSES = [
  { value: "nouveau", label: "Nouveau" },
  { value: "traite", label: "Traité" },
  { value: "archive", label: "Archivé" },
];

export function propertyTypeLabel(value) {
  return PROPERTY_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function transactionTypeLabel(value) {
  return TRANSACTION_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function statusLabel(value) {
  return PROPERTY_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export function formatPrice(price, currency = "GNF") {
  if (price == null) return "Prix sur demande";
  const formatted = new Intl.NumberFormat("fr-FR").format(price);
  return `${formatted} ${currency}`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const WHATSAPP_NUMBER = "224600000000";

export function whatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
