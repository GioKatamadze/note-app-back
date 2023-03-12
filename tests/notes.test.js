import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import { addNote } from "../src/controllers/noteController";

describe("Note CRUD operation", () => {
  let connection;
  let db;
  const connectionUrl =
    "mongodb+srv://GioKatamadze:Tamusi1003@cluster0.wv7r0tt.mongodb.net/note-app";

  beforeAll(async () => {
    connection = await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("addNote function", () => {
    it("should create a new note", async () => {
      const req = {
        body: {
          title: "Test Note",
          content: "This is a test note.",
          user_id: "640d28db0a111f9fac05e395",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      await addNote(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Note",
          content: "This is a test note.",
          user_id: "640d28db0a111f9fac05e395",
        })
      );
    });
  });
});
