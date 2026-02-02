export default function AboutCard({
  title = "Title",
  description = "Description",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <>
      <div>
        <h3 className="text-[#2a2522] text-3xl font-sans font-bold capitalize">{title}</h3>
        <p className="text-[#7c706a] text-lg my-6 font-sans">{description}</p>
      </div>
    </>
  );
}
