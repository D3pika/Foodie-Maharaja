import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <Header isSignedIn={true} cart={[]} /> */}
      <CategoryList />
      <BusinessList />
      {/* <Footer /> */}
    </div>
  );
}