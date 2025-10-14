import AboutCard from "../components/home/aboutCard";
import ContactBtn from "../components/button/contactBtn";

export default function About() {
    return (
        <>
            <section className="w-full h-full bg-white py-24 pb-10">
                <div className="w-full md:w-2xl lg:w-3xl px-4 mx-auto">
                    {/* About Tiger Writes */}
                    <div>
                        <h2 className="text-6xl font-bold text-[#2a2522] my-8">About <span className="text-orange-500">Tiger Writes</span></h2>
                        <p className="text-[#7c706a] text-lg my-6 font-sans">Tiger Writes is a platform where words roar to life. We believe that every writer has a unique
                            voice that deserves to be heard, and every story has the power to connect, inspire, and
                            transform.</p>
                        <p className="text-[#7c706a] text-lg my-6 font-sans">Founded on the principles of authenticity and community, we've created a space where writers
                            can share their perspectives on any topic that matters to them. Whether you're a seasoned
                            author or just beginning your writing journey, Tiger Writes welcomes you.</p>
                    </div>
                    {/* Our Mission */}
                    <AboutCard
                        title="Our Mission"
                        description="We're dedicated to empowering writers and readers alike. Our mission is to create a platform that celebrates the written word in all its forms—from personal essays and creative fiction to technical guides and thought leadership."
                    />
                    {/* Why Tiger? */}
                    <AboutCard
                        title="Why Tiger?"
                        description="The tiger represents strength, courage, and individuality—qualities we believe every writer embodies. Just as a tiger's stripes are unique, so too is every writer's voice. We chose the tiger as our symbol to remind writers that their distinct perspective is their greatest strength."
                    />
                    {/* Join Our Community */}
                    <AboutCard
                        title="Join Our Community"
                        description="Whether you're here to read, write, or both, we're glad you're part of our community. Together, we're building a space where diverse voices can flourish and meaningful conversations can begin."
                    />
                    {/* Get in Touch */}
                    <div className="border-t border-[#ebe6e0] py-8">
                        <p className="text-lg font-medium font-sans mb-6">Have questions or want to collaborate?</p>
                        <ContactBtn />
                    </div>
                </div>
            </section>
        </>
    );
};
