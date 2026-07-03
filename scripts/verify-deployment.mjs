const deploymentUrl = process.env.DEPLOYMENT_URL;

if (!deploymentUrl) {
  throw new Error("DEPLOYMENT_URL is required");
}

const healthUrl = new URL("/api/health", deploymentUrl);
const response = await fetch(healthUrl, {
  headers: {
    "User-Agent": "gym-checking-deployment-verifier/1.0",
  },
});

const contentType = response.headers.get("content-type") ?? "";
if (!contentType.includes("application/json")) {
  throw new Error(`Health check returned ${contentType || "no content type"}`);
}

const body = await response.json();

if (!response.ok || body.status !== "ok") {
  throw new Error(
    `Deployment is not healthy: HTTP ${response.status}, status ${body.status ?? "missing"}`,
  );
}

console.log(`Deployment verified: ${healthUrl.origin}`);
