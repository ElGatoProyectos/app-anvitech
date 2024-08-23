import { base_backend } from "@/context/environment";
import { authService } from "@/lib/core/service/auth.service";
import { userService } from "@/lib/core/service/user.service";
import axios from "axios";

export async function authenticate(data: {
  username: string;
  password: string;
}) {
  // const res = await userService.findAll();
  // console.log(res);
  // const response = await authService.login(data);

  // console.log(response);
  try {
    const response: any = await axios.post(`${base_backend}/api/auth`, data);

    const user = {
      id: response.data.id,
      role: response.data.role,
      username: response.data.username,
    };

    return user;
  } catch (error) {
    return null;
  }
}
