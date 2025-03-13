// write cn function that combines the tailwindcss classes
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
