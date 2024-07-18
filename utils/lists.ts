export const statusList = ["נגנז", "ממתין להשלמת חוסרים", "הופק"]

export const companyList = [
  "כלל",
  "מוני",
  "סלייס",
  "טריא",
  "בלנדר",
  "מדיהו",
  "מדיקר",
  "הכשרה",
  "אינפיניטי",
  "הראל",
  "איילון",
  "אלטשולר שחם",
  "ילין לפידות",
  "אנליסט",
  "מור",
  "מיטב",
]

export const prdctTypeList = ["פרמיה חודשית", "פרמיה חד פעמית", "הפקדה חודשית", "הפקדה חדשה"]

export const branchList = [
  "פנסיוני",
  "פיננסי",
  "סיכונים",
  "נסיעות לחול",
  "אלמנטרי",
  "כתב שירות חיצוני",
  'אכ"ע',
  "קצבה מיידית",
]

// פניוסי
// "ניוד",
// "הפקדה חודשית"

// פיננסי
// "ניוד",
// "הפקדה חודשית",
// "הפקדה חד פעמית"

// סיכונים
// "פרמיה חודשית",

// נסיעות לחול
// אלמנטרי
// "פרמיה חד פעמית",

// אכע
// כתב שירות חיצוני
// "פרמיה חודשית",

// קצבה מיידית
// "ניוד"

type PrdctType = {
  prdctList: string[]
  prdctTypeList: string[]
}

export function getPrdctByBranch(branch: string): PrdctType {
  switch (branch) {
    case "פנסיוני":
      return { prdctList: pensionyList, prdctTypeList: ["ניוד", "הפקדה חודשית"] }

    case "פיננסי":
      return { prdctList: financeList, prdctTypeList: ["ניוד", "הפקדה חודשית", "הפקדה חד פעמית"] }

    case "סיכונים":
      return { prdctList: riskList, prdctTypeList: ["פרמיה חודשית"] }

    case "נסיעות לחול":
      return { prdctList: travelList, prdctTypeList: ["פרמיה חד פעמית"] }

    case "אלמנטרי":
      return { prdctList: elementryList, prdctTypeList: ["פרמיה חד פעמית"] }

    case "כתב שירות חיצוני":
      return { prdctList: ["כתב שירות חיצוני"], prdctTypeList: ["פרמיה חודשית"] }

    case 'אכ"ע':
      return { prdctList: workList, prdctTypeList: ["פרמיה חודשית"] }

    case "קצבה מיידית":
      return { prdctList: ["קצבה מיידית"], prdctTypeList: ["ניוד"] }

    default:
      return { prdctList: pensionyList, prdctTypeList: ["ניוד", "הפקדה חודשית"] }
  }
}

export const pensionyList = ["קרן פנסיה מקיפה", "קרן פנסיה משלימה", "ביטוח מנהלים", "קופת גמל"]

const financeList = [
  "קופת גמל",
  "קרן השתלמות",
  "קופת גמל להשקעה",
  "חיסכון פיננסי",
  "ניהול תיקים",
  "איחוד קופות",
  "השקעה אלטרנטיבית",
]

export const riskList = [
  "ביטוח חיים",
  "ביטוח חיים משכנתה",
  "ביטוח בריאות",
  "ביטוח מחלות קשות",
  "נכות מתאונה",
  "תאונות אישיות",
]

export const travelList = ["ביטוח נסיעות לחול"]

export const elementryList = [
  "רכב חובה",
  "רכב מקיף",
  "רכב צד ג'",
  "דירה מבנה",
  "דירה רכוש",
  "דירה מבנה ורכוש",
  "עסק",
  "אחריות מקצועית",
  'צמ"ה',
]

export const workList = ['אכ"ע פרט', 'אכ"ע מנהלים', "מטריה ביטוחית"]
