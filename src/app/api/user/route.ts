// app/api/insert-user/route.ts

// import { db, users } from '@/drizzle/db'; // Import Drizzle ORM and schema
import { db } from '@/db'; // Import Drizzle ORM and schema
import { usersTable as users } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    const { userId } = await req.json(); // Get the userId from the request body
  
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }
  
    // Check if the user already exists in the database
    const userExists = db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .get(); // Use Drizzle to check for existing user
  
    // If user already exists, return early
    if (userExists === null) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 200 });
    }
  
    // Insert the new user into the database
    await db.insert(users).values({
        id: userId, // Use the Clerk user ID
        username: "test user",
        email: "testemail@gmail.com"
        // You can also add more fields here if necessary
    });
  
    return new Response(JSON.stringify({ message: 'User inserted successfully' }), { status: 201 });
  }
