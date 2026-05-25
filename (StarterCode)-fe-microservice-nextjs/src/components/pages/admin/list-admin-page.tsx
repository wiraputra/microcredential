"use client";
import { useState } from "react";
import UserCard from "@/components/fragments/card/admin/user-card";
import Button from "@/components/ui/button/button";
import TextInput from "@/components/ui/input/text-input";
import SpinnerLoading from "@/components/ui/loading/spinner-loading";
import ErrorText from "@/components/ui/text/error-text";
import { useGetUserList } from "@/features/admin/use-get-user-list";
import Link from "next/link";
import Pagination from "@/components/ui/pagination/pagination";

type TFilterRole = "ALL" | "ADMIN" | "CUSTOMER" | "DRIVER";

export default function ListUserPage() {
  const { data, isLoading, error } = useGetUserList();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<TFilterRole>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Reactive filtering logic
  const filteredUsers = data?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    const matchesRole = filterRole === "ALL" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / pageSize) : 0;
  const paginatedUsers = filteredUsers
    ? filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const SearchIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <div className="space-y-6 w-full px-2 py-4">
      {/* Top Section */}
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <div>
          <h2 className="font-bold text-2xl text-gray-800 tracking-tight">List User</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage and provision system users</p>
        </div>
        <Link href="/admin/create">
          <Button className="bg-blue-500 hover:bg-blue-600 px-5 py-2.5">
            + Create User
          </Button>
        </Link>
      </div>

      {/* Search and Filters Card */}
      {!isLoading && !error && data && (
        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-4">
          {/* Search Input */}
          <TextInput
            name="search"
            placeholder="Search by name, email, or phone number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            icon={SearchIcon}
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {(["ALL", "ADMIN", "CUSTOMER", "DRIVER"] as TFilterRole[]).map((role) => (
              <button
                key={role}
                onClick={() => {
                  setFilterRole(role);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition duration-200 cursor-pointer border ${
                  filterRole === role
                    ? "bg-slate-800 border-slate-800 text-white shadow-xs"
                    : "bg-white border-gray-250 text-gray-650 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {role === "ALL" && "All Roles"}
                {role === "ADMIN" && "Admins Only"}
                {role === "CUSTOMER" && "Customers Only"}
                {role === "DRIVER" && "Drivers Only"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main List Area */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <SpinnerLoading />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <ErrorText message={error.message} />
        </div>
      )}

      {!isLoading && !error && paginatedUsers.length === 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 border-dashed text-center py-16 px-4">
          <svg
            className="w-12 h-12 text-gray-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 font-semibold">No users found</p>
          <p className="text-gray-400 text-xs mt-1">Try adapting your search parameters or role filter.</p>
        </div>
      )}

      {!isLoading && !error && paginatedUsers.length > 0 && (
        <div className="space-y-3">
          {paginatedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {!isLoading && !error && filteredUsers && filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
