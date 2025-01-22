// getData.js
/*
  This file is used to return related data to the front end by importing the json data files.
*/
import HTMLData from "@/data/websites/HTMLData.json";
import HTMLVideoData from "@/data/videos/HTMLVideoData.json";
import HTMLPlaygroundData from "@/data/playground/HTMLPlaygroundData.json";
import CSSData from "@/data/websites/CSSData.json";
import CSSVideoData from "@/data/videos/CSSVideoData.json";
import CSSPlaygroundData from "@/data/playground/CSSPlaygroundData.json";
import JSData from "@/data/websites/JSData.json";
import JSVideoData from "@/data/videos/JSVideoData.json";
import JSPlaygroundData from "@/data/playground/JSPlaygroundData.json";
import TSData from "@/data/websites/TSData.json";
import TSVideoData from "@/data/videos/TSVideoData.json";
import TSPlaygroundData from "@/data/playground/TSPlaygroundData.json";
import VueData from "@/data/websites/VueData.json";
import VueVideoData from "@/data/videos/VueVideoData.json";
import VuePlaygroundData from "@/data/playground/VuePlaygroundData.json";
import ReactData from "@/data/websites/ReactData.json";
import ReactVideoData from "@/data/videos/ReactVideoData.json";
import ReactPlaygroundData from "@/data/playground/ReactPlaygroundData.json";
import AngularData from "@/data/websites/AngularData.json";
import AngularVideoData from "@/data/videos/AngularVideoData.json";
import GitData from "@/data/websites/GitData.json";
import GitVideoData from "@/data/videos/GitVideoData.json";
import FreeIconsData from "@/data/websites/FreeIconsData.json";
import FreeImgVdoData from "@/data/websites/FreeImgAndVdoData.json";
import FreeTemplatesData from "@/data/websites/FreeTemplatesData.json";
import PremiumTemplatesData from "@/data/websites/PremiumTemplatesData.json";
import InspirationGalleriesData from "@/data/websites/InspirationGalleriesData.json";
import AnimationsData from "@/data/websites/AnimationsData.json";
import OtherData from "@/data/websites/OtherData.json";

// combine related data with icon path and return
const ICON_PATHS = {
  HTML: "/public/resources/html.png",
  CSS: "/public/resources/css.png",
  JavaScript: "/public/resources/js.png",
  TypeScript: "/public/resources/ts.png",
  Vue: "/public/resources/vue.png",
  React: "/public/resources/react.png",
  Angular: "/public/resources/angular.png",
  Git: "/public/resources/git.png"
};

const DATA_MAPPINGS = {
  websites: {
    HTML: HTMLData,
    CSS: CSSData,
    JavaScript: JSData,
    TypeScript: TSData,
    Vue: VueData,
    React: ReactData,
    Angular: AngularData,
    Git: GitData,
    "Free Icons": FreeIconsData,
    "Free Images and Videos": FreeImgVdoData,
    "Free UI Libraries": FreeTemplatesData,
    "Premium Templates": PremiumTemplatesData,
    "Inspiration Galleries": InspirationGalleriesData,
    "Animations": AnimationsData,
    "Others": OtherData
  },
  videos: {
    HTML: HTMLVideoData,
    CSS: CSSVideoData,
    JavaScript: JSVideoData,
    TypeScript: TSVideoData,
    Vue: VueVideoData,
    React: ReactVideoData,
    Angular: AngularVideoData,
    Git: GitVideoData
  },
  playground: {
    HTML: HTMLPlaygroundData,
    CSS: CSSPlaygroundData,
    JavaScript: JSPlaygroundData,
    TypeScript: TSPlaygroundData,
    Vue: VuePlaygroundData,
    React: ReactPlaygroundData
  }
};

function combineData(data, iconPath) {
  return data.map((item) => ({
    ...item,
    icon: iconPath + item.icon,
  }));
}

export default function getData(language, type) {
  const data = DATA_MAPPINGS[type]?.[language];
  if (!data) return null;
  
  // Only combine data with icons for programming languages in websites section
  if (type === "websites" && ICON_PATHS[language]) {
    return combineData(data, ICON_PATHS[language]);
  }
  
  return data;
}
