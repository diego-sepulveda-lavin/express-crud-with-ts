import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await getRepository(User).find();
  return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = await getRepository(User).findOne(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ msg: `User id ${id} not found` });
};

export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
  const newUser = req.body;
  if (!newUser.firstname) {
    return res.status(400).json({ msg: `You must provide a firstname field` });
  }
  if (!newUser.lastname) {
    return res.status(400).json({ msg: `You must provide a lastname field` });
  }
  const result = await getRepository(User).save(newUser);
  return res.status(201).json(result);
};

export const updateUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedUser = req.body;
  if (!updatedUser.firstname) {
    return res.status(400).json({ msg: `You must provide a firstname field` });
  }
  if (!updatedUser.lastname) {
    return res.status(400).json({ msg: `You must provide a lastname field` });
  }
  const userToUpdate = await getRepository(User).findOne(id);
  if (userToUpdate) {
    userToUpdate.firstname = updatedUser.firstname;
    userToUpdate.lastname = updatedUser.lastname;
    const result = await getRepository(User).save(userToUpdate);
    return res.status(200).json(result);
  }
  return res.status(404).json({ msg: `User id ${id} not found` });
};

export const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = await getRepository(User).findOne(id);
  if (user) {
    const result = await getRepository(User).remove(user);
    return res.status(200).json(result);
  }
  return res.status(404).json({ msg: `User id ${id} not found` });
};
