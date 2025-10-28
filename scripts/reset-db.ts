// scripts/reset-db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;

async function main() {
  const connection = postgres(connectionString, { max: 1 });
  const db = drizzle(connection);

  console.log('Dropping all tables...');
  
  // Drop tables in reverse order of dependencies
  const tables = [
    'wallet_transactions',
    'wallets',
    'verifications',
    'reviews',
    'payments',
    'notifications',
    'messages',
    'applications',
    'jobs',
    'workers',
    'employers',
    'app_users' // Changed from 'users'
  ];

  for (const table of tables) {
    try {
      await db.execute(sql.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`));
      console.log(`✓ Dropped table: ${table}`);
    } catch (error) {
      console.log(`⚠ Could not drop ${table}:`, error);
    }
  }

  console.log('\nAll tables dropped! Now run: bun run migrate');
  
  await connection.end();
}

main().catch((err) => {
  console.error('Reset failed:', err);
  process.exit(1);
});
