/** Cores da identidade usadas como faixa de categoria nos cards de indicação, em sequência fixa. */
const BAND_CLASSES = [
  "bg-roma-400",
  "bg-abacate",
  "bg-bombom",
  "bg-cacau",
  "bg-oliveira",
  "bg-suspiro",
];

/** Mesma cor para a mesma categoria em toda a página, baseada na posição dela na lista ordenada. */
export function getCategoryBandClass(categoryIds: string[], categoryId: string) {
  const index = categoryIds.indexOf(categoryId);
  return BAND_CLASSES[(index < 0 ? 0 : index) % BAND_CLASSES.length];
}
