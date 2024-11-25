import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  return (
    <div>
      <div>
        <CategoryList />
        <BusinessList />
      </div>
    </div>
  );
}