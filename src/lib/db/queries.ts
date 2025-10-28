// lib/db/queries.ts - Database query helpers
import { db } from "./index";
import { users, workers, employers, verifications, jobs, applications, reviews, messages, wallets, walletTransactions, notifications, payments } from "./schema";
import { eq, and, desc, sql } from "drizzle-orm";

// ==================== USER QUERIES ====================
export async function getUserByPhone(phone: string) {
  const result = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
  return result[0] || null;
}

export async function createUser(phone: string, userType: 'worker' | 'employer', supabaseId: string) {
  const result = await db.insert(users).values({
    phone,
    userType,
    supabaseId,
    lastLoginAt: new Date(),
  }).returning();
  return result[0];
}

export async function updateUserLogin(userId: number) {
  await db.update(users).set({
    lastLoginAt: new Date(),
  }).where(eq(users.id, userId));
}

// ==================== WORKER QUERIES ====================
export async function getWorkerByUserId(userId: number) {
  const result = await db.select().from(workers).where(eq(workers.userId, userId)).limit(1);
  return result[0] || null;
}

export async function createWorker(data: {
  userId: number;
  name: string;
  skill: string;
  experience?: string;
  location: string;
  latitude?: string;
  longitude?: string;
  languages?: string[];
  hourlyRate?: number;
  dailyRate?: number;
  bio?: string;
}) {
  const result = await db.insert(workers).values({
    userId: data.userId,
    name: data.name,
    skill: data.skill,
    experience: data.experience,
    location: data.location,
    latitude: data.latitude,
    longitude: data.longitude,
    languages: data.languages || [],
    hourlyRate: data.hourlyRate,
    dailyRate: data.dailyRate,
    bio: data.bio,
  }).returning();
  
  // Create verification record
  await db.insert(verifications).values({
    userId: data.userId,
    phoneVerified: true,
    trustScore: 25, // 25% for phone verification only
  });
  
  // Create wallet
  await db.insert(wallets).values({
    userId: data.userId,
  });
  
  return result[0];
}

export async function updateWorker(workerId: number, data: Partial<typeof workers.$inferInsert>) {
  const result = await db.update(workers).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(workers.id, workerId)).returning();
  return result[0];
}

export async function getWorkersBySkill(skill: string, limit = 10) {
  return await db.select().from(workers)
    .where(and(
      eq(workers.skill, skill),
      eq(workers.isActive, true)
    ))
    .orderBy(desc(workers.rating))
    .limit(limit);
}

export async function getNearbyWorkers(latitude: number, longitude: number, skill: string) {
  // Simplified distance calculation for now
  // In production, use PostGIS or proper distance calculation
  console.log('Searching near:', latitude, longitude);
  return await db.select().from(workers)
    .where(and(
      eq(workers.skill, skill),
      eq(workers.isActive, true)
    ))
    .orderBy(desc(workers.rating))
    .limit(10);
}

// ==================== EMPLOYER QUERIES ====================
export async function getEmployerByUserId(userId: number) {
  const result = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  return result[0] || null;
}

export async function createEmployer(data: {
  userId: number;
  name: string;
  companyName?: string;
  location: string;
  latitude?: string;
  longitude?: string;
}) {
  const result = await db.insert(employers).values({
    userId: data.userId,
    name: data.name,
    companyName: data.companyName,
    location: data.location,
    latitude: data.latitude,
    longitude: data.longitude,
  }).returning();
  
  // Create verification record
  await db.insert(verifications).values({
    userId: data.userId,
    phoneVerified: true,
    trustScore: 25,
  });
  
  return result[0];
}

// ==================== JOB QUERIES ====================
export async function createJob(data: {
  employerId: number;
  title: string;
  skill: string;
  description: string;
  location: string;
  latitude?: string;
  longitude?: string;
  budget: number;
  budgetType?: string;
  startDate?: Date;
  duration?: string;
  urgent?: boolean;
}) {
  const result = await db.insert(jobs).values(data).returning();
  
  // Update employer's job count
  await db.execute(sql`
    UPDATE ${employers}
    SET jobs_posted = jobs_posted + 1
    WHERE id = ${data.employerId}
  `);
  
  return result[0];
}

export async function getJobById(jobId: number) {
  const result = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  return result[0] || null;
}

export async function getJobsBySkill(skill: string, limit = 20) {
  return await db.select().from(jobs)
    .where(and(
      eq(jobs.skill, skill),
      eq(jobs.status, 'open')
    ))
    .orderBy(desc(jobs.urgent), desc(jobs.createdAt))
    .limit(limit);
}

export async function getJobsByEmployer(employerId: number) {
  return await db.select().from(jobs)
    .where(eq(jobs.employerId, employerId))
    .orderBy(desc(jobs.createdAt));
}

