// ESM Sentry setup
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Initialize Sentry
Sentry.init({
  dsn: "https://8ae127585a9c6dd0794a498543a7fb04@o4509843307233280.ingest.us.sentry.io/4509843323092992",

  integrations: [
    nodeProfilingIntegration(), // enable CPU profiling
    Sentry.mongoIntegration(),  // MongoDB spans (perf traces)
  ],

  // Performance & profiling sampling. Start with low values in prod.
  //tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,

  // Collect default PII if you need it
  sendDefaultPii: true,
});

export { Sentry };
