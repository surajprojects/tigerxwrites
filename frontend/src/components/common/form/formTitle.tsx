export default function FormTitle({ text = "Form Title" }: { text?: string }) {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{text}</h1>
        </>
    );
};