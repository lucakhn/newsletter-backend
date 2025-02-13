import { Hono } from "hono";
import { Subscriber } from "../models/subscribers";

export const subscriber = new Hono();

subscriber.get("/", async (c) => {
  const subscribers = await Subscriber.findAll();

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

subscriber.get("/:id", async (c) => {
  const id = c.req.param("id");
  const subscriber = await Subscriber.findSubscriber(id);

  return c.json(
    {
      data: subscriber,
    },
    200
  );
});

subscriber.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updatedSubscriber = await Subscriber.updateSubscriber(id, body);

    if (updatedSubscriber) {
      return c.json(
        { message: "Subscriber updated succesfully", data: updatedSubscriber },
        200
      );
    } else {
      return c.text("Subscriber not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});

subscriber.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const createSubscriber = await Subscriber.createSubscriber(body);

    return c.json(
      {
        message: "New Subscriber created succesfully",
        data: createSubscriber,
      },
      200
    );
  } catch (error) {
    console.error("Error create new subscriber:", error);
    return c.text("Internal Server Error", 500);
  }
});

subscriber.get("/emails/", async (c) => {
  const emails = await Subscriber.findAllEmail();

  return c.json(
    {
      data: emails,
    },
    200
  );
});

// delete subscriber by id
subscriber.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const deletedSubscriber = await Subscriber.deleteSubscriber(id);
    if (deletedSubscriber) {
      return c.json(
        { message: "Subscriber deleted succesfully", data: deletedSubscriber },
        200
      );
    } else {
      return c.text("Subscriber not found", 404);
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return c.text("Internal server error", 500);
  }
});
