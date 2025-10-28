import { pgTable, serial, text, timestamp, integer, boolean, decimal, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==================== USERS TABLE ====================
// Note: Using 'app_users' to avoid conflict with Supabase auth.users
export const users = pgTable('app_users', {
  id: serial('id').primaryKey(),
  supabaseId: varchar('supabase_id', { length: 255 }).notNull().unique(), // Reference to auth.users
  phone: varchar('phone', { length: 15 }).notNull().unique(),
  userType: varchar('user_type', { length: 20 }).notNull(), // 'worker' or 'employer'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at'),
});

// ==================== WORKERS TABLE ====================
export const workers = pgTable('workers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  skill: varchar('skill', { length: 50 }).notNull(),
  experience: varchar('experience', { length: 50 }),
  location: text('location').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  languages: jsonb('languages').default('[]'), // Array of language codes
  bio: text('bio'),
  profilePhoto: text('profile_photo'),
  hourlyRate: integer('hourly_rate'), // in rupees
  dailyRate: integer('daily_rate'), // in rupees
  availability: varchar('availability', { length: 20 }).default('available'), // 'available', 'busy', 'offline'
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalReviews: integer('total_reviews').default(0),
  jobsCompleted: integer('jobs_completed').default(0),
  responseTime: integer('response_time'), // in minutes
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==================== EMPLOYERS TABLE ====================
export const employers = pgTable('employers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  companyName: varchar('company_name', { length: 100 }),
  location: text('location').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  profilePhoto: text('profile_photo'),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalReviews: integer('total_reviews').default(0),
  jobsPosted: integer('jobs_posted').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==================== VERIFICATIONS TABLE ====================
export const verifications = pgTable('verifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  phoneVerified: boolean('phone_verified').default(true), // Always true after signup
  aadhaarVerified: boolean('aadhaar_verified').default(false),
  upiVerified: boolean('upi_verified').default(false),
  ngoVerified: boolean('ngo_verified').default(false),
  upiId: varchar('upi_id', { length: 100 }),
  aadhaarNumber: varchar('aadhaar_number', { length: 12 }), // Encrypted
  trustScore: integer('trust_score').default(25), // 0-100
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==================== JOBS TABLE ====================
export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  employerId: integer('employer_id').references(() => employers.id).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  skill: varchar('skill', { length: 50 }).notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  budget: integer('budget').notNull(), // Daily rate in rupees
  budgetType: varchar('budget_type', { length: 20 }).default('daily'), // 'hourly', 'daily', 'fixed'
  startDate: timestamp('start_date'),
  duration: varchar('duration', { length: 50 }), // e.g., "1 day", "2 weeks"
  urgent: boolean('urgent').default(false),
  status: varchar('status', { length: 20 }).default('open'), // 'open', 'in_progress', 'completed', 'cancelled'
  applicationsCount: integer('applications_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// ==================== APPLICATIONS TABLE ====================
export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').references(() => jobs.id).notNull(),
  workerId: integer('worker_id').references(() => workers.id).notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'accepted', 'rejected', 'withdrawn'
  message: text('message'),
  proposedRate: integer('proposed_rate'), // Worker's proposed rate
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
});

// ==================== REVIEWS TABLE ====================
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').references(() => jobs.id).notNull(),
  reviewerId: integer('reviewer_id').references(() => users.id).notNull(), // Can be worker or employer
  revieweeId: integer('reviewee_id').references(() => users.id).notNull(), // Can be worker or employer
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  badges: jsonb('badges').default('[]'), // Array of badge strings
  isPublic: boolean('is_public').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==================== MESSAGES TABLE ====================
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  receiverId: integer('receiver_id').references(() => users.id).notNull(),
  jobId: integer('job_id').references(() => jobs.id), // Optional: message related to a job
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  readAt: timestamp('read_at'),
});

// ==================== PAYMENTS TABLE ====================
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').references(() => jobs.id).notNull(),
  payerId: integer('payer_id').references(() => employers.id).notNull(),
  payeeId: integer('payee_id').references(() => workers.id).notNull(),
  amount: integer('amount').notNull(), // in rupees
  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'held', 'released', 'refunded'
  paymentMethod: varchar('payment_method', { length: 20 }), // 'upi', 'card', 'wallet'
  transactionId: varchar('transaction_id', { length: 100 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  releasedAt: timestamp('released_at'),
});

// ==================== WALLET TABLE ====================
export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  balance: integer('balance').default(0), // in rupees
  totalEarnings: integer('total_earnings').default(0),
  totalWithdrawals: integer('total_withdrawals').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ==================== WALLET TRANSACTIONS TABLE ====================
export const walletTransactions = pgTable('wallet_transactions', {
  id: serial('id').primaryKey(),
  walletId: integer('wallet_id').references(() => wallets.id).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'credit', 'debit'
  amount: integer('amount').notNull(),
  description: text('description'),
  referenceId: integer('reference_id'), // Reference to payment/job
  referenceType: varchar('reference_type', { length: 20 }), // 'payment', 'withdrawal'
  balanceAfter: integer('balance_after').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ==================== NOTIFICATIONS TABLE ====================
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'job_match', 'application', 'message', 'payment', 'review'
  referenceId: integer('reference_id'), // ID of related entity
  referenceType: varchar('reference_type', { length: 20 }), // 'job', 'application', 'message', etc.
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  readAt: timestamp('read_at'),
});

// ==================== RELATIONS ====================
export const usersRelations = relations(users, ({ one, many }) => ({
  worker: one(workers, { fields: [users.id], references: [workers.userId] }),
  employer: one(employers, { fields: [users.id], references: [employers.userId] }),
  verification: one(verifications, { fields: [users.id], references: [verifications.userId] }),
  wallet: one(wallets, { fields: [users.id], references: [wallets.userId] }),
  sentMessages: many(messages, { relationName: 'sender' }),
  receivedMessages: many(messages, { relationName: 'receiver' }),
  notifications: many(notifications),
}));

export const workersRelations = relations(workers, ({ one, many }) => ({
  user: one(users, { fields: [workers.userId], references: [users.id] }),
  applications: many(applications),
}));

export const employersRelations = relations(employers, ({ one, many }) => ({
  user: one(users, { fields: [employers.userId], references: [users.id] }),
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, { fields: [jobs.employerId], references: [employers.id] }),
  applications: many(applications),
  reviews: many(reviews),
  messages: many(messages),
  payments: many(payments),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, { fields: [applications.jobId], references: [jobs.id] }),
  worker: one(workers, { fields: [applications.workerId], references: [workers.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id], relationName: 'sender' }),
  receiver: one(users, { fields: [messages.receiverId], references: [users.id], relationName: 'receiver' }),
  job: one(jobs, { fields: [messages.jobId], references: [jobs.id] }),
}));


