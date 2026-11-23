import { redirect } from "next/navigation";

/** Unknown routes send visitors home instead of a 404 page. */
export default function NotFound() {
  redirect("/");
}
