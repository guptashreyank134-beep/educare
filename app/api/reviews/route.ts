/** @format */

import { NextResponse } from "next/server";

// Target Place ID for Dr. Shreyank Educare
const PLACE_ID = "ChIJ3-It98Z3hlQRr-fAlRG3C0E";

interface GooglePlacesReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "GOOGLE_PLACES_API_KEY environment variable is not defined.",
        hint: "Please set GOOGLE_PLACES_API_KEY in your .env.local file.",
      },
      { status: 500 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || `Google Places API returned status: ${data.status}` },
        { status: 400 }
      );
    }

    const reviews = (data.result.reviews || []).map((r: GooglePlacesReview) => ({
      author: r.author_name || "Anonymous",
      avatar: r.profile_photo_url || null,
      rating: r.rating || 5,
      relativeTime: r.relative_time_description || "",
      text: r.text || "",
    }));

    return NextResponse.json({
      reviews,
      rating: data.result.rating || 5.0,
      totalReviews: data.result.user_ratings_total || reviews.length,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Failed to fetch reviews from Google Places API", details: errorMessage },
      { status: 500 }
    );
  }
}
