// All site content lives here so it's easy to edit.
// Images: drop files into /public/images using the names below.

export const BRAND = {
  name: "KENSHIN",
  tagline: "Japanese Izakaya Restaurant",
  phone: "+63 912 345 6789",
  email: "info@kenshin.com.ph",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Branches", href: "#branches" },
  { label: "About Us", href: "#about" },
  { label: "Promotions", href: "#promo" },
  { label: "Contact", href: "#contact" },
];

export const MENU_ITEMS = [
  { title: "Sushi & Sashimi", sub: "Fresh. Premium. Authentic.", img: "/14075.jpg" },
  { title: "Yakitori", sub: "Grilled to Perfection", img: "/grilled-meat-skewers-with-chili-herbs-dark-board.jpg" },
  { title: "Ramen", sub: "Rich Flavor. Comfort in a Bowl", img: "/ramen.png" },
  { title: "Japanese Small Plates", sub: "Perfect for Sharing", img: "/smallPlate.png" },
  { title: "Drinks", sub: "Sake, Shochu, Cocktails & More", img: "/2150170199.jpg" },
];

export const BRANCHES = [
  {
    name: "Makati",
    address: "123 Ayala Ave, Makati City",
    img: "/branch/branch2.png",
    map: "https://maps.google.com/?q=Ayala+Avenue+Makati",
  },
  {
    name: "Quezon City",
    address: "SM North EDSA, QC",
    img: "/branch/691232153_1366643618818570_1193415304316120631_n.jpg",
    map: "https://maps.google.com/?q=SM+North+EDSA",
  },
  {
    name: "Alabang",
    address: "Festival Mall, Alabang",
    img: "/branch/makati.jpg",
    map: "https://maps.google.com/?q=Festival+Mall+Alabang",
  },
];

export const FOOTER_LOCATIONS = [
  { name: "Makati", detail: "123 Ayala Ave, Makati City" },
  { name: "Quezon City", detail: "SM North EDSA, QC" },
  { name: "Alabang", detail: "Festival Mall, Alabang" },
];
