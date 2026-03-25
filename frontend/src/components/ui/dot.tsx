export default function Dot({ size }: { size?: "EXTRASMALL" | "SMALL" | "LARGE" | "EXTRALARGE" }) {
  let shapeSize = 7;
  switch (size) {
    case "EXTRASMALL":
      shapeSize = 2;
      break;
    case "SMALL":
      shapeSize = 4;
      break;
    case "LARGE":
      shapeSize = 8;
      break;
    case "EXTRALARGE":
      shapeSize = 14;
      break;
  }
  return (
    <>
      <div>
        <div role="dot" className={`w-${shapeSize} h-${shapeSize} bg-gray-200 rounded-full`}></div>
      </div>
    </>
  );
}
