import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "dice-roller",
  version: "1.0.0",
});

server.registerTool(
  "roll-dice",
  {
    title: "Roll Dice",
    description:
      "Roll a specified number of dice with a given number of sides.",
    inputSchema: {
      sides: z.number().optional().describe("Number of sides on each die."),
    },
    outputSchema: {
      result: z.number().describe("The total result of the dice roll."),
    },
  },
  async ({ sides = 6 }) => {
    const result = Math.floor(Math.random() * sides) + 1;
    return {
      structuredContent: { result },
      content: [
        {
          type: "text",
          text: JSON.stringify({ result }),
        },
      ],
    };
  }
);

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Dice Roller MCP Server is running...");
}

main();
