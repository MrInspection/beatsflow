import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full text-center sm:w-10/12 md:w-8/12">
            <div
              aria-hidden="true"
              className="flex h-62.5 items-center justify-center bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] bg-center bg-contain bg-no-repeat sm:h-[350px] md:h-[400px]"
            >
              <h1 className="-mt-55 text-center text-6xl sm:-mt-70 sm:text-7xl md:text-8xl">
                404
              </h1>
            </div>
            <div className="-mt-10 sm:-mt-18">
              <h3 className="mb-4 font-bold text-2xl sm:text-3xl">
                Look like you're lost
              </h3>
              <p className="mx-auto mb-6 max-w-120 text-muted-foreground sm:mb-5">
                Sorry, we couldn't find the page you're looking for. This is
                perhaps a temporary issue, so please try again later.
              </p>
              <Link
                href="/"
                className={buttonVariants({ size: "lg", className: "mt-4" })}
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
