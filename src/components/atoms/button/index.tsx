"use client";
import { useRouter } from "next/navigation";

export default function Button(props: {
  children: string;
  className?: string;
  isSubmit?: boolean;
  href?: string;
  isFullWidth?: boolean;
  color?: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const color = `bg-${props.color}-600`;

  return (
    <div>
      <button
        onClick={
          props.href ? () => router.push(`${props.href}`) : props.onClick
        }
        type={props.isSubmit ? "submit" : "button"}
        className={`${
          props.isFullWidth ? "w-full" : ""
        } text-white ${color} hover:shadow-md bg-green-600 hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 m-1 text-center ${
          props.className
        }`}
      >
        {props.children}
      </button>
    </div>
  );
}
