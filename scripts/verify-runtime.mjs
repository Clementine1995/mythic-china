import { realpathSync } from "node:fs";
import process from "node:process";

const expectedPath = realpathSync.native(
  "D:\\Program Files\\nvm\\v24.16.0\\node.exe",
);
const actualPath = realpathSync.native(process.execPath);
const expectedVersion = "v24.16.0";

if (
  actualPath.toLowerCase() !== expectedPath.toLowerCase() ||
  process.version !== expectedVersion
) {
  throw new Error(
    `Mythic China requires ${expectedPath} ${expectedVersion}; received ${actualPath} ${process.version}.`,
  );
}
