export default function NotificationCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-2.5 absolute translate-x-56 translate-y-5 w-xs h-52 overflow-y-auto scrollbar-none flex flex-col gap-2.5">
        {children}
      </div>
    </>
  );
}
