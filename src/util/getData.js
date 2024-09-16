// getData.js
/*
  This file is used to return related data to the front end by importing the json data files.
*/
import HTMLData from '@/data/HTMLData.json'
import CSSData from '@/data/CSSData.json'
import JSData from '@/data/JSData.json'
import TSData from '@/data/TSData.json'
import VueData from '@/data/VueData.json'
import ReactData from '@/data/ReactData.json'
import AngularData from '@/data/AngularData.json'
import GitData from '@/data/GitData.json'
import FreeIconsData from '@/data/FreeIconsData.json'
import FreeImgVdoData from '@/data/FreeImgAndVdoData.json'
import FreeTemplatesData from '@/data/FreeTemplatesData.json'
import PremiumTemplatesData from '@/data/PremiumTemplatesData.json'
import InspirationGalleriesData from '@/data/InspirationGalleriesData.json'
import AnimationsData from '@/data/AnimationsData.json'
import OtherData from '@/data/OtherData.json'

// combine related data with icon path and return
function combineData(data, iconPath) {
  return data.map((item) => {
    return {
      ...item,
      icon: iconPath + item.icon
    }
  })
}

// getData function
export default function getData(language) {
  if (language === 'HTML') {
    // use combineData function to combine data with icon path
    return combineData(HTMLData, '/public/resources/html.png')
    // return HTMLData
  } else if (language === 'CSS') {
    return CSSData
  } else if (language === 'JavaScript') {
    return JSData
  } else if (language === 'TypeScript') {
    return TSData
  } else if (language === 'Vue') {
    return VueData
  } else if (language === 'React') {
    return ReactData
  } else if (language === 'Angular') {
    return AngularData
  } else if (language === 'Git') {
    return GitData
  } else if (language === 'Free Icons') {
    return FreeIconsData
  } else if (language === 'Free Images and Videos') {
    return FreeImgVdoData
  } else if (language === 'Free Templates') {
    return FreeTemplatesData
  } else if (language === 'Premium Templates') {
    return PremiumTemplatesData
  } else if (language === 'Inspiration Galleries') {
    return InspirationGalleriesData
  } else if (language === 'Animations') {
    return AnimationsData
  } else if (language === 'Others') {
    return OtherData
  } else {
    return null
  }
}