export async function updateJobStatus(jobId: number, status: string) {
  const result = await db.update(jobs).set({
    status,
    updatedAt: new Date(),
    ...(status === 'completed' ? { completedAt: new Date() } : {}),
  }).where(eq(jobs.id, jobId)).returning();
  return result[0];
}

// ==================== APPLICATION QUERIES ====================
export async function createApplication(data: {
  jobId: number;
  workerId: number;
  message?: string;
  proposedRate?: number;
}) {
  const result = await db.insert(applications).values(data).returning();
  
  // Update job's application count
  await db.execute(sql`
    UPDATE ${jobs}
    SET applications_count = applications_count + 1
    WHERE id = ${data.jobId}
  `);
  
  return result[0];
}

export async function getApplicationsByWorker(workerId: number) {
  return await db.select().from(applications)
    .where(eq(applications.workerId, workerId))
    .orderBy(desc(applications.createdAt));
}

export async function getApplicationsByJob(jobId: number) {
  return await db.select().from(applications)
    .where(eq(applications.jobId, jobId))
    .orderBy(desc(applications.createdAt));
}

export async function getApplicationById(applicationId: number) {
  const result = await db.select().from(applications).where(eq(applications.id, applicationId)).limit(1);
  return result[0] || null;
}

export async function updateApplicationStatus(applicationId: number, status: string) {
  const result = await db.update(applications).set({
    status,
    respondedAt: new Date(),
    updatedAt: new Date(),
  }).where(eq(applications.id, applicationId)).returning();
  return result[0];
}

// ==================== REVIEW QUERIES ====================
export async function createReview(data: {
  jobId: number;
  reviewerId: number;
  revieweeId: number;
  rating: number;
  comment?: string;
  badges?: string[];
}) {
  const result = await db.insert(reviews).values({
    ...data,
    badges: data.badges || [],
  }).returning();
  
  // Update worker/employer rating
  await updateRatings(data.revieweeId);
  
  return result[0];
}

export async function getReviewsByReviewee(revieweeId: number) {
  return await db.select().from(reviews)
    .where(and(
      eq(reviews.revieweeId, revieweeId),
      eq(reviews.isPublic, true)
    ))
    .orderBy(desc(reviews.createdAt));
}

async function updateRatings(userId: number) {
  // Get average rating
  const result = await db.execute(sql`
    SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews
    FROM ${reviews}
    WHERE reviewee_id = ${userId} AND is_public = true
  `) as unknown as Array<{ avg_rating: string; total_reviews: number }>;
  
  const avgRating = result[0]?.avg_rating || '0';
  const totalReviews = result[0]?.total_reviews || 0;
  
  // Update worker or employer rating
  await db.execute(sql`
    UPDATE ${workers}
    SET rating = ${parseFloat(avgRating)}, total_reviews = ${totalReviews}
    WHERE user_id = ${userId}
  `);
  
  await db.execute(sql`
    UPDATE ${employers}
    SET rating = ${parseFloat(avgRating)}, total_reviews = ${totalReviews}
    WHERE user_id = ${userId}
  `);
}

// ==================== MESSAGE QUERIES ====================
export async function createMessage(data: {
  senderId: number;
  receiverId: number;
  jobId?: number;
  content: string;
}) {
  const result = await db.insert(messages).values(data).returning();
  
  // Create notification for receiver
  await createNotification({
    userId: data.receiverId,
    title: 'New Message',
    message: data.content.substring(0, 100),
    type: 'message',
    referenceId: result[0].id,
    referenceType: 'message',
  });
  
  return result[0];
}

export async function getMessagesBetweenUsers(userId1: number, userId2: number) {
  return await db.select().from(messages)
    .where(
      sql`(sender_id = ${userId1} AND receiver_id = ${userId2}) OR (sender_id = ${userId2} AND receiver_id = ${userId1})`
    )
    .orderBy(messages.createdAt);
}

export async function markMessageAsRead(messageId: number) {
  await db.update(messages).set({
    isRead: true,
    readAt: new Date(),
  }).where(eq(messages.id, messageId));
}

// ==================== VERIFICATION QUERIES ====================
export async function getVerification(userId: number) {
  const result = await db.select().from(verifications).where(eq(verifications.userId, userId)).limit(1);
  return result[0] || null;
}

