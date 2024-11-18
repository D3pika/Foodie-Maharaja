import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  
  return (
    <div>
      {/* <UserButton afterSignOutUrl="/" /> */}
      <CategoryList/>
      <BusinessList/>
    </div>
  );
}
