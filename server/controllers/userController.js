import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered succesfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
    }
    res.send("Your visit is booked succesfully");
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).send({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
    }

    res.end("Booking cancelled succesfully");
  } catch (err) {
    throw new Error(err.message);
  }
});

export const favBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { residencyId } = req.params;

  console.log("favbookings", email);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.favResidenciesID.includes(residencyId)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== residencyId),
          },
        },
      });

      res.send({ message: "Removed from favourites", user: updatedUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: residencyId,
          },
        },
      });

      res.send({ message: "Added to favourites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favResidency = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    res.status(200).send(favResidency);
  } catch (err) {
    throw new Error(err.message);
  }
});
