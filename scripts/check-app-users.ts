// scripts/check-app-users.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;

async function main() {
  const connection = postgres(connectionString, { max: 1 });
  const db = drizzle(connection);

  console.log('Checking app_users table structure...\n');
  const appUsersColumns = await db.execute(sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'app_users'
    ORDER BY ordinal_position
  `);

  console.log('App Users table columns:');
  appUsersColumns.forEach((col: any) => {
    console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
  });
  
  await connection.end();
}

main().catch((err) => {
  console.error('Check failed:', err);
  process.exit(1);
});
// test push
