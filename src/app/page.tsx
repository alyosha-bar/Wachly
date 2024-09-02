import Image from "next/image";
import styles from "./page.module.css";

import { db } from '@/db';
import { videosTable, videoRatingsTable, videoReviewsTable, usersTable, channelsTable } from "@/db/schema";
import { PostsForm } from "./PostsForm";
import { eq } from 'drizzle-orm'

import {index} from "@/algolia"; // change the index

// Connect algolia to search the database with a search bar component




export default async function Home() {

  // const videos = await db.select().from(videosTable).execute();
  // console.log("Fetched videos:", videos);
  // console.log("Putting Videos into Algolia");




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

  // const addToIndex = async () => {

  //   // add to index only if unique ID

  // }

  // index.saveObjects(posts, {
  //   autoGenerateObjectIDIfNotExist: true
  // });



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
