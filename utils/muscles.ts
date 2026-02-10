export const musclesEnum = [
  "back",
  "biceps",
  "calf",
  "chest",
  "forearm",
  "glute",
  "hamstrings",
  "quadriceps",
  "sholder",
  "trapezius",
  "triceps",
] as const;

export const muscleTranslations: Record<typeof musclesEnum[number], string> = {
  forearm: "Antebraço",
  biceps: "Bíceps",
  back: "Costas",
  glute: "Glúteo",
  sholder: "Ombro",
  calf: "Panturrilha",
  chest: "Peito",
  hamstrings: "Posterior",
  quadriceps: "Quadríceps",
  trapezius: "Trapézio",
  triceps: "Tríceps",
};