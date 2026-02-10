const daysEnum = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const translatedDays: Record<typeof daysEnum[number], string> = {
  monday: "Segunda-Feira",
  tuesday: "Terça-Feira",
  wednesday: "Quarta-Feira",
  thursday: "Quinta-Feira",
  friday: "Sexta-Feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

export { daysEnum, translatedDays };