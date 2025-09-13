import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-gray-100 gap-10 h-screen">
      <Link className="text-4xl" href="/login">Login</Link>
      <Link className="text-4xl" href="/signup">Signup</Link>
    </div>
  );
}
