const ENDPOINTS = {
  AUTH: {
    LOGIN_WITH_PHONE_POST: 'auth/login',
    LOGIN_WITH_PHONE_AND_OTP_POST: 'auth/login',
    VERIFY_ACCOUNT_POST: 'auth/verify',
    LOAD_PROFILE_POST: 'auth/get'
  },
  REGISTRATION: {
    UPDATE_PROFILE_POST: 'auth/edit',
    GET_PROFILE_GET: 'auth/get'
  },

  EVENT: {
    GET_ALL_COURSE_EVENTS_POST: 'event/course/all',
    GET_ALL_GROUP_EVENTS_POST: 'event/group/all',
    GET_ALL_PRIVATE_EVENTS_POST: 'event/private/all',
    GET_ALL_CARDS_POST: 'event/card/all',
    GET_ALL_SUBSCRIPTIONS_POST: 'event/subscription/all',

    EDIT_GROUP_SESSION_POST: 'event/edit/group',
    EDIT_PRIVATE_SESSION_POST: 'event/edit/private',
    EDIT_COURSE_SESSION_POST: 'event/edit/course',
    EDIT_RECURRING_GROUP_SESSION: 'event/edit/group/recurring',
    EDIT_CARD_POST: 'event/edit/card',
    EDIT_SUBSCRIPTION_POST: 'event/edit/subscription',

    CREATE_GROUP_EVENT_POST: 'event/group',
    CREATE_PRIVATE_EVENT_POST: 'event/private',
    CREATE_CARD_POST: 'event/card',
    CREATE_SUBSCRIPTION_POST: 'event/subscription',
    CREATE_COURSE_POST: 'event/course',

    DELETE_RECURRING_GROUP_EVENT_DELETE: 'event/group/recurring',
    DELETE_SESSION_EVENT_DELETE: 'event',
    DELETE_CARD_DELETE: 'event/card',
    DELETE_SUBSCRIPTION_DELETE: 'event/subscription'
  },
  TRAINEE: {
    GET_ALL_TRAINEE_POST: 'trainee/all',
    GET_SINGLE_TRAINEE_GET: 'trainee',
    POST_TRAINEE_PHONE_POST: 'trainee/studio/phone',
    POST_TRAINEE_PHONE_FULL_POST: ' trainee/studio/full'
  },
  INSTRUCTOR: {
    GET_ALL_INSTRUCTORS: 'instructor/all',
    GET_SINGLE_INSTRUCTOR_GET: 'instructor',
    CREATE_SINGLE_INSTRUCTOR_POST: 'instructor',
    PATCH_SINGLE_INSTRUCTOR_PATCH: 'instructor'
  },
  ROOM: {
    GET_ALL_ROOMS_POST: 'room/all',
    GET_SINGLE_ROOM: 'room/'
  },
  CARDS: {},
  PAYMENTSUBSCRIPTION:{
    GET_ALL_INVOICE: 'auth/invoices',
    GET_INVOICE: 'invoice'
  },
  SELLER: {
    CREATE: 'auth/seller'
  }
} as const

export default ENDPOINTS
