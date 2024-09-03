'use client'

import Image from "next/image";
import SearchBar from "@/SearchBar";

import { useState } from "react";

import liteclient from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { index } from "@/algolia";
import Link from "next/link";


// Define the shape of the video object for the results STATE
interface Video {
  videoId: string;
  description: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
}

function Hit({ hit }: { hit: any }) {
    return (
        <Link href={'/'}>
            <h2> {hit.title} </h2>
            <img src={hit.thumbnailUrl} alt="Thumbnail of the video." />
            <p> {hit.description} </p>
        </Link>
    )
}


export default function Main() {

  //HOME
  const [results, setResults] = useState<Video[]>([]);

    const searchClient = liteclient(process.env.ALGOLIA_APP_ID as string , process.env.ALGOLIA_ADMIN_API_ID as string);    


  //search bar for yt videos
  const handleSearch = async (query: string) => {
    console.log("Search query:", query);
    // Perform the search logic here


    console.log("Searching API to help with the results")
    console.log(query.length)

    const getSearchResults = async () => {
        // run a search on the api to supplement the results
        const videos = await searchAPI(query); // --> API search needs to ADD to Aloglia index
        console.log(videos);
    

        // add to Algolia Index
        console.log("Adding to Algolia Index")
        // index.saveObjects(videos, {
        //     autoGenerateObjectIDIfNotExist: true
        // });
        console.log("Adding COMPLETE to Algolia Index")


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
        <InstantSearch searchClient={searchClient} indexName={index.indexName} >
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>

      {/* <div className="grid grid-cols-3 w-5/6 gap-6 mx-auto mt-8">
        {results && results.map((result) => (
          <div key={result.videoId} className="w-4/6 max-w-screen-md bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img 
              src={result.thumbnailUrl} 
              width={300}
              height={169} // Maintain the aspect ratio of 16:9
              alt={result.title}
              className="w-full"
            />
            <div className="p-4">
              <div className="font-semibold text-lg text-gray-800 mb-2">{result.title}</div>
              <div className="text-gray-600 flex justify-between">
                <a href={`https://www.youtube.com/@${result.channelTitle}`} className="text-blue-500 hover:underline">
                  {result.channelTitle}
                </a>
                <div className="text-md"> 5 ⭐</div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
