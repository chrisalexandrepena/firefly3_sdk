import { config } from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve(__dirname, "../../.env");
if (process.env.DATABASE_URL === undefined && fs.existsSync(envPath)) {
    config({ path: envPath });
}
jest.setTimeout(30000);
