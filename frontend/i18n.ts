import i18n from "i18next"
import {initReactI18next} from "react-i18next"

i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "en",
    interpolation:  {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                inDepthModule: "in depth module",
                pickedIn: "Picked in",
                supplementaryModule: "supplementary module"

            }
        },
        de: {
            translation: {
                inDepthModule: "Vertiefungsfach",
                pickedIn: "Gewählt in",
                supplementaryModule: "Wahlbereich"
            }
        }

    }
})



export default i18n;
