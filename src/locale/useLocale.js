import { reactive, ref } from "vue";
import { getDictionary, interpolate } from "@/locale/dict";

const readStoredLang = () => {
  if (typeof localStorage === "undefined") return "en";
  return localStorage.getItem("lang") || "en";
};

const lang = ref(readStoredLang());
const dict = reactive({ ...getDictionary(lang.value) });

if (typeof localStorage !== "undefined" && !localStorage.getItem("lang")) {
  localStorage.setItem("lang", lang.value);
}

export function setLang(code) {
  const next = code || "en";
  lang.value = next;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lang", next);
  }
  Object.assign(dict, getDictionary(next));
}

export function useLocale() {
  const t = (key, vars) => {
    lang.value;
    const value = dict[key] ?? getDictionary("en")[key] ?? key;
    return interpolate(value, vars);
  };
  return { lang, dict, t, setLang };
}
