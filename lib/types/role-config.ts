// role-config.ts
import type { RoleConfig } from "./types";

export const ROLE_CONFIG: Record<string, RoleConfig> = {
  parent: {
    role: "parent",
    title: "Parents",
    description: "Help us shape Clubhouse Baseball—quick questions, no spam.",
    submitText: "Request info",
    fields: [
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      {
        name: "priority",
        label: "What matters most?",
        type: "multiselect",
        options: [
          { label: "Cost & Fees", value: "cost_fees" },
          { label: "Organization Reputation", value: "organization_reputation" },
          { label: "Communication", value: "communication" },
          { label: "Tryout Dates & Process", value: "tryout_dates_process" },
          { label: "Playing Time Expectation", value: "playing_time_expectation" },
        ],
      },
    ],
  },

  org: {
    role: "org",
    title: "Organization Coaches",
    description: "Tell us what slows you down—we’re in discovery mode.",
    submitText: "Get in touch",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Coach name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "coach@email.com" },
      { name: "orgName", label: "Organization", type: "text", placeholder: "Org / team name" },
      { name: "pain", label: "Biggest headache right now", type: "textarea", placeholder: "Optional" },
    ],
  },

  director: {
    role: "director",
    title: "Tournament Directors",
    description: "We’d love to learn how you run events and what’s broken today.",
    submitText: "Let’s talk",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "orgName", label: "Organization", type: "text", placeholder: "Tournament / organization name" },
      {
        name: "volume",
        label: "Tournaments per year",
        type: "select",
        options: [
          { label: "1–2", value: "1-2" },
          { label: "3–5", value: "3-5" },
          { label: "6+", value: "6plus" },
        ],
      },
      { name: "pain", label: "What’s currently hardest?", type: "textarea", placeholder: "Optional" },
    ],
  },
};
