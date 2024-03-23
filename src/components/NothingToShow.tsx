export function NothingToShow() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] px-4">
      <ActivityIcon className="h-12 w-12" />
      <p className="text-sm font-semibold text-gray-500 mt-2.5">
        Nothing to show
      </p>
    </div>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
