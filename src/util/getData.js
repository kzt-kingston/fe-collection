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
function combineData(data, iconPath) {
  return data.map((item) => {
    return {
      ...item,
      icon: iconPath + item.icon,
    };
  });
}
// getData function
export default function getData(language, type) {
  if (type === "websites") {
    if (language === "HTML") {
      // use combineData function to combine data with icon path
      return combineData(HTMLData, "/public/resources/html.png");
      // return HTMLData
    } else if (language === "CSS") {
      return CSSData;
    } else if (language === "JavaScript") {
      return JSData;
    } else if (language === "TypeScript") {
      return TSData;
    } else if (language === "Vue") {
      return VueData;
    } else if (language === "React") {
      return ReactData;
    } else if (language === "Angular") {
      return AngularData;
    } else if (language === "Git") {
      return GitData;
    } else if (language === "Free Icons") {
      return FreeIconsData;
    } else if (language === "Free Images and Videos") {
      return FreeImgVdoData;
    } else if (language === "Free Templates") {
      return FreeTemplatesData;
    } else if (language === "Premium Templates") {
      return PremiumTemplatesData;
    } else if (language === "Inspiration Galleries") {
      return InspirationGalleriesData;
    } else if (language === "Animations") {
      return AnimationsData;
    } else if (language === "Others") {
      return OtherData;
    } else {
      return null;
    }
  } else if (type === "videos") {
    console.log("Videos");
    console.log("language is: ", language);
    if (language === "HTML") {
      console.log("Videos Data: ", HTMLVideoData);
      return HTMLVideoData;
    } else if (language === "CSS") {
      return CSSVideoData;
    } else if (language === "JavaScript") {
      return JSVideoData;
    } else if (language === "TypeScript") {
      return TSVideoData;
    } else if (language === "React") {
      return ReactVideoData;
    } else if (language === "Vue") {
      return VueVideoData;
    } else if (language === "Angular") {
      return AngularVideoData;
    } else if (language === "Git") {
      return GitVideoData;
    } else return null;
  } else if (type === "playground") {
    if (language === "HTML") {
      return HTMLPlaygroundData;
    } else if (language === "CSS") {
      return CSSPlaygroundData;
    } else if (language === "JavaScript") {
      return JSPlaygroundData;
    } else if (language === "TypeScript") {
      return TSPlaygroundData;
    } else if (language === "Vue") {
      return VuePlaygroundData;
    } else if (language === "React") {
      return ReactPlaygroundData;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
