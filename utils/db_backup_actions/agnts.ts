'use server'

import { db } from '@/db/db'

export async function insertAgnts() {
  for (let i = 0; i < agnts.length; i++) {
    const agnt = agnts[i]
    const res = await db.agnt.create({
      data: {
        firstName: agnt.firstName,
        lastName: agnt.lastName,
        email: agnt.email,
        phone: agnt.phone,
      },
    })
    console.log(res)
  }
}

const agnts = [
  {
    firstName: 'ליאור',
    lastName: 'מורלי',
    phone: '054-8037089',
    email: 'lior@pro-bit.co.il',
  },
  {
    firstName: 'יהודה',
    lastName: 'דבח',
    phone: '058-6497777',
    email: 'yehuda@pro-bit.co.il',
  },
  {
    firstName: 'אריק',
    lastName: 'עדיקה',
    phone: '054-7077563',
    email: 'arik@pro-bit.co.il',
  },
  {
    firstName: 'אוראל',
    lastName: 'כהן',
    phone: '054-7914819',
    email: 'orel@b-fin.co.il',
  },
  {
    firstName: 'שרון',
    lastName: 'פייביש',
    phone: '054-9506865',
    email: 'sharon@b-fin.co.il',
  },
  {
    firstName: "ג'וש",
    lastName: 'שפירו',
    phone: '054-5656695',
    email: 'josh@b-fin.co.il',
  },
  {
    firstName: 'שרית',
    lastName: "פניז'ל",
    phone: '050-7450203',
    email: 'sarit@ziv-ins.co.il',
  },
  {
    firstName: 'אושרי',
    lastName: 'קמחי',
    phone: '050-7461212',
    email: 'oshri43211@gmail.com',
  },
  {
    firstName: 'אביתר',
    lastName: 'מור',
    phone: '050-7950018',
    email: 'evyatarm@pro-bit.co.il',
  },
  {
    firstName: 'אביעד',
    lastName: 'איתח',
    phone: '054-2026648',
    email: 'aviad@eau.co.il',
  },
  {
    firstName: 'אולי',
    lastName: 'קונסטנטיני',
    phone: '052-8980921',
    email: 'uli@eau.co.il',
  },
  {
    firstName: 'אמיר',
    lastName: 'נפתלי',
    phone: '054-4995555',
    email: 'amir@afikb.co.il',
  },
  {
    firstName: 'כפיר',
    lastName: 'בנימיני',
    phone: '054-4475666',
    email: 'kfir@kfirb.co.il',
  },
  {
    firstName: 'אילן',
    lastName: 'שלם',
    phone: '054-6665732',
    email: 'ilan.ozarot@gmail.com',
  },
  {
    firstName: 'ציון',
    lastName: 'פדלון',
    phone: '054-5258125',
    email: 'tzion@fit-z.co.il',
  },
  {
    firstName: 'אילן',
    lastName: 'ברבי',
    phone: '050-2102101',
    email: 'ilanberrebi10@walla.co.il',
  },
  {
    firstName: 'מושיקו',
    lastName: 'מויאל',
    phone: '050-6515495',
    email: 'moshikomo@gmail.com',
  },
  {
    firstName: 'רון',
    lastName: 'לוי',
    phone: '052-5012100',
    email: 'gesher.ron@gmail.com',
  },
  {
    firstName: 'גיל',
    lastName: 'לוי',
    phone: '050-2424333',
    email: 'gil@gesherins.com',
  },
  {
    firstName: 'ברק',
    lastName: 'שץ',
    phone: '052-8029570',
    email: 'barak@barak-bit.co.il',
  },
  {
    firstName: 'אבי',
    lastName: 'גרין',
    phone: '054-2233118',
    email: 'avigreen10@gmail.com',
  },
  {
    firstName: 'יאיר',
    lastName: 'סלע',
    phone: '054-4216654',
    email: 'yairsela@pro-bit.co.il',
  },
  {
    firstName: 'ליאור',
    lastName: 'מרום',
    phone: '052-5542044',
    email: 'liorm@pro-bit.co.il',
  },
  {
    firstName: 'תמיר',
    lastName: 'שפיגל',
    phone: '054-5533908',
    email: 'tamirs@pro-bit.co.il',
  },
  {
    firstName: 'משה',
    lastName: 'הדס',
    phone: '050-3537022',
    email: 'moshe@pro-bit.co.il',
  },
  {
    firstName: 'רמי',
    lastName: 'פוסטמן',
    phone: '054-3102111',
    email: 'Ramip@pro-bit.co.il',
  },
  {
    firstName: 'ספיר',
    lastName: 'דוייב',
    phone: '052-8908689',
    email: 'sapird@pro-bit.co.il',
  },
  {
    firstName: 'תומר',
    lastName: 'איזון',
    phone: '050-2133366',
    email: 'tomer@izon-ins.com',
  },
  {
    firstName: 'איתי',
    lastName: 'נגר',
    phone: '050-4569267',
    email: 'itai@pro-bit.co.il',
  },
  {
    firstName: 'אלי',
    lastName: 'שושני',
    phone: '052-8375265',
    email: 'elish@eshurance.co.il',
  },
  {
    firstName: 'איילת',
    lastName: 'שוחמי',
    phone: '052-8029409',
    email: 'ayelet@barak-bit.co.il',
  },
  {
    firstName: 'יוסי',
    lastName: 'שלו',
    phone: '053-5309788',
    email: 'yossish@pro-bit.co.il',
  },
  {
    firstName: 'שרית',
    lastName: 'ברלב',
    phone: '054-9752150',
    email: 'Sarit@ambition-ins.co.il',
  },
  {
    firstName: 'קרן',
    lastName: 'בוזגלו',
    phone: '052-4253240',
    email: 'keren@ambition-ins.co.il',
  },
  {
    firstName: 'נירית',
    lastName: 'חוגי',
    phone: '054-7330351',
    email: 'nirit@ambition-ins.co.il',
  },
  {
    firstName: 'אורטל',
    lastName: 'גבאי',
    phone: '052-6146117',
    email: 'ortal@ambition-ins.co.il',
  },
  {
    firstName: 'מיקי',
    lastName: 'שרביט',
    phone: '052-4748080',
    email: 'miki@pro-bit.co.il',
  },
  {
    firstName: 'שלומי',
    lastName: 'פרץ',
    phone: '052-5558681',
    email: 'shlomip@pro-bit.co.il',
  },
  {
    firstName: 'אביבית',
    lastName: 'כרמלי',
    phone: '054-7901858',
    email: 'avivit@q-pro.co.il',
  },
  {
    firstName: 'עדנה',
    lastName: 'כהן',
    phone: '050-7288607',
    email: 'edna@q-pro.co.il',
  },
  {
    firstName: 'גלית',
    lastName: 'יונתי',
    phone: '054-7725655',
    email: 'gyonati@ambition-ins.co.il',
  },
  {
    firstName: 'מרים',
    lastName: 'שנפלד',
    phone: '054-2083008',
    email: 'miriams@pro-bit.co.il',
  },
  {
    firstName: 'רינת',
    lastName: 'אטיאס',
    phone: '050-4450544',
    email: 'atiasrinat@gmail.com',
  },
  {
    firstName: 'תומר',
    lastName: 'אמסלם',
    phone: '054-6135115',
    email: 'tomera@pro-bit.co.il',
  },
  {
    firstName: 'גרשון',
    lastName: 'לוין',
    phone: '050-8780532',
    email: 'Gershon@b-fin.co.il',
  },
  {
    firstName: 'אורון',
    lastName: 'יצחק',
    phone: '052-8957988',
    email: 'oron@barak-bit.co.il',
  },
  {
    firstName: 'זוהר',
    lastName: 'דדון',
    phone: '050-5355814',
    email: 'oron@pro-bit.co.il',
  },
  {
    firstName: 'כרמית',
    lastName: 'לביא',
    phone: '054-7076959',
    email: 'Carmit@lavic-ins.co.il',
  },
  {
    firstName: 'עודד',
    lastName: 'חבשוש',
    phone: '054-3683030',
    email: 'oded@pro-bit.co.il',
  },
  {
    firstName: 'עומר',
    lastName: 'שדות',
    phone: '054-8320321',
    email: 'omer@pro-bit.co.il',
  },
  {
    firstName: 'תמר',
    lastName: 'שבתאי',
    phone: '053-3158320',
    email: 'office1@pro-bit.co.il',
  },
  {
    firstName: 'דניאל',
    lastName: 'רז',
    phone: '052-5214998',
    email: 'office66@afikb.co.il',
  },
  {
    firstName: 'ענת',
    lastName: 'הרוש',
    phone: '054-4630915',
    email: 'tushinka@gmail.com',
  },
  {
    firstName: 'שי',
    lastName: 'חוג׳ה',
    phone: '054-3130496',
    email: 'shay@pro-bit.co.il',
  },
  {
    firstName: 'עוזי',
    lastName: 'ז׳ורנו',
    phone: '054-3036040',
    email: 'uzi@ofektov.co.il',
  },
  {
    firstName: 'מאור',
    lastName: 'עסיס',
    phone: '050-6904460',
    email: 'maor@pro-bit.co.il',
  },
  {
    firstName: 'מאיה',
    lastName: 'אליאס',
    phone: '054-7901843',
    email: 'maya@myexperts.co.il',
  },
  {
    firstName: 'משה',
    lastName: 'סנג׳רו',
    phone: '054-4691839',
    email: 'moshe@myexperts.co.il',
  },
  {
    firstName: 'קינן',
    lastName: 'אטיאס',
    phone: '052-8505333',
    email: 'kenan@aviv-fin.com',
  },
  {
    firstName: 'ארז',
    lastName: 'אופיר',
    phone: '050-4440991',
    email: 'erez@myexperts.co.il',
  },
  {
    firstName: 'אורי',
    lastName: 'רז',
    phone: '054-4331435',
    email: 'ori.r@myexperts.co.il',
  },
  {
    firstName: 'קובי',
    lastName: 'ראובני',
    phone: '054-4864244',
    email: 'kobi@pro-bit.co.il',
  },
  {
    firstName: 'נתן',
    lastName: 'שטיין',
    phone: '054-6321990',
    email: 'Service9@myexperts.co.il',
  },
  {
    firstName: 'לוזי',
    lastName: 'אברהם',
    phone: '052-2912702',
    email: 'yishay@2eitan.co.il',
  },
  {
    firstName: 'ישי',
    lastName: 'אברהם',
    phone: '052-8222189',
    email: 'ins@2eitan.co.il',
  },
  {
    firstName: 'לירון',
    lastName: 'אובדנקו',
    phone: '052-5833121',
    email: 'lirono@pro-bit.co.il',
  },
  {
    firstName: 'ערן',
    lastName: 'הירשפלד',
    phone: '054-6929966',
    email: '‎hirschfeldbit@gmail.com',
  },
  {
    firstName: 'קורל',
    lastName: 'עמרם',
    phone: '052-4761651',
    email: 'koral@pro-bit.co.il',
  },
  {
    firstName: 'שרון',
    lastName: 'דבח',
    phone: '052-3842842',
    email: 'desk-soch@pro-bit.co.il',
  },
  {
    firstName: 'אדי',
    lastName: 'אפריימוב',
    phone: '052-7032264',
    email: 'edi@pro-bit.co.il',
  },
  {
    firstName: 'בת אל',
    lastName: 'פדלון פלד',
    phone: '052-3874886',
    email: 'batel@pro-bit.co.il',
  },
  {
    firstName: 'עדן',
    lastName: 'כהן',
    phone: '052-4001985',
    email: 'edencohen@harel-ins.co.il',
  },
  {
    firstName: 'אור',
    lastName: 'אהוב',
    phone: '052-6099778',
    email: 'or@pro-bit.co.il',
  },
  {
    firstName: 'רוז',
    lastName: 'שוורץ',
    phone: '054-2050493',
    email: 'rose@pro-bit.co.il',
  },
  {
    firstName: 'רון',
    lastName: 'בן שמחון',
    phone: '054-2265011',
    email: 'ron@crgroup.co.il',
  },
  {
    firstName: 'אלינור',
    lastName: 'פרטוש',
    phone: '050-2530585',
    email: 'elinor@pro-bit.co.il',
  },
  {
    firstName: 'יהלי טובי',
    lastName: 'דונר',
    phone: '052-3420688',
    email: 'yalitobi@pro-bit.co.il',
  },
  {
    firstName: 'מוטי',
    lastName: 'אסולין',
    phone: '052-6779549',
    email: 'moti@pro-bit.co.il',
  },
  {
    firstName: 'טום',
    lastName: 'תאבת',
    phone: '054-8775363',
    email: 'tom@b-fin.co.il',
  },
  {
    firstName: 'דן',
    lastName: 'פוסטולוב',
    phone: '053-6555896',
    email: 'dan@pro-bit.co.il',
  },
  {
    firstName: 'ליעד',
    lastName: 'צ׳יפרוט',
    phone: '052-8187244',
    email: 'liad@pro-bit.co.il',
  },
  {
    firstName: 'שרי',
    lastName: 'פליישמן',
    phone: '054-8449463',
    email: 'desk@pro-bit.co.il',
  },
  {
    firstName: 'יעל',
    lastName: 'סרבניק',
    phone: '054-8540311',
    email: 'yael@pro-bit.co.il',
  },
  {
    firstName: 'גל',
    lastName: 'ארז',
    phone: '050-9400961',
    email: 'gal@pro-bit.co.il',
  },
]
