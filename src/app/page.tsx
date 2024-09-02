import Image from "next/image";
import styles from "./page.module.css";

import { db } from '@/db';
import { videosTable, videoRatingsTable, videoReviewsTable, usersTable, channelsTable } from "@/db/schema";
import { PostsForm } from "./PostsForm";
import { eq } from 'drizzle-orm'

import { index } from "@/algolia"; // change the index


// Mimic youtube API usage with the search bar
// Save the search results in the database

// Connect algolia index to search the database with a search bar component




export default async function Home() {

  // Example query
  const videos = await db.select({
    videoId: videosTable.videoId,
    title: videosTable.title,
    thumbnailUrl: videosTable.thumbnailUrl,
    channelTitle: channelsTable.channelTitle,
  })
  .from(videosTable)
  .leftJoin(channelsTable, eq(videosTable.channelId, channelsTable.id)).all();

  console.log(videos);


  return (
    <div>
      <h1> Welcome! </h1>

      {videos.map((video) => (
        <div key={video.videoId}> 
          <h2>{video.title}</h2>
          <img
            src={video.thumbnailUrl}
            alt="video thumbnail"
            width={300}
            height={200}
          />
          <h3> {video.channelTitle} </h3>
        </div>
      ))}
    </div>
  );
}
