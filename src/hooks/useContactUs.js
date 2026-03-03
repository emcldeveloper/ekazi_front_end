import { useMutation } from "@tanstack/react-query";
import { contactUsApi } from "../services/contact-us.service";

export const useContactUs = () => {
  return useMutation({
    mutationFn: contactUsApi,
  });
};
