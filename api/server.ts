import express, { type Request, type Response } from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma";
import { validate, v4 } from "uuid";

const app = express();
const prisma = new PrismaClient();

const PORT = 4000;
const ONE_MINUTE = 1000 * 60;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bob's Corn API");
});

app.post("/buy-corn", async (req: Request, res: Response) => {
  try {
    // console.log("body", req.body);
    const { clientId } = req.body ?? {};
    let id = v4();

    if (validate(clientId)) {
      id = clientId;
    }

    // Buscar ultima compra del cliente
    const lastPurchase = await prisma.cornPurchase.findFirst({
      where: { clientId: id },
      orderBy: { createdAt: "desc" },
    });

    if (
      lastPurchase &&
      lastPurchase.createdAt > new Date(Date.now() - ONE_MINUTE)
    ) {
      return res.status(429).json({
        success: false,
        error: "Too many requests",
        message: "You can only buy corn once a minute",
      });
    }

    const cornPurchase = await prisma.cornPurchase.create({
      data: {
        client: {
          connectOrCreate: {
            where: { id },
            create: {
              id,
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: cornPurchase,
      message: "Corn bought successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server error",
      message: "Something went wrong",
    });
  }
});

app.get("/corn-purchases", async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId || !validate(clientId as string)) {
      res.status(200).json({
        success: false,
        data: [],
      });
    }

    const purchases = await prisma.cornPurchase.findMany({
      where: { clientId: clientId as string },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server error",
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
