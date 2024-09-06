export type Ordering = 'asc' | 'desc' | null
export interface Profile {
  _id: string
  // TODO add interface for them
  location: Record<string, any>
  isGym: boolean
  profileCreated: boolean
  // TODO add interface for them
  requests: Record<string, any>
  // TODO add interface for them
  offers: Record<string, any>
  isVerified: boolean
  // TODO add interface for them
  trainees: Record<string, any>
  // TODO add interface for them
  instructors: Record<string, any>
  // TODO add interface for them
  lessons: Record<string, any>
  schedule?: Array<ScheduleFormTypetwo>
  sessionsCountThisWeek: number
  published: boolean
  type: string
  phone: string
  // TODO add interface for them
  otpData: Record<string, any>
  // TODO add interface for them
  rooms: Record<string, any>
  // TODO add interface for them
  catalog: Record<string, any>
  // TODO add interface for them
  pushNotificationSettings: Record<string, any>
  created_at: string
  updated_at: string
  __v: number
  about: string
  // TODO add interface for them
  activityTime: Record<string, any>
  contactEmail: string
  contactPhone: string
  email: string
  facebook: string
  firstname: string
  instagram: string
  // TODO add interface for them
  isSaturday: Record<string, any>
  full_name: string
  lastname: string
  nickname: string
  profilePicture: string
  bannerPicture: string
  // TODO add interface for them
  galleryImages: Record<string, any>
  isPremium: boolean
  seller: {}
  sellerKey: string
}
export interface ScheduleFormTypetwo {
  time: [
    {
      start: string,
      finish:string
    }
  ]
  day: number
}
interface ExtendedData {
  studio_id: string
  _id: string
}
interface ExtendedID {
  _id: string
}

interface GroupSessionTrainee {
  _id: string
  trainee_id: string
  full_name: string
  icon_url: string
  registered: boolean
  signed_at: string
}
export interface GroupSessionType extends ExtendedData {
  group_isGroup: boolean
  group_instructor: string
  group_name_of_trainings: string
  group_type_of_studying: string
  group_room: string
  group_address: string
  group_finish: string
  group_start: string
  group_date: string
  group_number_of_partipiciants: number
  group_date_of_end: string
  group_weekly_repeat: boolean
  group_recurring_id: string
  group_card_payment: string[]
  group_price: number
  group_amount_of_trainings: number
  group_trainees: GroupSessionTrainee[]
}

export interface PrivateSessionType extends ExtendedData {
  private_isPrivate: boolean
  private_trainee: string
  private_instructor: string
  private_name_of_trainings: string
  private_start: string
  private_finish: string
  private_date: string
  private_address: string
  private_room: string
  private_is_external_address: boolean
  private_price: string
  private_amount_of_trainings: number
  studio_id: string
}
export interface PrivateCourseType extends ExtendedData {
  course_trainee: string
  course_instructor: string
  course_start: string
  course_finish: string
  course_date: string
  course_address: string
  course_room: string
  course_is_external_address: boolean
  studio_id: string
}

export interface TrainerTableType extends ExtendedID {
  name: string
  phone: string
  email: string
  sex: string
  date_of_last_training: number
  amount_of_trainings: number
  _id: string
}
export interface TrainerAddType extends ExtendedID {
  name: string
  phone: string
  email: string
  sex: string
  birthday_date: string
  type_of_trainings: string
}

export interface TrainerSchedule {
  day_id: string
  time: [{ start: string; finish: string }]
}
export interface TrainerTable extends ExtendedID {
  avatar: string
  name: string
  phone: string
  email: string
  sex: string
  date_of_last_training: string
  amount_of_trainings: string
  last_training: string
  created_at: string
  birthday_date: string
  schedule: TrainerSchedule[]
}
export interface TraineesTable extends ExtendedID {
  avatar_url: string
  full_name: string
  phone: string
  email: string
  sex: string
  birthday: string
  date_of_last_training: string
  amount_of_trainings: string
  created_at: string
  address: string
  studios: string[]
  approve_reglament: boolean
  email_confirmed: boolean
  phone_confirmed: boolean
}

interface CourseWeekDays {
  course_week_day: string
  course_start: string
  course_finish: string
}
export interface CourseType extends ExtendedID {
  course_name: string
  course_start_date: string
  course_repetitions_amount: string
  course_week_days: CourseWeekDays[]
  course_trainer: string
  course_room: string
  course_participants_number: string
  course_description: string
  course_price: string
  course_type_of_trainings: string
  course_end_date: string
}

export interface TrainingsTableType {
  price: string
  amount_of_trainings: string
  last_training: string
  number_of_participants: string
  instructor: string
  date_of_training: string
}

export interface AddRoomModalType {
  width_of_room: string
  name_of_room: string
  facilities: string
  room_type: string
}

export interface RoomModelType extends AddRoomModalType, ExtendedData {}

export interface CardType extends ExtendedID {
  card_participants: string[]
  card_name: string
  card_participants_number: string
  card_duration: string
  card_price: string
  card_description: string
}

export interface SubscriptionType extends ExtendedID {
  subscription_participants_id: string[]
  subscription_name: string
  subscription_duration: string
  subscription_description: string
  subscription_limit: boolean
  subscription_price: string
  subscription_limit_times: string
  subscription_limit_frame: string
}

export interface StudioDetails {
  name: string
  nickname: string
  email: string
  phone: string
  location: string
}

export interface TrainerDetails {
  first_name: string
  last_name: string
  email: string
  phone: string
}

export interface ScheduleFormType {
  sunday: { start: string; finish: string }[]
  monday: { start: string; finish: string }[]
  tuesday: { start: string; finish: string }[]
  wednesday: { start: string; finish: string }[]
  thursday: { start: string; finish: string }[]
  friday: { start: string; finish: string }[]
  saturday: { start: string; finish: string }[]
}

export interface SellerFormType extends ExtendedID {
  seller_first_name: string
  seller_last_name: string
  seller_social_id: string
  seller_birthdate: string
  seller_social_id_issued: string
  seller_gender: number
  seller_email: string
  seller_phone: string
  seller_bank_code: number
  seller_bank_branch: number
  seller_bank_account_number: string
  seller_description: string
  seller_site_url: string
  seller_person_business_type: number
  seller_inc: number
  seller_merchant_name: string
  seller_address_city: string
  seller_address_street: string
  seller_address_street_number: string
  seller_address_country: string
  studio_id: string
}
