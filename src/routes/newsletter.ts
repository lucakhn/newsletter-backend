import { Hono } from "hono";
import { Newsletter } from "../models/newsletter";

export const newsletter = new Hono();

newsletter.get("/", async (c) => {
  const newsletters = await Newsletter.findAll();

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const newsletters = await Newsletter.findNewsletter(id);

  return c.json(
    {
      data: newsletters,
    },
    200
  );
});

newsletter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedNewsletter = await Newsletter.updateNewsletter(id, body);

    if (updatedNewsletter) {
      return c.json(
        { message: "Newsletter updated succesfully", data: updatedNewsletter },
        200
      );
    } else {
      return c.text("Newsletter not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating Newsletter:", error);
    return c.text("Internal Server Error", 500);
  }
});

newsletter.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const createNewsletter = await Newsletter.createNewsletter(body);

    return c.json(
      {
        message: "New Newsletter created succesfully",
        data: createNewsletter,
      },
      200
    );
  } catch (error) {
    console.error("Error create new newsletter:", error);
    return c.text("Internal Server Error", 500);
  }
});

newsletter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deleteNewsletter = await Newsletter.deleteNewsletter(id);
    if (deleteNewsletter) {
      return c.json(
        { message: "Newsletter deleted succesfully", data: deleteNewsletter },
        200
      );
    } else {
      return c.text("Newsletter not found", 404);
    }
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return c.text("Internal server error", 500);
  }
});
