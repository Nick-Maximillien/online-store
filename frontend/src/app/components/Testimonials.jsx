// components/Testimonials.jsx
const testimonials = [
  { name: "John Doe", review: "Great store! Fast shipping and amazing products.", rating: 5 },
  { name: "Jane Smith", review: "The AI recommendations were spot on!", rating: 4.5 },
];

export default function Testimonials() {
  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4">What Our Customers Say</h2>
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="col-md-6">
            <div className="p-4 border rounded shadow-sm">
              <p className="fw-bold">{testimonial.name}</p>
              <p>{testimonial.review}</p>
              <p>⭐ {testimonial.rating} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
