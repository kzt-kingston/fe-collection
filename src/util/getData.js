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

export const REGISTRY = [
  { name: "HTML", websites: HTMLData, videos: HTMLVideoData },
  { name: "CSS", websites: CSSData, videos: CSSVideoData },
  { name: "SASS", websites: SASSData, videos: SASSVideoData },
  { name: "JavaScript", websites: JSData, videos: JSVideoData },
  { name: "TypeScript", websites: TSData, videos: TSVideoData },
  { name: "Vue", websites: VueData, videos: VueVideoData },
  { name: "React", websites: ReactData, videos: ReactVideoData },
  { name: "React Native", websites: ReactNativeData, videos: ReactNativeVideoData },
  { name: "Angular", websites: AngularData, videos: AngularVideoData },
  { name: "Flutter", websites: FlutterData, videos: FlutterVideoData },
  { name: "Git", websites: GitData, videos: GitVideoData },
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

  return DATA_MAPPINGS[type]?.[language] ?? null;
}
