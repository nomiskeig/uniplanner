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
                supplementaryModule: "supplementary module",
                pickArea: "Pick area",
                moduleOverview: "Module overview",
                category: "Category",
                allCategegories: "All categories",
                anyTurnus: "Any turnus",
                responsible: "Responsible",
                partOf: "Part of",
                examKind: "Kind of exam",
                qualificationGoals: "Qualification goals",
                content: "Content",
                successControl: "Success control",
                requirements: "Requirements",
                recommendations: "Recommendations",
                module: "Module",
                moduleParts: "Module parts",
                modulePart: "Module part",
                noRecommendations: "No recommendations",
                noRequirements: "No requirements",
                noInfo: "No information",
                courses: "Courses",
                type: "Type",
                hello: "Hello"


            }
        },
        de: {
            translation: {
                inDepthModule: "Vertiefungsfach",
                pickedIn: "Gewählt in",
                supplementaryModule: "Ergänzungsfach",
                pickArea: "Wahlbereich",
                moduleOverview: "Modulübersicht",
                category: "Kategorie",
                allCategegories: "Alle Kategorien",
                anyTurnus: "Jeder Turnus",
                responsible: "Verantwortlich",
                partOf: "Bestandteil von",
                examKind: "Art der Prüfungsleistung",
                qualificationGoals: "Qualifizierungsziele",
                content: "Inhalt",
                successControl: "Erfolgskontrollen",
                requirements: "Voraussetzungen",
                recommendations: "Empfehlungen",
                module: "Modul",
                moduleParts: "Teilleistungen",
                modulePart: "Teilleistung",
                noRecommendations: "Keine Empfehlungen",
                noRequirements: "Keine Voraussetzungen",
                noInfo: "Keine Information",
                courses: "Lehrveranstaltungen",
                type: "Typ",
                hello: "Hallo"

            }
        }

    }
})



export default i18n;
