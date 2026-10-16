// Service list for the legacy appointment-request API. Prices match the public GlossGenius menu (checked October 16, 2026).
// The website's full menu lives in artifacts/mafii; GlossGenius is the source of truth for bookings.
export const services = [
  { id: "brows", name: "Brows", category: "Face", description: "Brow consultation, shaping with waxing, tweezing and trimming.", price: 30, duration: 25 },
  { id: "cheeks", name: "Cheeks", category: "Face", description: "Cheeks; sideburns not included.", price: 25, duration: 20 },
  { id: "chin", name: "Chin", category: "Face", description: "Chin and lower lip.", price: 25, duration: 20 },
  { id: "ears", name: "Ears", category: "Face", description: "Inside and outside of the ears.", price: 25, duration: 20 },
  { id: "underarms", name: "Underarms", category: "Body", description: "Underarms; upper arms excluded.", price: 25, duration: 10 },
  { id: "full-arms", name: "Full arms", category: "Body", description: "Arms, hands and fingers; shoulders excluded.", price: 60, duration: 30 },
  { id: "full-legs", name: "Full legs", category: "Body", description: "Upper and lower legs, knees, feet and toes.", price: 90, duration: 30 },
  { id: "bikini-line", name: "Bikini line", category: "Intimate", description: "Outside the bikini line; glutes and inner thighs excluded.", price: 55, duration: 20 },
  { id: "brazilian", name: "Brazilian", category: "Intimate", description: "Bikini line, labia and rear strip. Optional remaining shape.", price: 80, duration: 20 },
];
