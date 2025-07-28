import React from "react";
import LeftSideOptimized from "../home/LeftSideOptimized";
import { Card } from "../ui/card";
import { Search, Grid, Heart, MessageCircle } from "lucide-react";

export default function Explore() {
  // Mock data for explore posts
  const explorePosts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/300/300?random=${i + 1}`,
    likes: Math.floor(Math.random() * 1000) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    isVideo: i % 4 === 0, // Every 4th post is a video
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LeftSideOptimized />

      <main className="ml-16 xl:ml-64 transition-all duration-300">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Explore
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover new content and creators
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, users, hashtags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {explorePosts.map((post) => (
              <Card
                key={post.id}
                className="relative aspect-square group cursor-pointer overflow-hidden border-0 rounded-none md:rounded-lg"
              >
                <img
                  src={post.image}
                  alt={`Explore post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Video indicator */}
                {post.isVideo && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-black bg-opacity-50 rounded-full p-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
