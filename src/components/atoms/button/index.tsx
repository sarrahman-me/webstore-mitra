import React from "react";

/**
 * Tombol yang dapat disesuaikan.
 *
 * @param {string} variant - Variasi tombol ("contained", "outlined", "text").
 * @param {string} size - Ukuran tombol ("medium", "small", "large", "full").
 * @param {string} type - Tipe tombol ("button", "reset", "submit").
 * @param {boolean} disabled - Apakah tombol dinonaktifkan.
 * @param {boolean} loading - Apakah tombol sedang dalam status "loading".
 * @param {function} onClick - Fungsi yang dipanggil saat tombol diklik.
 * @param {ReactNode} children - Konten tombol.
 * @param {ReactNode} icon - Ikon yang ditampilkan di samping teks tombol.
 */

interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  size?: "medium" | "small" | "large" | "full";
  type?: "button" | "reset" | "submit";
  color?: "indigo" | "lime" | "red" | "orange" | "green";
  disabled?: true | false;
  loading?: true | false;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = ({
  variant = "contained",
  children,
  size = "medium",
  type,
  disabled,
  loading,
  icon,
  color = "indigo",
  onClick,
}: ButtonProps) => {
  const bgColor = {
    indigo: "bg-indigo-600 hover:bg-indigo-800 text-white dark:text-black",
    lime: "bg-lime-600 hover:bg-lime-800 text-white dark:text-black",
    red: "bg-red-600 hover:bg-red-800 text-white dark:text-black",
    orange: "bg-orange-600 hover:bg-orange-800 text-white dark:text-black",
    green: "bg-green-600 hover:bg-green-800 text-white dark:text-black",
  };

  const borderColor = {
    indigo: "border-indigo-600 text-black dark:text-white",
    lime: "border-lime-600 text-black dark:text-white",
    red: "border-red-600 text-black dark:text-white",
    orange: "border-orange-600 text-black dark:text-white",
    green: "border-green-600 text-black dark:text-white",
  };

  const classVariant = {
    contained: `border ${bgColor[color]} ${borderColor[color]} disabled:bg-gray-500 disabled:border-none`,

    outlined: `border-2 ${borderColor[color]} hover:shadow-md disabled:border-gray-500`,

    text: "hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-white",
  };

  const classSize = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
    full: "w-full py-1.5 justify-center",
  };

  const defaultClass = `flex items-center font-medium rounded-md disabled:cursor-not-allowed transition`;

  const className = `
  ${defaultClass}
  ${classVariant[variant]} 
  ${classSize[size]}
  `;

  const classIcon = `ml-2 ${loading ? "animate-spin" : ""}`;

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={className}
    >
      {loading ? "Loading ..." : children}
      {icon && <span className={classIcon}>{icon}</span>}
    </button>
  );
};

export default Button;
