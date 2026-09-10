import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import type { RumDatabase, RumStatement } from "../../workers/rum/store.ts";

export function createRumDatabase(atMs: number) {
  const sqlite = new DatabaseSync(":memory:");
  const clock = { atMs };
  sqlite.function("unixepoch", () => Math.floor(clock.atMs / 1000));
  sqlite.exec(
    readFileSync(
      new URL("../../workers/rum/schema.sql", import.meta.url),
      "utf8",
    ),
  );
  class Statement implements RumStatement {
    constructor(
      private sql: string,
      private values: (string | number | null)[] = [],
    ) {}
    bind(...values: (string | number | null)[]) {
      return new Statement(this.sql, values);
    }
    async first<T>() {
      return (
        (sqlite.prepare(this.sql).get(...this.values) as T | undefined) ?? null
      );
    }
    async run() {
      return {
        meta: {
          changes: Number(sqlite.prepare(this.sql).run(...this.values).changes),
        },
      };
    }
  }
  const db: RumDatabase = {
    prepare: (sql) => new Statement(sql),
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec("COMMIT");
        return results;
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }
    },
  };
  return { db, clock, sqlite };
}
