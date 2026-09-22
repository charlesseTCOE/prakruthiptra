import { redirect } from "next/navigation";

export default function LegacyResumesRedirect() {
  redirect("/apply");
}
