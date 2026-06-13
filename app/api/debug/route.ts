import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function GET() {
  const results: Record<string, unknown> = {};

  results.sanity_write_token_set = !!process.env.SANITY_WRITE_TOKEN;

  try {
    const authors = await writeClient.fetch('*[_type == "author"][0..2]{_id, name, username}');
    results.sanity_query_ok = true;
    results.authors = authors;
  } catch (e) {
    results.sanity_query_ok = false;
    results.sanity_error = e instanceof Error ? e.message : String(e);
  }

  results.env_keys = Object.keys(process.env).filter(k => k.startsWith("AUTH_") || k.startsWith("NEXT") || k.startsWith("SANITY") || k === "AUTH_SECRET").sort();

  return NextResponse.json(results);
}
