'use client'

import Image from "next/image";
import SearchBar from "@/SearchBar";

import { useState } from "react";

import liteclient from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { index } from "@/algolia";
import Link from "next/link";

import './home.css'

// Define the shape of the video object for the results STATE
interface Video {
  videoId: string;
  description: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
}



export default function Main() {

  //HOME
  const [results, setResults] = useState<Video[]>([]);  

  //search bar for yt videos
  const handleSearch = async (query: string) => {
    console.log("Search query:", query);
    // Perform the search logic here


    // search the database with ALL searchable attributes
    console.log("Searching Database")
    const dbResults = await searchDB(query);
    console.log(dbResults);


    console.log("Searching API to help with the results")
    console.log(query.length)

    const getSearchResults = async () => {
        // run a search on the api to supplement the results
        const videos = await searchAPI(query); // --> API search needs to ADD to Aloglia index
        console.log(videos);
        setResults(videos);
    }

    
    getSearchResults();

  };

  const searchAPI = async (q : string) => {
    const response = await 
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&q=${q}&part=snippet&type=video&order=relevance&maxResults=8`);
      const data = await response.json();
      // console.log(data);

      const videos = [];

      for (let item of data.items) {
        const video = {
          videoId: item.id.videoId,
          description: item.snippet.description,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle
        }

      videos.push(video);
      }

    console.log("API search results: ")
      return videos;

  }

  const searchDB = async (q : string) => {
    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query: q})
    });
    const data = await response.json();
    // console.log(data);

    if (data.message.length == 0) {
      console.log("Not found in database: ")
      return null;
    } 

    return data;
  }

  const addVideos = async (videos : Video[]) => {

    console.log("This is passed into the addVideo route: ")
    console.log(videos)

    // call api/addVideo to insert data
    const response = await fetch(`/api/addVideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({videos}) 
    });
    const data = await response.json(); // error for some reason
    console.log(data)

  }

  // AMBITIOUS - if there are not that many results from the database - supplement with the api -- SORTA DOING IT


  // FIX - ensure a system that even though search results are found in the database, that search term is applied to the api as well. ✅


  // change the video cards display to be able to manage results from both api and database ✅
  // change the structure of the results STATE to match the database &&  ✅
  // ensure type safety for the results STATE ✅
  return (
    <>

        
        <SearchBar onSearch={handleSearch} />

      <div className="results">
        {results && results.map((result) => (
          <Link href={`/videos/${result.videoId}`} key={result.videoId} className="result">
            <img 
              src={result.thumbnailUrl} 
              width={300}
              height={169} // Maintain the aspect ratio of 16:9
              alt={result.title}
              className="thumbnail"
            />
            <div className="text-area">
              <div className="font-semibold text-lg text-gray-800 mb-2">{result.title}</div>
              <div className="text-gray-600 flex justify-between">
                <div className="text-blue-500 hover:underline">
                  {result.channelTitle}
                </div>
                <div className="text-md"> 5 ⭐</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
