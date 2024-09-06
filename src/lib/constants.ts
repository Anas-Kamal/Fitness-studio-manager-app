import eventIcon from '../imgs/bounce/ic_event_24px.svg'
import groupIcon from '../imgs/bounce/ic_group_24px.svg'
import personIcon from '../imgs/bounce/ic_person_24px.svg'
import assignmentIcon from '../imgs/bounce/ic_assignment_24px.svg'
import fitnessIcon from '../imgs/bounce/ic_fitness_center_24px.svg'
import walletIcon from '../imgs/bounce/wallet.svg'

import { NavLink } from './types'

const requireEnv = (name: string, value?: string, def?: string) => {
  if (!value && !def) {
    throw new Error(`${name} is required in environment variables, but was not provided`)
  }

  return (value || def) as string
}

export const REACT_APP_PUBLIC_MONGO_URL = requireEnv(
  'REACT_APP_PUBLIC_MONGO_URL',
  process.env.REACT_APP_PUBLIC_MONGO_URL
)
export const REACT_APP_SUPABASE_URL = requireEnv(
  'REACT_APP_SUPABASE_URL',
  process.env.REACT_APP_SUPABASE_URL
)
export const REACT_APP_SUPABASE_KEY = requireEnv(
  'REACT_APP_SUPABASE_KEY',
  process.env.REACT_APP_SUPABASE_KEY
)

export enum ROUTES {
  MAIN = '/',
  DASHBOARD = `/dashboard`,
  PARTICIPANTS = '/participants',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CALENDAR = '/calendar',
  STATISTICS = '/statistics',
  PRACTISING = '/practising',
  ROOM_LIST = '/roomlist',
  TRAININGS = '/trainings',
  CARDS_AND_SUBSCRIPTION = '/subsctiption',
  CREATE_SELLER = '/create-seller',
  SETTINGS = '/setting',


  // Instructors
  TRAINERS = '/instructors',
  TRAINER_PROFILE_PAGE = '/instructors-profile',

  // Trainees
  TRAINEES = '/trainees',
  TRAINEES_PROFILE_PAGE = '/trainees-profile'
}
export const NAV_BAR_LINKS: NavLink[] = [
  { to: ROUTES.CALENDAR, children: eventIcon, text: 'יומן', type: ['studio', 'trainer'] },
  // { to: ROUTES.STATISTICS, children: timeIcon, text: 'סטטיסטיקה' },
  { to: ROUTES.TRAINEES, children: groupIcon, text: 'מתאמנים', type: ['studio', 'trainer'] },
  { to: ROUTES.TRAINERS, children: personIcon, text: 'מאמנים', type: ['studio'] },
  { to: ROUTES.ROOM_LIST, children: assignmentIcon, text: 'רשימת חדרים', type: ['studio'] },
  { to: ROUTES.TRAININGS, children: fitnessIcon, text: 'אימונים', type: ['studio', 'trainer'] },
  {
    to: ROUTES.CARDS_AND_SUBSCRIPTION,
    children: walletIcon,
    text: 'כרטיסיות ומנויים',
    type: ['studio', 'trainer']
  }
]

export const HEBREW_DAYS_OF_WEEK = [
  { label: 'ראשון', value: '0' },
  { label: 'שני', value: '1' },
  { label: 'שלישי', value: '2' },
  { label: 'רביעי', value: '3' },
  { label: 'חמישי', value: '4' },
  { label: 'שישי', value: '5' },
  { label: 'שבת', value: '6' }
]

export const TIME_PERIODS = [
  { label: 'יום יומי', value: '1 ' },
  { label: 'שבועי', value: '2' },
  { label: 'חודשי', value: '3' },
  { label: 'שנתי', value: '4' },
  { label: 'חצי שנתי', value: '5' }
]

export const TYPES_OF_TRAININGS = [
  {
    _id: 1,
    value: 'kickbox',
    label: {
      localization: {
        en: 'kickbox',
        he: 'קיקבוקסינג'
      }
    }
  },
  {
    _id: 2,
    value: 'ballGames',
    label: {
      localization: {
        en: 'ballGames',
        he: 'משחקי כדור'
      }
    }
  },
  {
    _id: 3,
    value: 'spinning',
    label: {
      localization: {
        en: 'spinning',
        he: 'אופניים וספינינג'
      }
    }
  },
  {
    _id: 4,
    value: 'running',
    label: {
      localization: {
        en: 'running',
        he: 'ריצה'
      }
    }
  },
  {
    _id: 5,
    value: 'dance',
    label: {
      localization: {
        en: 'dance',
        he: 'ריקוד'
      }
    }
  },
  {
    _id: 6,
    value: 'tennis',
    label: {
      localization: {
        en: 'tennis',
        he: 'טניס'
      }
    }
  },
  {
    _id: 7,
    value: 'TRX',
    label: {
      localization: {
        en: 'TRX',
        he: 'TRX'
      }
    }
  },
  {
    _id: 8,
    value: 'functional',
    label: {
      localization: {
        en: 'functional',
        he: 'פונקציונלי'
      }
    }
  },
  {
    _id: 9,
    value: 'crossfit',
    label: {
      localization: {
        en: 'crossfit',
        he: 'קרוספיט'
      }
    }
  },
  {
    _id: 10,
    value: 'bodySoul',
    label: {
      localization: {
        en: 'bodySoul',
        he: 'גוף ונפש'
      }
    }
  },
  {
    _id: 11,
    value: 'martialArts',
    label: {
      localization: {
        en: 'martialArts',
        he: 'אומנויות לחימה'
      }
    }
  },
  {
    _id: 12,
    value: 'surfSwim',
    label: {
      localization: {
        en: 'surfSwim',
        he: 'גלישה ושחייה'
      }
    }
  },
  {
    _id: 13,
    value: 'weights',
    label: {
      localization: {
        en: 'weights',
        he: 'משקולות'
      }
    }
  },
  {
    _id: 14,
    value: 'exercise',
    label: {
      localization: {
        en: 'exercise',
        he: 'התעמלות'
      }
    }
  },
  {
    _id: 15,
    value: 'general',
    label: {
      localization: {
        en: 'general',
        he: 'כללי'
      }
    }
  }
]

export const WEEK_DAYS = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
}
