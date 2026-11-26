import { describe, expect, it } from "vitest";
import { checksum, planMigrations } from "@/server/db/migrations";

const a = { name: "001_initial.sql", sql: "create table a (id int);" };
const b = { name: "002_more.sql", sql: "create table b (id int);" };

describe("planMigrations", () => {
  it("returns every file in order on an empty database", () => {
    expect(planMigrations([b, a], []).map((m) => m.name)).toEqual(["001_initial.sql", "002_more.sql"]);
  });

  it("skips applied migrations whose checksum matches", () => {
    const pending = planMigrations([a, b], [{ name: a.name, checksum: checksum(a.sql) }]);
    expect(pending.map((m) => m.name)).toEqual(["002_more.sql"]);
  });

  it("refuses an applied migration that was edited", () => {
    expect(() => planMigrations([{ ...a, sql: "drop table a;" }], [{ name: a.name, checksum: checksum(a.sql) }])).toThrow(
      /modificada/,
    );
  });

  it("refuses an applied migration that disappeared", () => {
    expect(() => planMigrations([b], [{ name: a.name, checksum: checksum(a.sql) }])).toThrow(/ya no existe/);
  });

  it("refuses a new file numbered before the last applied one", () => {
    const late = { name: "001_late.sql", sql: "select 1;" };
    expect(() => planMigrations([a, b, late], [{ name: b.name, checksum: checksum(b.sql) }, { name: a.name, checksum: checksum(a.sql) }])).toThrow();
  });

  it("rejects bad names and duplicate numbers", () => {
    expect(() => planMigrations([{ name: "initial.sql", sql: "" }], [])).toThrow(/inválido/);
    expect(() => planMigrations([a, { name: "001_other.sql", sql: "" }], [])).toThrow(/duplicado/);
  });
});
