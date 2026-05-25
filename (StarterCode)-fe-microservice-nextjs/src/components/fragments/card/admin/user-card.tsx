import Button from "@/components/ui/button/button";
import Link from "next/link";
import { useDeleteUser } from "@/features/admin/use-delete-user";
import { IUser } from "@/types/user.types";

interface IUserCardProps {
  user: IUser;
}

export default function UserCard({ user }: IUserCardProps) {
  const { handleDelete, isLoading } = useDeleteUser();

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase tracking-wider">
            Admin
          </span>
        );
      case "DRIVER":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 uppercase tracking-wider">
            Driver
          </span>
        );
      case "CUSTOMER":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
            Customer
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gray-50 text-gray-700 border border-gray-200/60 uppercase tracking-wider">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-md rounded-2xl p-5 transition-all duration-300 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        {/* Avatar with initials */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-700 select-none tracking-wider">
          {getInitials(user.name)}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-gray-800 text-base">{user.name}</h4>
            {getRoleBadge(user.role)}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            ✉ {user.email} <span className="text-gray-300 px-1">|</span> 📞 {user.phone}
          </p>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <Link href={`/admin/user/${user.id}`}>
          <Button variant="outline" className="text-xs px-3 py-1.5 h-8">
            Detail
          </Button>
        </Link>
        <Link href={`/admin/edit/${user.id}`}>
          <Button variant="outline" className="text-xs px-3 py-1.5 h-8 border-emerald-250 text-emerald-600 hover:bg-emerald-50/30 hover:border-emerald-350 hover:text-emerald-700">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          className="text-xs px-3 py-1.5 h-8"
          onClick={() => confirm("Are you sure?") && handleDelete(user.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}