import { Router } from "express";
import {
  GetAllVerifiedDoctors,
  GetMyAppointments,
  GetVerifiedDoctorsBySpecialization,
  GoogleLogin,
  UpdateProfilePicture,
  UserLogin,
  UserRegister,
} from "../../controllers/userControllers.js";
import verifyToken from "../../middlewares/authMiddleware.js";
import uploads from "../../config/multer.js";

const UserAuthRouter = Router();

UserAuthRouter.post("/user/register", UserRegister);
UserAuthRouter.post("/user/login", UserLogin);
UserAuthRouter.post("/google/login", GoogleLogin);
UserAuthRouter.get("/user/verified/doctors", GetAllVerifiedDoctors);
UserAuthRouter.get(
  "/user/verified/doctors/:specialization",
  GetVerifiedDoctorsBySpecialization,
);
UserAuthRouter.get("/user/appointments", verifyToken, GetMyAppointments);
UserAuthRouter.put("/user/profile-picture", verifyToken, uploads.single("profilePic"), UpdateProfilePicture);

export default UserAuthRouter;
