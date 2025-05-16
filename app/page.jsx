import Gallery from "./_components/Gallery";
import HomeSlider from "./_components/HomeSlider";
import NewCollection from "./_components/NewCollection";
import PopulerProd from "./_components/PopulerProd";
import SearchBar from "./_components/SearchBar";
import SpecialProd from "./_components/SpecialProd";
import TopRatedProd from "./_components/TopRatedProd";

export default function Home() {
  return (
    <>
      <div className="">
        <HomeSlider />

        <SearchBar />

        <NewCollection />

        <PopulerProd />

        <SpecialProd />

        <div className="hidden md:block">
          <Gallery />
        </div>

        <TopRatedProd />
      </div>
    </>
  );
}
