// getData.js
// Single registry of every catalog topic. Adding a new language or category
// = one new entry here. Everything below is derived.

import HTMLData from "@/data/websites/HTMLData.json";
import HTMLVideoData from "@/data/videos/HTMLVideoData.json";
import CSSData from "@/data/websites/CSSData.json";
import CSSVideoData from "@/data/videos/CSSVideoData.json";
import SASSData from "@/data/websites/SASSData.json";
import SASSVideoData from "@/data/videos/SASSVideoData.json";
import JSData from "@/data/websites/JSData.json";
import JSVideoData from "@/data/videos/JSVideoData.json";
import TSData from "@/data/websites/TSData.json";
import TSVideoData from "@/data/videos/TSVideoData.json";
import VueData from "@/data/websites/VueData.json";
import VueVideoData from "@/data/videos/VueVideoData.json";
import ReactData from "@/data/websites/ReactData.json";
import ReactVideoData from "@/data/videos/ReactVideoData.json";
import ReactNativeData from "@/data/websites/ReactNativeData.json";
import ReactNativeVideoData from "@/data/videos/ReactNativeVideoData.json";
import AngularData from "@/data/websites/AngularData.json";
import AngularVideoData from "@/data/videos/AngularVideoData.json";
import FlutterData from "@/data/websites/FlutterData.json";
import FlutterVideoData from "@/data/videos/FlutterVideoData.json";
import GitData from "@/data/websites/GitData.json";
import GitVideoData from "@/data/videos/GitVideoData.json";
import FreeIconsData from "@/data/websites/FreeIconsData.json";
import FreeImgVdoData from "@/data/websites/FreeImgAndVdoData.json";
import FreeTemplatesData from "@/data/websites/FreeTemplatesData.json";
import PremiumTemplatesData from "@/data/websites/PremiumTemplatesData.json";
import InspirationGalleriesData from "@/data/websites/InspirationGalleriesData.json";
import AnimationsData from "@/data/websites/AnimationsData.json";
import OtherData from "@/data/websites/OtherData.json";
import AIToolsData from "@/data/websites/AIToolsData.json";

const REGISTRY = [
  { name: "HTML", icon: "/public/resources/html.png", websites: HTMLData, videos: HTMLVideoData },
  { name: "CSS", icon: "/public/resources/css.png", websites: CSSData, videos: CSSVideoData },
  { name: "SASS", icon: "/public/resources/sass.png", websites: SASSData, videos: SASSVideoData },
  { name: "JavaScript", icon: "/public/resources/js.png", websites: JSData, videos: JSVideoData },
  { name: "TypeScript", icon: "/public/resources/ts.png", websites: TSData, videos: TSVideoData },
  { name: "Vue", icon: "/public/resources/vue.png", websites: VueData, videos: VueVideoData },
  { name: "React", icon: "/public/resources/react.png", websites: ReactData, videos: ReactVideoData },
  { name: "React Native", icon: "/public/resources/react-native.png", websites: ReactNativeData, videos: ReactNativeVideoData },
  { name: "Angular", icon: "/public/resources/angular.png", websites: AngularData, videos: AngularVideoData },
  { name: "Flutter", icon: "/public/resources/flutter.png", websites: FlutterData, videos: FlutterVideoData },
  { name: "Git", icon: "/public/resources/git.png", websites: GitData, videos: GitVideoData },
  { name: "Free Icons", websites: FreeIconsData },
  { name: "Free Images and Videos", websites: FreeImgVdoData },
  { name: "Free UI Libraries", websites: FreeTemplatesData },
  { name: "Premium Templates", websites: PremiumTemplatesData },
  { name: "Inspiration Galleries", websites: InspirationGalleriesData },
  { name: "Animations", websites: AnimationsData },
  { name: "Others", websites: OtherData },
  { name: "AI Tools", websites: AIToolsData },
];

const byName = (key) =>
  Object.fromEntries(
    REGISTRY.filter((entry) => entry[key]).map((entry) => [entry.name, entry[key]])
  );

const DATA_MAPPINGS = {
  websites: byName("websites"),
  videos: byName("videos"),
};

const ICON_PATHS = byName("icon");

const combineData = (data, iconPath) =>
  data.map((item) => ({ ...item, icon: iconPath + item.icon }));

export function searchForData(searchText) {
  const needle = searchText.toLowerCase();

  const allWebsites = REGISTRY.flatMap((entry) => entry.websites || []);
  const allVideos = REGISTRY.flatMap((entry) => entry.videos || []);

  return {
    websites: allWebsites.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle)
    ),
    videos: allVideos.filter((item) =>
      item.title.toLowerCase().includes(needle)
    ),
  };
}

export default function getData(language, type) {
  if (type === "%") {
    return {
      websites: DATA_MAPPINGS.websites[language],
      videos: DATA_MAPPINGS.videos[language],
    };
  }

  const data = DATA_MAPPINGS[type]?.[language];
  if (!data) return null;

  if (type === "websites" && ICON_PATHS[language]) {
    return combineData(data, ICON_PATHS[language]);
  }

  return data;
}
