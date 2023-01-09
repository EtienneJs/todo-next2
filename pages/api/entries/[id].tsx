import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../model";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "id no valido" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getOneEntry(req, res);

    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect;
    return res
      .status(400)
      .json({ message: "no hay entradas con ese ID: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    res.status(200).json(updateEntry!);

    await db.disconnect();
  } catch (error) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: "Bad request" });
  }
};
const getOneEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const oneEntry = await Entry.findById(id);
  await db.disconnect();

  if (!oneEntry) {
    await db.disconnect;
    return res
      .status(400)
      .json({ message: "no hay entradas con ese ID: " + id });
  }
  res.status(200).json(oneEntry);
};
