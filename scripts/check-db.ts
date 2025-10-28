// scripts/check-db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;

async function main() {
  const connection = postgres(connectionString, { max: 1 });
  const db = drizzle(connection);

  console.log('Checking database tables...\n');
  
  const result = await db.execute(sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `);

  console.log('Tables in database:');
  result.forEach((row: any) => {
    console.log(`  ✓ ${row.table_name}`);
  });

  console.log('\nChecking users table structure...');
  const usersColumns = await db.execute(sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'users'
    ORDER BY ordinal_position
  `);

  console.log('\nUsers table columns:');
  usersColumns.forEach((col: any) => {
    console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
  });
  
  await connection.end();
}

main().catch((err) => {
  console.error('Check failed:', err);
  process.exit(1);
});
