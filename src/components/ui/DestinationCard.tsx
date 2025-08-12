import React from 'react';
import Image from 'next/image'; // Assuming Next.js Image component for optimization

// Define the type for the component props based on the JSON structure
export type Destination = {
  slug: string;
  name: string;
  type: 'city' | 'country';
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  teaser: string;
};

type DestinationCardProps = {
  destination: Destination;
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { slug, name, image, badge, rating, reviews, teaser } = destination;

  // Helper to generate star ratings
  const renderStars = () => {
    const fullStars = Math.round(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <a
      href={`/explore/${slug}`}
      className="group block rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
    >
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        {badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {badge}
          </div>
        )}
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          {renderStars()}
          <span className="ml-2">{rating.toFixed(1)}</span>
          <span className="ml-1">({reviews.toLocaleString()})</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">{teaser}</p>
        <span className="font-semibold text-blue-600 group-hover:underline">
          Explore Destination →
        </span>
      </div>
    </a>
  );
};

export default DestinationCard;
