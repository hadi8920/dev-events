import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Event from "@/database/event.model"

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { slug } = await params;

    // Validate slug presence
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Validate slug format — only lowercase letters, numbers, hyphens
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { message: "Invalid slug format" },
        { status: 400 }
      );
    }

    // Query event by slug, exclude internal Mongoose fields
    const event = await Event.findOne({ slug }).select("-__v").lean();

    if (!event) {
      return NextResponse.json(
        { message: `No event found with slug: "${slug}"` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (e) {
    console.error("[GET /api/events/:slug]", e);
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}