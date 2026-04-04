export default function PrivacyPage() {
  return (
    <article className="max-w-5xl mx-auto py-24 px-6 prose prose-zinc prose-headings:font-black">
      <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
      <p className="text-sm text-zinc-400 mb-12 italic text-right">
        Last Updated: March 2026
      </p>

      <h2 className="text-xl font-bold uppercase tracking-widest border-l-4 border-zinc-900 pl-4">
        1. Data Collection
      </h2>
      <p className="text-zinc-600 mb-8">
        We collect personal information when you create an account, such as your
        name, email, and shipping address. This data is used solely to process
        your transactions safely.
      </p>

      <h2 className="text-xl font-bold uppercase tracking-widest border-l-4 border-zinc-900 pl-4">
        2. Cookies
      </h2>
      <p className="text-zinc-600 mb-8">
        Our website uses cookies to enhance your shopping experience. You can
        choose to disable cookies in your browser settings, though it may limit
        some site functionality.
      </p>

      <h2 className="text-xl font-bold uppercase tracking-widest border-l-4 border-zinc-900 pl-4">
        3. Third Parties
      </h2>
      <p className="text-zinc-600 mb-8">
        We do not sell, trade, or otherwise transfer your data to outside
        parties. This does not include trusted partners who assist us in
        operating our website.
      </p>
    </article>
  );
}
