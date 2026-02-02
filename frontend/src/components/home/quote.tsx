export default function Quote({
  text = "The customer service I received was exceptional. The support team went above and beyond to address my concerns.",
  author = "Jules Winnfield",
  position = "CEO, Acme Inc",
}: {
  text?: string;
  author?: string;
  position?: string;
}) {
  return (
    <>
      <section className="w-full h-full hidden lg:flex justify-center items-center bg-gray-100 invisible lg:visible">
        <div className="w-8/12">
          <h3 className="font-bold text-2xl">"{text}"</h3>
          <p className="font-bold mt-3">{author}</p>
          <p className="text-gray-500">{position}</p>
        </div>
      </section>
    </>
  );
}
