import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
});

export const adminFormValidationSchema = yup.object().shape({
  email: yup.string().email("Not a Valid Email").required("Email required"),
  password: yup.string().required("Password required"),
  name: yup
    .string()
    .required("First Name Required")
    .max(12, "Maximum 12 Characters"),
});

export const onboardValidationSchema = yup.object().shape({
  assetName: yup.string().required("Asset Name Required"),
  warranty: yup.number().typeError("Must be a number in months"),
});
