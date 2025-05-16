import { CircleLoader } from "react-spinners";

const Loading = () => {
  // You can adjust size/color or pull them from a theme/context
  const spinnerSize = 80;
  const spinnerColor = "#3b82f6"; // Tailwind's blue-500

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white dark:bg-gray-900">
      <CircleLoader
        size={spinnerSize}
        color={spinnerColor}
        aria-label="Loading..."
      />
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
