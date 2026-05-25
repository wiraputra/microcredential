import { useRouter } from "next/navigation";
import Button from "./button";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button className="bg-red-500 text-xs" onClick={() => router.push("/login")}>
      Logout
    </Button>
  );
}
