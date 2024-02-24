import { CircularProgress } from "@nextui-org/react";

export default function overview() {
  return (
    <div className="h-[calc(100vh-8rem)] w-screen flex justify-center content-center">
      <CircularProgress size="lg" label="Loading..." />
    </div>
  );
}
