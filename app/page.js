import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-[100%]">
      <div className="flex-grow">
        <CategoryList />
        <BusinessList />
      </div>
    </div>
  );
}