import Loader from "@/components/loader";

export default function GlobalLoader() {
  return (
    <div className="flex-center fixed inset-0 h-screen w-screen bg-background/60 z-[999]">
      <Loader />
    </div>
  );
}
