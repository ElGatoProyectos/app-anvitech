import prisma from "@/lib/prisma";
import { httpResponse } from "./response.service";
import { errorService } from "./errors.service";
import { createUserDTO, updateUserDTO } from "../schemas/user.dto";

import bcrypt from "bcrypt";

class UserService {
  async findAll() {
    try {
      const users = await prisma.user.findMany();
      return httpResponse.http200("Users found", users);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (!user) return httpResponse.http400("User not found");
      return httpResponse.http200("User found", user);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async createUser(data: any) {
    try {
      createUserDTO.parse(data);
      await prisma.user.create(data);
      return httpResponse.http201("User created ok!");
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async updateUser(data: any, userId: number) {
    try {
      updateUserDTO.parse(data);
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data,
      });
      return httpResponse.http200("User updated ok!", updatedUser);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      const updatedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return httpResponse.http200("User updated ok!", updatedUser);
    } catch (error) {
      return errorService.handleErrorSchema(error);
    }
  }

  async createAdmin(data: any) {
    try {
      const password = bcrypt.hashSync(data.dni, 11);

      const dataSet = {
        full_name: data.full_name,
        dni: data.dni,
        email: data.email,
        password,
        username: data.dni,
        enabled: true,
        role: "admin",
      };

      await prisma.user.create({ data: dataSet });
      return httpResponse.http201("Admin created");
    } catch (error) {
      console.log(error);
      return errorService.handleErrorSchema(error);
    }
  }
}

export const userService = new UserService();
