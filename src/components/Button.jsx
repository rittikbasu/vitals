import Link from "next/link";
import clsx from "clsx";

export default function Button({ className, href, ...props }) {
  className = clsx(
    "group relative mx-auto py-2 inline-flex items-center overflow-hidden rounded-full bg-zinc-300 px-10 lg:px-12 transition dark:bg-zinc-900",
    className
  );

  return (
    <button className={className} {...props}>
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
        <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(74,222,128,0.8)_0deg,transparent_60deg,transparent_300deg,rgba(74,222,128,0.8)_360deg)] opacity-100 transition duration-300 [animation-duration:3s] group-hover:opacity-100 dark:bg-[conic-gradient(from_0_at_50%_50%,rgba(74,222,128,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(74,222,128,0.5)_360deg)] md:opacity-0"></div>
      </div>

      <div className="absolute inset-0.5 rounded-full bg-white group-hover:shadow-inner dark:bg-black"></div>

      <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

      <span className="relative mt-px bg-gradient-to-b bg-clip-text font-poppins text-base font-medium text-zinc-700 transition-all duration-200 dark:from-white/25 dark:to-white dark:text-transparent">
        {props.children}
      </span>
    </button>
  );
}
