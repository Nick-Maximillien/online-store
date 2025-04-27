export default function Newsletter() {
    return (
      <section className="row my-5 text-center">
        <h2 className="col-12 updated">Stay Updated</h2>
        <p className="col-12 subscribe">Subscribe to get latest updates and product recommendations</p>
        <div className="col-md-6 mx-auto emailsub">
          <input id="email" autoComplete="{false}" type="email" className="form-control" placeholder="Enter your email" />
          <button className="btn btn-primary mt-2">Subscribe</button>
        </div>
      </section>
    );
  }
  