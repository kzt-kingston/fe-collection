const multiLang = {
    en: {
        a_place_where: "A place where you can explore all the resources, cheat sheets, tips and tricks about frontend in one place!",
        start_expore: "Start Explore",
        support_me_by: "Support Me!",
        visit_website: "Visit Website",
        close: "Close",
    },
    my: {
        a_place_where: "Frontend နဲ.ပတ်သတ်တဲ့ လေ့လာစရာစာတွေ၊ အကူညီစာမျက်နှာများ၊ အကြံပြုချက်များနှင့် လှည့်ကွက်များအားလုံးကို တစ်နေရာထဲမှာ စု၀ေးပေးထားတဲ့ နေရာလေးတစ်ခုပါ!",
        start_expore: "စတင်၍ ရှာဖွေပါ",
        support_me_by: "Support လုပ်ရန်!",
        visit_website: "ဝဘ်ဆိုဒ်သို့ သွားရောက်ကြည့်ရှုပါ",
        close: "ပိတ်ပါ",
    }    
}

// return specific language dictionary based on the language code
export const getDictionary = (languageCode) => {
    return {
      ...multiLang[languageCode],
    };
};