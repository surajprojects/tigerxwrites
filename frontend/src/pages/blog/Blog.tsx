import ShowBlog from "../../components/blog/showBlog";
import BlogAuthor from "../../components/blog/blogAuthor";

export default function Blog() {
    return (
        <>
            <section className="flex flex-col xl:flex-row mx-6 sm:mx-16 md:mx-28 xl:mx-40 2xl:mx-56">
                <ShowBlog
                    title="Taxing Laughter: The Joke Tax Chronicles"
                    postedOn="2025-10-06"
                    content="Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money. Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop."
                />
                <BlogAuthor
                    authorName="Jokester"
                    bio="Master of mirth, purveyor of puns, and the funniest person in the kingdom."
                />
            </section>
        </>
    );
};