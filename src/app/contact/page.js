"use client";

const contacts = [
  {
    id: "mohan",
    name: "Dr. S. Venkata Mohan",
    designation: "Director",
    institute: "CSIR-NEERI, Nagpur",
    division: [],
    emails: ["s.mohan@csir.res.in", "director@csir.res.in"],
    mobiles: ["+919849306934"],
  },
  {
    id: "george",
    name: "Dr. K V George",
    designation: "Chief Scientist & Chair",
    division: [
      "Air Quality Management Division",
      "CSIR-NEERI, Nagpur",
    ],
    emails: ["kv.george@csir.res.in"],
    mobiles: ["+919422305272"],
  },
  {
    id: "rahul",
    name: "Er. Rahul V. Vyawahare",
    designation: "Senior Scientist",
    division: [
      "Air Quality Management Division",
      "CSIR-NEERI, Nagpur",
    ],
    emails: ["rahul.vyawahare@csir.res.in"],
    mobiles: ["+919403253467", "+918830686334"],
  },
];

function ContactCard({ contact, isDirector }) {
  return (
    <article className="rounded-xl border border-black p-4 bg-white">
      <div className="space-y-1 text-sm text-black">

        <h2 className="text-base font-bold">
          {contact.name}
        </h2>

        <p className="font-bold">
          {contact.designation}
        </p>

        {isDirector && (
          <p className="font-bold">
            {contact.institute}
          </p>
        )}

        {contact.division?.length > 0 && (
          <div className="font-bold">
            {contact.division.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        {/* Email */}
        <div className="flex gap-1 flex-wrap">
          <span className="font-bold">Email:</span>
          {contact.emails.map((email, i) => (
            <a
              key={i}
              href={`mailto:${email}`}
              className="hover:underline"
            >
              {email}{i < contact.emails.length - 1 && ","}
            </a>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex gap-1 flex-wrap">
          <span className="font-bold">Mobile:</span>
          {contact.mobiles.map((mobile, i) => (
            <a
              key={i}
              href={`tel:${mobile}`}
              className="hover:underline"
            >
              {mobile}{i < contact.mobiles.length - 1 && ","}
            </a>
          ))}
        </div>

      </div>
    </article>
  );
}

export default function ContactPage() {
  const director = contacts[0];
  const others = contacts.slice(1);

  return (
    <section className="w-full px-6 lg:px-12 py-10 space-y-10">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Information
        </h1>
        <p className="text-gray-600 mt-1">
          CSIR – National Environmental Engineering Research Institute (NEERI)
        </p>
      </div>

      {/* Director – Centered */}
      <div className="flex justify-center">
        <div className="max-w-sm w-full">
          <ContactCard contact={director} isDirector />
        </div>
      </div>

      {/* Other Contacts */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {others.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>

    </section>
  );
}
