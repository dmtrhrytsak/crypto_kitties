export const Loader = () => {
  return (
    <div className="fixed z-10 top-0 left-0 flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
        <svg
          className="w-8 h-8 text-gray-600 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    </div>
  );
};
