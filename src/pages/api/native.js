
export const GET = async ({ request }) => {
  // Simulate database latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return new Response(JSON.stringify({
    message: "Data fetched from Astro Native Endpoint",
    timestamp: new Date().toISOString(),
    framework: "Astro Native",
    status: 200
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
