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
  return res.status(200).json({ msg: "User not found" });
};

export const createNewUser = async (req: Request, res: Response): Promise<Response> => {
  const newUser = getRepository(User).create(req.body);
  const results = await getRepository(User).save(newUser);
  return res.status(201).json(results);
};

export const updateUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = await getRepository(User).findOne(id);
  if (user) {
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    const result = await getRepository(User).save(user);
    return res.status(200).json(result);
  }
  return res.status(200).json({ msg: "User not found" });
};

export const deleteUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const user = await getRepository(User).findOne(id);
  if (user) {
    const result = await getRepository(User).remove(user);
    return res.status(200).json(result);
  }
  return res.status(200).json({ msg: "User not found" });
};
