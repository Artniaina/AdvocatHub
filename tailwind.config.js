/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   margin: false,
  //   padding: false, // Désactive les utilitaires de padding
  //   preflight: false, // Désactive les styles globaux
  // },
  prefix: "tw-", // Ajoute un préfixe personnalisé pour les classes Tailwind
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Chemins des fichiers analysés par Tailwind
  theme: {
    extend: {}, // Extension des thèmes personnalisés
  },
  plugins: [], // Liste des plugins supplémentaires
};
