export default function FooterFrofile() {
    const footers = [
        "Meta",
        "About",
        "Blog",
        "Jobs",
        "Help",
        "API",
        "Privacy",
        "Terms",
        "Locations",
        "Instagram Lite",
        "Threads",
        "Contact Uploading & Non-Users",
        "Meta Verified",
    ];

    return (

        <div className="py-8">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
                {footers.map((footer, index) => (
                    <a key={index} href="#" className="hover:underline">
                        {footer}
                    </a>
                ))}
            </div>
        </div>

    )
}