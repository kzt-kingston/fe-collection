const multiLang = {
  en: {
    a_place_where:
      "A place where you can learn and explore all the resources, cheat sheets, videos, tips and tricks about frontend in one place!",
    start_expore: "Start Learn & Explore",
    visit_website: "Visit Website",
    close: "Close",
    music_tracks_used: "Music tracks used in this project are from Pixabay",
    no_video: "No video found",
    choose_resource: "Choose a resource to explore",
    developed_by: "Developed by",
    search_result: "Search Result",
    search_resources: "Search Resources",
  },
  my: {
    a_place_where:
      "Frontend နဲ.ပတ်သတ်တဲ့စာတွေ၊ video တွေ၊ အကူညီစာမျက်နှာများ၊ အကြံပြုချက်များ စတာတွေကို တစ်နေရာထဲမှာအားလုံးကို အလွယ်တကူနဲ့လေ.လာလို.ရအောင်လို. စု၀ေးပေးထားတဲ့ learning platform လေးတစ်ခုပါ!",
    start_expore: "စတင်၍ လေ့လာပါ",
    visit_website: "ဝဘ်ဆိုဒ်သို့ သွားရောက်ကြည့်ရှုပါ",
    close: "ပိတ်ပါ",
    music_tracks_used: "သီချင်းများကို Pixabay မှကူးယူထားပါသည်",
    no_video: "ဗီဒီယိုမရှိပါ",
    choose_resource: "လေ့လာရန်ရွေးချယ်ပါ",
    developed_by: "Developed by",
    search_result: "ရှာဖွေမှုရလဒ်",
    search_resources: "resources များရှာဖွေပါ",
  },
};

// return specific language dictionary based on the language code
export const getDictionary = (languageCode) => {
  return {
    ...multiLang[languageCode],
  };
};
