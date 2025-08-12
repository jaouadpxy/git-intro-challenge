import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import DestinationCard, { Destination } from '../components/ui/DestinationCard';

// This is a server component, so we can fetch data directly on the server.
async function getFeaturedDestinations(): Promise<Destination[]> {
  // In a real Next.js app, process.cwd() points to the root of the project.
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'featuredDestinations.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("Could not read featured destinations data:", error);
    return []; // Return empty array on error
  }
}

export default async function HomePage() {
  const destinations = await getFeaturedDestinations();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">
        Welcome to DiscoverTriply (Next.js Version)
      </h1>

      <h2 className="text-2xl font-bold mb-6">Featured Destinations</h2>

      {destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Could not load featured destinations.
        </p>
      )}
    </div>
  );
}
