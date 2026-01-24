"use client";

const contacts = [
  {
    id: "mohan",
    name: "Dr. S. Venkata Mohan",
    designation: "Director, CSIR-NEERI, Nagpur",
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


function ContactCard({ contact }) {
  return (
    <article className="rounded-xl border border-black p-6 bg-white transition hover:shadow-md">
      
      <div className="space-y-4">
        
        {/* Name */}
        <h2 className="text-lg font-bold text-black">
          {contact.name}
        </h2>

        {/* Designation */}
        <p className="text-sm font-bold text-black">
          {contact.designation}
        </p>

        {/* Division */}
        {contact.division.length > 0 && (
          <div className="text-sm font-bold text-black space-y-0.5">
            {contact.division.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-black" />

        {/* Email Section */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-black">Email</p>
          {contact.emails.map((email, i) => (
            <a
              key={i}
              href={`mailto:${email}`}
              className="block text-sm font-bold text-black hover:underline"
            >
              {email}
            </a>
          ))}
        </div>

        {/* Mobile Section */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-black">Mobile</p>
          {contact.mobiles.map((mobile, i) => (
            <a
              key={i}
              href={`tel:${mobile}`}
              className="block text-sm font-bold text-black hover:underline"
            >
              {mobile}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}




export default function ContactPage() {
  return (
    <section className="w-full px-6 lg:px-12 py-12 space-y-12">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Contact Information
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          CSIR – National Environmental Engineering Research Institute (NEERI)
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </section>
  );
}
