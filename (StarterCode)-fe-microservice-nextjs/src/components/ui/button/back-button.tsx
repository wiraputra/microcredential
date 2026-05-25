import { useRouter } from "next/navigation";
import Button from "./button";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button className="bg-gray-500 text-xs" onClick={() => router.back()}>
            Back
        </Button>
    )
}  