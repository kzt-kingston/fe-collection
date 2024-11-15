const multiLang = {
    en: {
        a_place_where: "A place where you can explore all the resources, cheat sheets, tips and tricks about frontend in one place!",
        start_expore: "Start Explore",
        support_me_by: "Support Me!",
        visit_website: "Visit Website",
        close: "Close",
        music_tracks_used: "Music tracks used in this project are from Pixabay",
        no_video: "No video found",
        choose_resource: "Choose a resource to explore",
        support_our_cause: "Support Our Cause",
        your_donation_helps: "Your donation helps us make a difference. Choose your preferred payment methods below.",
        scan_with_your: "Scan with your mobile banking app",
    },
    my: {
        a_place_where: "Frontend နဲ.ပတ်သတ်တဲ့ လေ့လာစရာစာတွေ၊ အကူညီစာမျက်နှာများ၊ အကြံပြုချက်များနှင့် လှည့်ကွက်များအားလုံးကို တစ်နေရာထဲမှာ စု၀ေးပေးထားတဲ့ နေရာလေးတစ်ခုပါ!",
        start_expore: "စတင်၍ ရှာဖွေပါ",
        support_me_by: "Support လုပ်ရန်!",
        visit_website: "ဝဘ်ဆိုဒ်သို့ သွားရောက်ကြည့်ရှုပါ",
        close: "ပိတ်ပါ",
        music_tracks_used: "သီချင်းများကို Pixabay မှကူးယူထားပါသည်",
        no_video: "ဗီဒီယိုမရှိပါ",
        choose_resource: "လေ့လာရန်ရွေးချယ်ပါ",
        support_our_cause: "Support လုပ်လိုပါက",
        your_donation_helps: "သင့်ရဲ.အလှူငွေက ကျွန်တော်တို.ခုလို project တွေဆက်ရေးနိုင်ဖို.အတွက်အကျိုးပြုစေပါတယ်, လှူလိုပါက ငွေလွှဲမှုနည်းများကို အောက်မှာ ရွေးချယ်ပါ",
        scan_with_your: "သင့်ရဲ. ဖုန်း application ဖြင့် scan ဖတ်ပီးငွေလွှဲပါ",
    }    
}

// return specific language dictionary based on the language code
export const getDictionary = (languageCode) => {
    return {
      ...multiLang[languageCode],
    };
};