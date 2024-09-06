export const FACILITIES = [
  'מגבות',
  'ג׳קוזי',
  'סאונה',
  'מלתחות',
  'חניה',
  'לוקרים',
  'בריכה',
  'נגישות',
  'שירותים',
  'ספא',
  'טניס',
  'סקווש',
  'זורת אגרוף',
  'טניס שולחן',
  'כדורסל',
  'WIFI',
  'פילאטיס מכשירים',
  'TRX',
] as const

export interface RegisterInterface {
  // first screen
  isStudio: boolean
  isTrainer: boolean
  is_studio_discount: boolean
  is_trainer_discount: boolean

  // second screen
  client_second_name: string
  client_first_name: string
  client_email: string
  client_phone: string

  // thrid screen
  studio_nickname: string
  studio_full_name: string
  studio_email: string
  studio_name: string
  studio_location: string

  // forth screen
  first_day: string
  second_day: string
  third_day: string
  forth_day: string
  fifth_day: string
  sixth_day: string
  seventh_day: string
  _id?:string,
  // fifth screen
  instagram_link: string
  facebook_link: string
  description: string
  training_in_studio: boolean
  training_in_client_home: boolean

  // sixth screen
  facilities: {
    מגבות: boolean
    'ג׳קוזי': boolean
    סאונה: boolean
    מלתחות: boolean
    חניה: boolean
    לוקרים: boolean
    בריכה: boolean
    נגישות: boolean
    שירותים: boolean
    ספא: boolean
    טניס: boolean
    סקווש: boolean
    'זורת אגרוף': boolean
    'טניס שולחן': boolean
    כדורסל: boolean
    WIFI: boolean
    'פילאטיס מכשירים': boolean
    TRX: boolean
  }
  // Seventh screen

  // Eight screen

  // Ningth screen
  card_full_name: string
  card_verification_id: string
  card_number: string
  card_exp: string
  card_cvv: string
}
