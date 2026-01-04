import * as Sentry from "@sentry/node";
// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: "https://8ae127585a9c6dd0794a498543a7fb04@o4509843307233280.ingest.us.sentry.io/4509843323092992",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  integrations:[Sentry.mongooseIntegration()]
});