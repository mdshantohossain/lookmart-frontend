import React from "react";

export default function AboutPage() {
  return (
    <div className="px-6 py-8 bg-background">
      {/* Company Story */}
      <section className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded in 2020, our company started with a simple mission: to
                help businesses leverage technology to solve real-world
                problems. What began as a small team of three has grown into a
                dynamic organization of over 50 talented professionals.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We believe in the power of collaboration, innovation, and
                continuous learning. Our team is committed to delivering
                exceptional results and building long-term partnerships with our
                clients.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to have worked with hundreds of companies
                across various industries, helping them achieve their digital
                transformation goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">50+</div>
                <p className="text-lg text-muted-foreground">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with cutting-edge technology solutions
                that drive growth, efficiency, and innovation. We are committed
                to delivering exceptional value and building lasting
                relationships with our clients.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-4 ">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading technology partner for businesses worldwide,
                recognized for our innovation, expertise, and commitment to
                excellence. We envision a future where technology enables every
                business to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly push boundaries and embrace new ideas to create breakthrough solutions.",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty, transparency, and ethical principles in all our dealings.",
              },
              {
                title: "Excellence",
                description:
                  "We strive for the highest quality in everything we do, from code to customer service.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
