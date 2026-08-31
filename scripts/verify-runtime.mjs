import process from "node:process";

const [major, minor] = process.versions.node.split(".").map(Number);

if (major !== 24 || !Number.isInteger(minor) || minor < 16) {
  throw new Error(
    `Mythic China requires Node.js >=24.16.0 <25; received ${process.version}.`,
  );
}
