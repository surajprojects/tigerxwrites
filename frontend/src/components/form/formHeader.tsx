export default function FormHeader({
  title = "Welcome back",
  description = "Enter your credentials to access your account",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <>
      <div>
        <h3 className="text-3xl font-bold my-2">{title}</h3>
        <p className="text-sm text-[#7c706a] font-sans">{description}</p>
      </div>
    </>
  );
}
