import { RegisterUser } from "../src/controllers/userController";
import { User } from "../src/models/User";

describe("userController", () => {
  describe("RegisterUser", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should create a new user and return user data for valid input", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const user = {
        _id: "1",
        name: "Test User",
        email: "test@example.com",
      };

      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(User, "create").mockResolvedValue(user);

      await RegisterUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(User.create).toHaveBeenCalledWith({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      expect(res.json).toHaveBeenCalledWith({
        user_id: user._id,
        name: user.name,
        email: user.email,
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should throw an error and return an error response for an existing user", async () => {
      const req = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const user = {
        _id: "1",
        name: "Test User",
        email: "test@example.com",
      };

      jest.spyOn(User, "findOne").mockResolvedValue(user);

      try {
        await RegisterUser(req, res);
      } catch (error) {
        expect(error.message).toBe("User already exists");
        expect(res.json).toHaveBeenCalledWith({
          message: "User already exists",
        });
        expect(res.status).toHaveBeenCalledWith(404);
      }
    });

    it("should throw an error and return an error response for invalid input", async () => {
      const req = { body: { name: "Test User", email: "test@example.com" } };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      try {
        await RegisterUser(req, res);
      } catch (error) {
        expect(error.message).toBe("invalid user data");
        expect(res.json).toHaveBeenCalledWith({ message: "invalid user data" });
        expect(res.status).toHaveBeenCalledWith(400);
      }
    });
  });
});
