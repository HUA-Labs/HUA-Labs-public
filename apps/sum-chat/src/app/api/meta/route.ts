export async function GET() {
  return Response.json({
    api_version: "1.0",
    status: "stable",
    last_updated: "2025-05-19"
  });
} 