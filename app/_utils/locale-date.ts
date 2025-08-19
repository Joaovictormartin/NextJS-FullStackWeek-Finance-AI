type LocaleDate = {
  day?: "2-digit" | "numeric";
  year?: "2-digit" | "numeric";
  month?: "2-digit" | "long" | "narrow" | "numeric" | "short";
};

export const formatDate = (
  value: Date,
  { day = "2-digit", month = "long", year = "numeric" }: LocaleDate,
) => {
  return new Date(value).toLocaleDateString("pt-BR", {
    day,
    month,
    year,
  });
};