export async function updateVerification(userId: number, data: Partial<typeof verifications.$inferInsert>) {
  // Calculate new trust score
  const verification = await getVerification(userId);
  if (verification) {
    let trustScore = 0;
    if (verification.phoneVerified || data.phoneVerified) trustScore += 25;
    if (verification.upiVerified || data.upiVerified) trustScore += 25;
    if (verification.ngoVerified || data.ngoVerified) trustScore += 50;
    
    data.trustScore = trustScore;
  }
  
  const result = await db.update(verifications).set({
    ...data,
    updatedAt: new Date(),
    verifiedAt: new Date(),
  }).where(eq(verifications.userId, userId)).returning();
  return result[0];
}

// ==================== WALLET QUERIES ====================
export async function getWallet(userId: number) {
  const result = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1);
  return result[0] || null;
}

export async function addToWallet(userId: number, amount: number, description: string, referenceId?: number, referenceType?: string) {
  const wallet = await getWallet(userId);
  if (!wallet) throw new Error('Wallet not found');
  
  const currentBalance = wallet.balance || 0;
  const currentEarnings = wallet.totalEarnings || 0;
  const newBalance = currentBalance + amount;
  
  // Update wallet
  await db.update(wallets).set({
    balance: newBalance,
    totalEarnings: currentEarnings + amount,
    updatedAt: new Date(),
  }).where(eq(wallets.userId, userId));
  
  // Create transaction record
  await db.insert(walletTransactions).values({
    walletId: wallet.id,
    type: 'credit',
    amount,
    description,
    referenceId,
    referenceType,
    balanceAfter: newBalance,
  });
  
  return newBalance;
}

export async function deductFromWallet(userId: number, amount: number, description: string, referenceId?: number, referenceType?: string) {
  const wallet = await getWallet(userId);
  if (!wallet) throw new Error('Wallet not found');
  
  const currentBalance = wallet.balance || 0;
  const currentWithdrawals = wallet.totalWithdrawals || 0;
  
  if (currentBalance < amount) throw new Error('Insufficient balance');
  
  const newBalance = currentBalance - amount;
  
  // Update wallet
  await db.update(wallets).set({
    balance: newBalance,
    totalWithdrawals: currentWithdrawals + amount,
    updatedAt: new Date(),
  }).where(eq(wallets.userId, userId));
  
  // Create transaction record
  await db.insert(walletTransactions).values({
    walletId: wallet.id,
    type: 'debit',
    amount,
    description,
    referenceId,
    referenceType,
    balanceAfter: newBalance,
  });
  
  return newBalance;
}

export async function getWalletByUserId(userId: number) {
  return await getWallet(userId);
}

export async function getWalletTransactions(walletId: number, limit = 20) {
  return await db.select().from(walletTransactions)
    .where(eq(walletTransactions.walletId, walletId))
    .orderBy(desc(walletTransactions.createdAt))
    .limit(limit);
}

// ==================== NOTIFICATION QUERIES ====================
export async function createNotification(data: {
  userId: number;
  title: string;
  message: string;
  type: string;
  referenceId?: number;
  referenceType?: string;
}) {
  const result = await db.insert(notifications).values(data).returning();
  return result[0];
}

export async function getNotifications(userId: number, limit = 20) {
  return await db.select().from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function getNotificationsByUser(userId: number, unreadOnly = false) {
  const whereCondition = unreadOnly 
    ? and(eq(notifications.userId, userId), eq(notifications.isRead, false))
    : eq(notifications.userId, userId);
    
  return await db.select().from(notifications)
    .where(whereCondition)
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(notificationId: number) {
  await db.update(notifications).set({
    isRead: true,
    readAt: new Date(),
  }).where(eq(notifications.id, notificationId));
}

export async function getUnreadNotificationCount(userId: number) {
  const result = await db.execute(sql`
    SELECT COUNT(*) as count
    FROM ${notifications}
    WHERE user_id = ${userId} AND is_read = false
  `) as unknown as Array<{ count: string }>;
  return parseInt(result[0]?.count || '0');
}

// ==================== PAYMENT QUERIES ====================
export async function createPayment(data: {
  jobId: number;
  payerId: number;
  payeeId: number;
  amount: number;
  paymentMethod?: string;
}) {
  const result = await db.insert(payments).values({
    ...data,
    status: 'held', // Money held in escrow
  }).returning();
  return result[0];
}

export async function releasePayment(paymentId: number) {
  const payment = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);
  if (!payment[0]) throw new Error('Payment not found');
  
  // Update payment status
  await db.update(payments).set({
    status: 'released',
    releasedAt: new Date(),
    updatedAt: new Date(),
  }).where(eq(payments.id, paymentId));
  
  // Add to worker's wallet
  const worker = await db.select().from(workers).where(eq(workers.id, payment[0].payeeId)).limit(1);
  if (worker[0]) {
    await addToWallet(worker[0].userId, payment[0].amount, 'Job payment', paymentId, 'payment');
  }
  
  return payment[0];
}
