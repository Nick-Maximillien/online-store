import Chatbot from "./Chatbot"
import Link from "next/link";

export default function HeroSection() {
    return (
      <section className="row hero justify-content-center text-center my-5">
        <div className="heroCont">
          <h4>Discover Products</h4>
          <p>
            <label htmlFor="search" >
                <input className="searchInput" name="search" id="search" type="search" /><button className="searchbtn" id="submit" type="submit"><img className="searchImg" src="/images/search.jpeg" alt="" /></button>
            </label>
          </p>
        <Link href="/products"><button className="btn btn-primary">Shop Now</button></Link> 
        </div>
        <div className="col-3 chatbot">
        <Link href="/chatbot">
        <Chatbot />
        </Link>
        </div>
      </section>
    );
  }
  